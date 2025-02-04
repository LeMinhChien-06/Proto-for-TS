import { Customer } from "../generated/customer";
import { Writer } from "protobufjs/minimal";

function demoCustomer() {
  // Tạo một đối tượng Customer
  const customer: Customer = {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    phone: "0862265204",
  };

  // Mã hóa đối tượng thành Uint8Array (binary)
  const encoded = Customer.encode(customer).finish();
  console.log("Encoded binary:", encoded);

  // Giải mã (decode) từ binary về lại đối tượng Customer
  const decoded = Customer.decode(encoded);
  console.log("Decoded customer:", decoded);
}

demoCustomer();
