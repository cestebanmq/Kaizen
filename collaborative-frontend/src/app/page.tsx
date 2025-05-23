"use client"; // Required for hooks and event handlers

import { Button } from "@/components/ui/Button"; // Existing Button component
import socket from "@/lib/socket"; // Our Socket.IO client instance
import { useEffect, useState, MouseEvent as ReactMouseEvent } from "react";

interface MessagePayload {
  id: string; // Sender's socket ID
  message: string;
}

interface CursorPayload {
  id: string; // Sender's socket ID
  position: { x: number; y: number };
}

interface CursorPositions {
  [id: string]: { x: number; y: number };
}

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<MessagePayload[]>([]);
  const [cursorPositions, setCursorPositions] = useState<CursorPositions>({});
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [myId, setMyId] = useState<string | null>(null);

  // Effect for managing socket connection and event listeners
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    function onConnect() {
      console.log("Socket connected on client:", socket.id);
      setIsConnected(true);
      setMyId(socket.id || null);
    }

    function onDisconnect(reason: SocketIOClient.DisconnectReason) {
      console.log("Socket disconnected on client:", reason);
      setIsConnected(false);
      setMyId(null);
      // Clear cursors of others on disconnect, or handle more gracefully
      setCursorPositions({});
    }

    function onConnectError(error: Error) {
      console.error("Socket connection error on client:", error);
      setIsConnected(false);
    }

    function onServerMessage(data: MessagePayload) {
      console.log("Message from server:", data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    }

    function onCursorUpdate(data: CursorPayload) {
      // console.log("Cursor update from server:", data);
      setCursorPositions((prevPositions) => ({
        ...prevPositions,
        [data.id]: data.position,
      }));
    }
    
    function onUserDisconnected(disconnectedId: string) {
      console.log("User disconnected:", disconnectedId);
      setCursorPositions((prevPositions) => {
        const newPositions = { ...prevPositions };
        delete newPositions[disconnectedId];
        return newPositions;
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("server_message", onServerMessage);
    socket.on("cursor_update", onCursorUpdate);
    socket.on("user_disconnected", onUserDisconnected);

    // Cleanup on component unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("server_message", onServerMessage);
      socket.off("cursor_update", onCursorUpdate);
      socket.off("user_disconnected", onUserDisconnected);
      // Optional: disconnect if the component is truly unmounting and not just re-rendering
      // if (socket.connected) {
      //   socket.disconnect();
      // }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // Effect for handling mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (socket.connected) {
        socket.emit("cursor_position", { x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isConnected]); // Re-attach if connection status changes, though not strictly necessary here

  const handleSendMessage = () => {
    if (message.trim() && socket.connected) {
      socket.emit("client_message", message.trim());
      // Optionally, add the message to our own list immediately
      // setReceivedMessages((prevMessages) => [...prevMessages, { id: 'Me', message: message.trim() }]);
      setMessage(""); // Clear input after sending
    } else if (!socket.connected) {
      alert("Not connected to server. Please wait or try refreshing.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-background text-foreground">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-accent">
          Real-Time Collaboration Test
        </h1>

        <div className="p-4 border rounded-lg shadow-md bg-neutral-800/30 border-neutral-700">
          <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
          <p>Your ID: <span className="font-mono text-sm">{myId || "N/A"}</span></p>
          <p>Status: {isConnected ? 
            <span className="text-green-400">Connected</span> : 
            <span className="text-red-400">Disconnected</span>}
          </p>
        </div>
        
        {/* Message Broadcasting Section */}
        <div className="p-4 border rounded-lg shadow-md bg-neutral-800/30 border-neutral-700">
          <h2 className="text-2xl font-semibold mb-4">Live Messages</h2>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 rounded-md bg-neutral-700 border border-neutral-600 focus:ring-accent focus:border-accent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button variant="primary" onClick={handleSendMessage} disabled={!isConnected}>
              Send
            </Button>
          </div>
          <div className="h-48 overflow-y-auto p-2 border rounded-md bg-neutral-900 border-neutral-700 space-y-2">
            {receivedMessages.length === 0 && <p className="text-neutral-400">No messages yet...</p>}
            {receivedMessages.map((msg, index) => (
              <div key={index} className="p-2 rounded-md bg-neutral-800 text-sm">
                <span className="font-semibold text-accent/80">User {msg.id.substring(0,6)}: </span>
                <span>{msg.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cursor Positions Section */}
        <div className="p-4 border rounded-lg shadow-md bg-neutral-800/30 border-neutral-700">
          <h2 className="text-2xl font-semibold mb-2">Live Cursors (Coordinates)</h2>
          <div className="h-24 overflow-y-auto p-2 border rounded-md bg-neutral-900 border-neutral-700 space-y-1 text-sm">
            {Object.entries(cursorPositions).length === 0 && <p className="text-neutral-400">No other active users.</p>}
            {Object.entries(cursorPositions).map(([id, pos]) => (
              <p key={id} className="font-mono">
                User <span className="text-accent/70">{id.substring(0,6)}</span>: X: {pos.x}, Y: {pos.y}
              </p>
            ))}
          </div>
        </div>

        {/* Original Button Showcase (can be kept or removed) */}
        {/* <div className="mt-12 opacity-50">
          <h2 className="text-xl font-semibold text-center mb-6">Button Component Examples</h2>
          ... (original button examples from previous step) ...
        </div> */}
      </div>
    </main>
  );
}
