import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContextProvider.tsx";
import { poses } from "@/utils/poses";

export function ListScrollArea() {
  const navigate = useNavigate();
  const { userId, setPose } = useContext(UserContext);
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Uploads the chosen file to pipeline; relies on local selectedPose
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedPose) {
      setError("No file selected or pose missing.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("pose", selectedPose);

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${import.meta.env.VITE_PIPELINE_URL}/api/upload-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const sessionId = response.data?.session_id;
      if (sessionId) {
        localStorage.setItem("session_id", sessionId);
      }

      console.log("✅ Upload successful, session ID:", sessionId, response.data);
      navigate(`/video/${selectedPose}`);
    } catch (err: any) {
      console.error("Upload error:", err?.response ?? err);
      const serverMsg = err?.response?.data?.message || err?.message;
      setError(`Upload failed: ${serverMsg}`);
    } finally {
      setLoading(false);
      // clear input so same file can be reselected later if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Creates session on backend, then opens file picker
  const handlePoseClick = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    pose: string
  ) => {
    event.preventDefault();
    setError(null);

    if (!userId) {
      setError("User not logged in");
      return;
    }

    const formattedPose = pose
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/'/g, "");

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      // NOTE: using "completed" to match existing backend expectations.
      // If your backend expects another initial status, change it back.
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/${userId}/sessions/${formattedPose}`,
        {
          status: "completed",
          date: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Session created:", response.status, response.data);

      // update context and local selected pose
      setPose(formattedPose);
      setSelectedPose(formattedPose);

      // open file picker for upload (user still has to pick a file)
      if (fileInputRef.current) {
        // small timeout ensures any UI updates propagate before the click
        setTimeout(() => fileInputRef.current?.click(), 50);
      }
    } catch (err: any) {
      console.error("Session creation error:", err?.response ?? err);
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message || err?.message;
      setError(
        `Session creation failed${status ? ` (HTTP ${status})` : ""}: ${serverMsg}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="mb-0 text-sm leading-none font-medium">
        Select the pose to get started:
      </h4>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {loading && <p className="text-blue-500 text-sm mb-2">Processing...</p>}

      <input
        type="file"
        ref={fileInputRef}
        accept="video/mp4"
        className="hidden"
        onChange={handleFileChange}
      />

      <ScrollArea className="h-48 w-full rounded-md border">
        <div className="p-4">
          {poses.map((pose) => {
            const formattedPose = pose
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/'/g, "");
            return (
              <NavLink
                to="#"
                key={pose}
                className={`block hover:text-blue-600 transition ${
                  selectedPose === formattedPose ? "font-semibold" : ""
                }`}
                onClick={(event) => handlePoseClick(event, pose)}
              >
                <div className="text-sm">{pose}</div>
                <Separator className="my-2" />
              </NavLink>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
