import WebSocket from "ws";
import { Customer } from "../generated/customer";
import { customerData } from "../demo/customerData";

const ws = new WebSocket("ws://localhost:8081");

ws.on("open", () => {
  console.log("🔗 Kết nối WebSocket thành công.");

  // Mã hóa dữ liệu thành Uint8Array (binary)
  const encoded = Customer.encode(customerData).finish();
  console.log("📤 Gửi binary:", encoded);

  ws.send(encoded);
});

ws.on("message", (data) => {
  // Giải mã phản hồi từ server
  const decoded = Customer.decode(new Uint8Array(data as Buffer));
  console.log("📩 Nhận phản hồi từ server:", decoded);
});

ws.on("close", () => {
  console.log("🔌 Server đóng kết nối.");
  process.exit(0);
});
