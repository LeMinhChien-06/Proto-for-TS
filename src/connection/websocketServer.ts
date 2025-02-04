import WebSocket from "ws";
import { loadMessages } from "../proto_loader";
const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("🔗 Client kết nối WebSocket");

  ws.on("message", (data: Buffer) => {
    try {
      // **Tự động xác định loại message**
      for (const [messageType, protoType] of Object.entries(loadMessages)) {
        try {
          const decoded = protoType.decode(new Uint8Array(data));
          console.log(`Received message of type ${messageType}:`, decoded);

          // **Gửi phản hồi với dữ liệu đã xử lý**
          const response = protoType.create(decoded);
          ws.send(protoType.encode(response).finish());
          return;
        } catch (err) {
          continue;
        }
      }

      console.log("Unknown message format received.");
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => console.log("❌ Client đã ngắt kết nối"));
});

console.log("✅ WebSocket Server chạy tại ws://localhost:8081");
