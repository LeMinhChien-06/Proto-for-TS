/**
 * ví dụ :
 *
 *
 * const ws = new WebSocketClient();
 * ws.connect("ws://localhost:8081");
 * let message1 : Message1 = { id: 1, name: "Nguyen Van A" };
 * let message2 : Message2 = { className : "12A", student: 30 };
 * let message3 : Message3 = { id: 1, name: "Nguyen Van A", className : "12A", student: 30 };
 * ws.onMessage(1, (message1) => { log(message1) });
 * ws.onMessage(2, (message2) => { log(message2) });
 * ws.onMessage(3, (message3) => { log(message3) });
 * ws.onConnect(() => {
 *     console.log("🔗 Kết nối WebSocket thành công.")
 *     let customerData1 : Message1 = { id: 1, name: "Nguyen Van A" };
 *     let customerData2 : Message2 = { className : "12A", student: 30 };
 *     let customerData3 : Message3 = { id: 1, name: "Nguyen Van A", className : "12A", student: 30 };
 *     ws.send(1, customerData1);
 *     ws.send(2, customerData2);
 *     ws.send(3, customerData3);
 * });
 * ws.onClose(() => {
 *     console.log("🔌 Server đóng kết nối.")
 * });
 * ws.onError((error) => {
 *     console.log("🚨 Lỗi kết nối:", error)
 * });
 *
 */

export interface WebSocketClient {
  /**
   * Truyền vào url của server để kết nối
   * @param url
   */
  connect(url: string): void;
  /**
   * Gửi message lên server
   * @param id : id của message
   * @param message : message của message
   */
  send(id: number, message: any): void;
  /**
   * Nhận message từ server
   * @param id : id của message
   * @param callback : hàm xử lý message, dữ liệu của message (object) sẽ được truyền vào hàm callback
   */
  onMessage<T>(id: number, callback: (message: T) => void): void;
  /**
   * Hàm xử lý khi kết nối thành công
   * @param callback : hàm xử lý khi kết nối thành công
   */
  onConnect(callback: () => void): void;
  /**
   * Hàm xử lý khi kết nối đóng
   * @param callback : hàm xử lý khi kết nối đóng
   */
  onClose(callback: () => void): void;
  /**
   * Hàm xử lý khi có lỗi xảy ra
   * @param callback : hàm xử lý khi có lỗi xảy ra
   */
  onError(callback: (error: any) => void): void;
}
