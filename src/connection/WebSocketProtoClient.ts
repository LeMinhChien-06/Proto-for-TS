import { WebSocketClient } from "./WebSocketCLient";

class WebSocketProtoClient implements WebSocketClient {
  private socket!: WebSocket;
  private messageHandlers: Map<number, (message: any) => void> = new Map();
  private connectHandler?: () => void;
  private closeHandler?: () => void;
  private errorHandler?: (error: Event) => void;

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("🔗 Kết nối WebSocket thành công.");
      if (this.connectHandler) {
        this.connectHandler();
      }
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { id, message } = data;
        if (this.messageHandlers.has(id)) {
          this.messageHandlers.get(id)!(message);
        }
      } catch (error) {
        console.error("🚨 Lỗi khi xử lý dữ liệu nhận từ server:", error);
      }
    };

    this.socket.onclose = () => {
      console.log("🔌 Server đóng kết nối.");
      if (this.closeHandler) {
        this.closeHandler();
      }
    };

    this.socket.onerror = (event) => {
      console.error("🚨 Lỗi kết nối:", event);
      if (this.errorHandler) {
        this.errorHandler(event);
      }
    };
  }

  send(id: number, message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ id, message }));
    } else {
      console.error(
        "🚨 Không thể gửi tin nhắn. WebSocket chưa được kết nối hoặc đã đóng."
      );
    }
  }

  onMessage<T>(id: number, callback: (message: T) => void): void {
    this.messageHandlers.set(id, callback);
  }

  onConnect(callback: () => void): void {
    this.connectHandler = callback;
  }

  onClose(callback: () => void): void {
    this.closeHandler = callback;
  }

  onError(callback: (error: any) => void): void {
    this.errorHandler = callback;
  }
}
// Sử dụng ví dụ
const ws = new WebSocketProtoClient();
ws.connect("ws://localhost:8081");

ws.onConnect(() => {
  console.log("🔗 WebSocket đã kết nối thành công!");
  ws.send(1, { id: 1, name: "Nguyen Van A" });
  ws.send(2, { className: "12A", student: 30 });
  ws.send(3, { id: 1, name: "Nguyen Van A", className: "12A", student: 30 });
});

ws.onMessage(1, (message) => console.log("📩 Nhận tin nhắn 1:", message));
ws.onMessage(2, (message) => console.log("📩 Nhận tin nhắn 2:", message));
ws.onMessage(3, (message) => console.log("📩 Nhận tin nhắn 3:", message));

ws.onClose(() => console.log("🔌 Kết nối đã bị đóng."));
ws.onError((error) => console.error("🚨 WebSocket lỗi:", error));
