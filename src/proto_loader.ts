import path from "path";
import * as fs from "fs";
import protobuf from "protobufjs";

const protoDir = path.join(__dirname, "protos");
const loadMessages: { [key: string]: protobuf.Type } = {};

// Tự động load tất cả các file .proto trong thư mục protos/**
fs.readdirSync(protoDir).forEach((file) => {
  if (file.endsWith(".proto")) {
    const filePath = path.join(protoDir, file);
    const root = protobuf.loadSync(filePath);
    root.nestedArray.forEach((type: any) => {
      if (type instanceof protobuf.Type) {
        loadMessages[type.name] = type;
      }
    });
  }
});

console.log("Loaded messages:", Object.keys(loadMessages));

export { loadMessages };
