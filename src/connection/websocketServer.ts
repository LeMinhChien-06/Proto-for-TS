import WebSocket from "ws";
import { Customer } from "../generated/customer";

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("🔗 Client kết nối WebSocket");

  ws.on("message", (message) => {
    try {
      // Giải mã dữ liệu binary thành object Customer
      const decoded = Customer.decode(new Uint8Array(message as Buffer));
      console.log("📩 Nhận dữ liệu từ client:", decoded);

      // Gửi phản hồi lại dưới dạng binary
      const responseData = Customer.encode({
        ...decoded,
        name: "Server Processed",
      }).finish();
      ws.send(responseData);
    } catch (error) {
      console.error("❌ Lỗi giải mã dữ liệu:", error);
    }
  });

  ws.on("close", () => console.log("❌ Client đã ngắt kết nối"));
});

console.log("✅ WebSocket Server chạy tại ws://localhost:8081");
