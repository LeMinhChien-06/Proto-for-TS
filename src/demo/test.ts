import { HelloWorldRequest } from "../generated/test";

const test = () => {
  const encoded = HelloWorldRequest.encode({ message: "Hello Chien" }).finish(); // .finish(): hoàn tất quá trình mã hóa
  console.log("Encoded binary:", encoded);

  console.log("Decoded customer:", HelloWorldRequest.decode(encoded));
};
test();
