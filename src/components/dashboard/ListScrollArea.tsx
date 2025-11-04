import React, { useState } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContextProvider.tsx";
import { poses } from "@/utils/poses";

export function ListScrollArea() {
  const navigate = useNavigate();
  const { userId } = React.useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePoseClick = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    pose: string
  ) => {
    event.preventDefault();
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
      setError(null);

      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/${userId}/sessions/${formattedPose}`,
        {
          status: "completed",
          date: new Date().toISOString().split("T")[0], // today's date in yyyy-MM-dd
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Session created:", response.data);
      navigate(`/video/${formattedPose}`); // navigate after success
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create session");
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
                to={`#`}
                key={pose}
                className="block"
                onClick={(event) => handlePoseClick(event, pose)}
              >
                <React.Fragment key={formattedPose}>
                  <div className="text-sm">{pose}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              </NavLink>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
