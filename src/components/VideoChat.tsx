import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorPage from "@/pages/ErrorPage";

interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: "user" | "other";
}

export const VideoChat = () => {
  const { pose: poseParam } = useParams<{ pose: string }>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const webSocketRef = useRef<WebSocket | null>(null);

  if (!Boolean(poseParam)) {
    console.error("Invalid pose parameter");
    return <ErrorPage />;
  }

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initCameraAndStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        webSocketRef.current = new WebSocket(import.meta.env.VITE_WS_URL ||"ws://localhost:8000/stream");
        webSocketRef.current.onopen = () => {
          console.log("WebSocket connected. Starting media recorder.");

          if (!stream) {
            console.error("No media stream available to start MediaRecorder.");
            return;
          }

          const supportedTypes = [
            "video/webm; codecs=vp9",
            "video/webm; codecs=vp8",
            "video/webm",
          ];

          const supportedMimeType = supportedTypes.find((type) =>
            MediaRecorder.isTypeSupported(type)
          );

          if (!supportedMimeType && !MediaRecorder.isTypeSupported("")) {
            console.error("No supported MediaRecorder MIME type found.");
            return;
          }

          console.log(`Using MIME type: ${supportedMimeType || "default"}`);

          mediaRecorderRef.current = new MediaRecorder(
            stream,
            supportedMimeType ? { mimeType: supportedMimeType } : undefined
          );

          mediaRecorderRef.current.ondataavailable = (event) => {
            if (
              event.data.size > 0 &&
              webSocketRef.current?.readyState === WebSocket.OPEN
            ) {
              console.log(
                `Video recording complete. Sending one blob of ${event.data.size} bytes.`
              );

              webSocketRef.current.send(
                JSON.stringify({
                  mimeType: mediaRecorderRef.current?.mimeType,
                })
              );

              webSocketRef.current.send(event.data);

              webSocketRef.current.send(
                JSON.stringify({ type: "end-of-stream" })
              );
            }
          };

          mediaRecorderRef.current.start();
          console.log("MediaRecorder started.");
        };

        webSocketRef.current.onmessage = (event) => {
          try {
            const serverMessage = JSON.parse(event.data);

            if (serverMessage.text && serverMessage.sender) {
              console.log("Received chat message:", serverMessage.text);
              const newChatMessage: ChatMessage = {
                id: new Date().toISOString() + Math.random(), // Simple unique ID
                text: serverMessage.text,
                sender: serverMessage.sender,
                timestamp: new Date(),
              };

              setMessages((prevMessages) => [...prevMessages, newChatMessage]);
            }
          } catch (error) {
            console.error("Received non-JSON message:", event.data, error);
          }
        };

        webSocketRef.current.onclose = () => {
          console.log("WebSocket disconnected.");
        };

        webSocketRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initCameraAndStream();

    return () => {
      console.log("Cleaning up video chat...");

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        console.log("Stopping MediaRecorder...");
        mediaRecorderRef.current.stop();
      } else {
        if (
          webSocketRef.current &&
          webSocketRef.current.readyState < WebSocket.CLOSING
        ) {
          webSocketRef.current.close();
        }
      }
    };
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Video Section */}
      <div className="flex-1 relative bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {/* End Call Button */}
        <NavLink to="/dashboard">
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-4 right-4 rounded-full h-12 w-12"
          >
            <X className="h-6 w-6" />
          </Button>
        </NavLink>
      </div>

      {/* Chat Section */}
      <div className="w-96 bg-card border-l flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Chat</h2>
          {poseParam && (
            <p className="text-sm text-muted-foreground">Pose: {poseParam}</p>
          )}
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};