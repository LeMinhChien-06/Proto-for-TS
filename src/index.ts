import { WebSocketClientImpl } from "./connection/WebSocketClientImpl";

const ws = new WebSocketClientImpl();
ws.connect("ws://localhost:8081", [
  "./src/protos/message1.proto",
  "./src/protos/message2.proto",
  "./src/protos/message3.proto",
  "./src/protos/chien.proto",
]);

ws.onConnect(() => {
  console.log("✅ Kết nối thành công!");

  // Dữ liệu giả lập
  const message1 = { id: 1, name: "Nguyen Van A" };
  const message2 = { className: "12A", student: 30 };
  const message3 = {
    lastName: "AB",
  };
  const abc = { name: "Le Minh Chien" };

  // Gửi tin nhắn
  ws.send(1, message1, "Message1");
  ws.send(2, message2, "Message2");
  ws.send(3, message3, "Message3");
  ws.send(4, abc, "Chien");
});

ws.onMessage(1, (message) => {
  console.log("📥 Nhận message1 từ server:", message);
});

ws.onMessage(2, (message) => {
  console.log("📥 Nhận message2 từ server:", message);
});

ws.onMessage(3, (message) => {
  console.log("📥 Nhận message3 từ server:", message);
});

ws.onMessage(4, (message) => {
  console.log("📥 Nhận Chien từ server:", message);
});

ws.onClose(() => {
  console.log("❌ Server đóng kết nối.");
});

ws.onError((error) => {
  console.error("⚠️ Lỗi WebSocket:", error);
});
