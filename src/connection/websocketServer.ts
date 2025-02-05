import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("📡 Client đã kết nối.");

  ws.on("message", (message) => {
    // Tin nhắn được nhận là dạng Buffer, nên cần chuyển thành string bằng message.toString(), rồi parse thành JSON.
    const { id, data, messageType } = JSON.parse(message.toString());
    console.log(
      `📩 Nhận message từ client (ID: ${id}, Type: ${messageType})`,
      data
    );

    // Giả lập phản hồi bằng cách gửi lại dữ liệu nhận được
    ws.send(JSON.stringify({ id, data, messageType }));
  });

  ws.on("close", () => {
    console.log("🔌 Client đã ngắt kết nối.");
  });

  ws.on("error", (error) => {
    console.error("🚨 Lỗi WebSocket:", error);
  });
});

console.log("🚀 WebSocket Server đang chạy tại ws://localhost:8081");
