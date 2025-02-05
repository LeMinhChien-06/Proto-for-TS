import * as protobuf from "protobufjs";
import { WebSocketClient } from "./WebSocketClient";
import WebSocket from "ws"; // dùng để taọ kết nối WS trong môi trường Node.js

export class WebSocketClientImpl implements WebSocketClient {
  private socket!: WebSocket;
  private messageHandlers: Map<number, (message: any) => void> = new Map(); // lưu các callback xử lý tin nhắn
  private protoRoot: protobuf.Root = new protobuf.Root(); // chứa định nghĩa message từ các file .proto đã load

  connect(url: string, protoPaths: string[]): void {
    // Load tất cả file .proto
    Promise.all(protoPaths.map((path) => protobuf.load(path)))
      .then((roots) => {
        roots.forEach((root) => this.protoRoot.add(root));
        console.log("📂 Đã load tất cả file .proto");
      })
      .catch((error) => {
        console.error("⚠️ Lỗi khi load file .proto:", error);
      });

    // mở kết nối
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("🔗 Kết nối WebSocket thành công.");
      this.onConnectCallback?.();
    };

    this.socket.onmessage = (event) => {
      const dataString = event.data.toString();
      const { id, data, messageType } = JSON.parse(dataString);
      const messageHandler = this.messageHandlers.get(id);
      if (messageHandler) {
        const messageClass = this.protoRoot.lookupType(messageType);
        const decodedMessage = messageClass.decode(new Uint8Array(data));
        messageHandler(decodedMessage);
      }
    };

    this.socket.onclose = () => {
      console.log("🔌 Server đóng kết nối.");
      this.onCloseCallback?.();
    };

    this.socket.onerror = (error) => {
      console.log("🚨 Lỗi kết nối:", error);
      this.onErrorCallback?.(error);
    };
  }

  send(id: number, message: any, messageType: string): void {
    const messageClass = this.protoRoot.lookupType(messageType);
    if (!messageClass) {
      console.error(`Không tìm thấy message type: ${messageType}`);
      return;
    }
    const encodedMessage = messageClass
      .encode(messageClass.create(message))
      .finish();
    // Chuyển Uint8Array thành mảng số để JSON.stringify được
    this.socket.send(
      JSON.stringify({ id, data: Array.from(encodedMessage), messageType })
    );
  }

  onMessage<T>(id: number, callback: (message: T) => void): void {
    this.messageHandlers.set(id, callback);
  }

  private onConnectCallback?: () => void;
  private onCloseCallback?: () => void;
  private onErrorCallback?: (error: any) => void;

  onConnect(callback: () => void): void {
    this.onConnectCallback = callback;
  }

  onClose(callback: () => void): void {
    this.onCloseCallback = callback;
  }

  onError(callback: (error: any) => void): void {
    this.onErrorCallback = callback;
  }
}
