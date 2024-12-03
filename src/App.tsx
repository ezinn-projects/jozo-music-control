import React, { useEffect, useRef, useState } from "react";
import io, { Socket as ClientSocket } from "socket.io-client";

const App = () => {
  // Sử dụng ClientSocket thay vì Socket
  const socketRef = useRef<typeof ClientSocket | null>(null);
  const [connected, setConnected] = useState(false); // Trạng thái kết nối

  useEffect(() => {
    // Khởi tạo socket
    socketRef.current = io("http://localhost:8080", {
      query: { roomId: "room1" }, // Kết nối với room tương ứng
    });

    // Lắng nghe sự kiện connect
    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket server");
      setConnected(true);
    });

    // Lắng nghe sự kiện disconnect
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setConnected(false);
    });

    // Dọn dẹp khi component bị unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Gửi lệnh điều khiển
  const sendCommand = (action: string, data?: any) => {
    if (socketRef.current) {
      socketRef.current.emit("command", { action, data });
      console.log(`Sent command: ${action}`, data);
    } else {
      console.error("Socket is not connected");
    }
  };

  return (
    <div>
      <h1>WebSocket Control Panel</h1>
      <p>Status: {connected ? "Connected" : "Disconnected"}</p>
      <button onClick={() => sendCommand("play")}>Play</button>
      <button onClick={() => sendCommand("pause")}>Pause</button>
      <button onClick={() => sendCommand("seek", 30)}>Seek to 30s</button>
    </div>
  );
};

export default App;
