import React, { useEffect, useRef, useState } from "react"; // Added React import
import { NavLink, useParams } from "react-router-dom";
import { X, ChevronDown, ChevronUp } from "lucide-react"; // Added new icons
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorPage from "@/pages/ErrorPage";

interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: "agent" | "user";
}


interface DraggableChatWindowProps {
  messages: ChatMessage[];
  poseParam: string | undefined;
}

const DraggableChatWindow: React.FC<DraggableChatWindowProps> = ({
  messages,
  poseParam,
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const latestMessages = messages.slice(-10);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="absolute w-96 bg-card border rounded-lg shadow-lg flex flex-col z-20"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Draggable Header */}
      <div
        className="p-4 border-b cursor-move rounded-t-lg flex justify-between items-center" // <-- Added flex styles
        onMouseDown={handleMouseDown}
      >
        <div>
          <h2 className="text-lg font-semibold">Chat</h2>
          {poseParam && !isMinimized && ( // <-- Hide pose when minimized
            <p className="text-sm text-muted-foreground">Pose: {poseParam}</p>
          )}
        </div>

        {/* --- Minimize Button --- */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsMinimized(!isMinimized);
          }}
        >
          {isMinimized ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Chat Messages - Conditionally Rendered */}
      {!isMinimized && (
        <ScrollArea className="h-96 p-4">
          <div className="space-y-4">
            {latestMessages.map((message) => (
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
      )}
    </div>
  );
};


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

        webSocketRef.current = new WebSocket(
          import.meta.env.VITE_WS_URL || "ws://localhost:8000/stream"
        );
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
    <div className="h-screen w-full relative bg-background overflow-hidden">
      {/* Full Screen Video Section */}
      <div className="absolute inset-0 bg-black z-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* End Call Button (Over Video) */}
      <NavLink to="/dashboard" className="absolute top-4 right-4 z-30">
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <X className="h-6 w-6" />
        </Button>
      </NavLink>

      {/* Draggable Chat Window */}
      <DraggableChatWindow messages={messages} poseParam={poseParam} />
    </div>
  );
};