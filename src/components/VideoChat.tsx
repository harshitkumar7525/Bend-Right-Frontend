import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorPage from "@/pages/ErrorPage";

export const VideoChat = () => {
  const { pose: poseParam } = useParams<{ pose: string }>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState("Connecting...");
  const sessionId = localStorage.getItem("session_id");

  if (!poseParam || !sessionId) return <ErrorPage />;

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/stream/${sessionId}`);

    ws.onopen = () => {
      console.log("✅ Connected to backend WebSocket");
      setProgress("Streaming started...");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === "frame") {
          const img = new Image();
          img.src = `data:image/jpeg;base64,${data.frame}`;
          img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
        } else if (data.status === "progress") {
          setProgress(data.message);
        } else if (data.status === "completed") {
          setProgress(data.message);
          ws.close();
        }
      } catch (err) {
        console.error("Frame parse error:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setProgress("Error during stream.");
    };

    ws.onclose = () => console.log("WebSocket closed.");

    return () => {
      if (ws.readyState < WebSocket.CLOSING) ws.close();
    };
  }, [sessionId]);

  return (
    <div className="h-screen w-full relative bg-black">
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="w-full h-full object-cover p-10"
      ></canvas>

      <div className="absolute top-6 left-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-md">
        <p className="text-sm font-semibold">{poseParam?.toUpperCase()}</p>
        <p className="text-xs opacity-80">{progress}</p>
      </div>

      <NavLink to="/dashboard" className="absolute top-4 right-4 z-30">
        <Button variant="destructive" size="icon" className="rounded-full h-12 w-12">
          <X className="h-6 w-6" />
        </Button>
      </NavLink>
    </div>
  );
};
