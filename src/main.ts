import * as path from "path";
import * as fs from "fs";
import { execSync } from "child_process";

// Đường dẫn tới thư mục chứa file .proto và thư mục output cho mã TypeScript sinh ra
const protoDir: string = path.join(__dirname, "../src/protos");
const outputDir: string = path.join(__dirname, "../src/generated");

// Hàm sinh mã TypeScript từ tất cả các file .proto
export async function generateProtobuf(): Promise<void> {
  // Kiểm tra và tạo thư mục output nếu chưa tồn tại
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // nếu chưa tồn tại tạo thư mục gồm cả thư mục cha nếu cần
  }

  // Lấy danh sách các file .proto trong thư mục protos
  const files: string[] = fs
    .readdirSync(protoDir) // Lấy danh sách tất cả các file trong thư mục protoDir
    .filter((file) => file.endsWith(".proto"));
  if (files.length === 0) {
    console.log("Không tìm thấy file .proto trong thư mục:", protoDir);
    return;
  }

  // Xác định đường dẫn tới plugin của ts-proto
  let pluginPath = path.join(
    __dirname,
    "../node_modules/.bin/protoc-gen-ts_proto"
  );
  if (process.platform === "win32") {
    // Trên Windows, sử dụng file .cmd được tạo ra
    pluginPath = path.join(
      __dirname,
      "../node_modules/.bin/protoc-gen-ts_proto.cmd"
    );
  }

  for (const file of files) {
    const protoFile: string = path.join(protoDir, file);
    // Xây dựng lệnh gọi protoc với plugin ts-proto
    const command: string = `npx protoc --plugin=protoc-gen-ts_proto="${pluginPath}" --ts_proto_out="${outputDir}" "${protoFile}" --proto_path="${protoDir}"`;

    /*     Lệnh protoc này có nhiệm vụ chuyển đổi file .proto thành TypeScript:
          npx protoc: Chạy protoc thông qua npx.
          --plugin=protoc-gen-ts_proto="...": Xác định plugin ts-proto.
          --ts_proto_out="...": Đặt thư mục output cho mã TypeScript sinh ra.
          "${protoFile}": Đường dẫn đến file .proto đang được xử lý.
          --proto_path="${protoDir}": Xác định thư mục chứa file .proto. */

    try {
      console.log(`Đang sinh mã TypeScript cho: ${file}`);
      execSync(command, { stdio: "inherit" });
    } catch (error) {
      console.error(`Lỗi khi sinh mã cho ${file}:`, error);
    }
  }

  console.log("✅ Sinh mã TypeScript từ tất cả file .proto thành công!");
}

// Gọi hàm sinh mã
generateProtobuf();
