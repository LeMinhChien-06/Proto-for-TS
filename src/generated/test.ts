// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.20.3
// source: test.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "";

export interface HelloWorldRequest {
  message: string;
}

export interface HelloWorldResponse {
  response: string;
}

function createBaseHelloWorldRequest(): HelloWorldRequest {
  return { message: "" };
}

export const HelloWorldRequest: MessageFns<HelloWorldRequest> = {
  encode(message: HelloWorldRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HelloWorldRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloWorldRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HelloWorldRequest {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: HelloWorldRequest): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HelloWorldRequest>, I>>(base?: I): HelloWorldRequest {
    return HelloWorldRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HelloWorldRequest>, I>>(object: I): HelloWorldRequest {
    const message = createBaseHelloWorldRequest();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseHelloWorldResponse(): HelloWorldResponse {
  return { response: "" };
}

export const HelloWorldResponse: MessageFns<HelloWorldResponse> = {
  encode(message: HelloWorldResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.response !== "") {
      writer.uint32(10).string(message.response);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HelloWorldResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloWorldResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.response = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HelloWorldResponse {
    return { response: isSet(object.response) ? globalThis.String(object.response) : "" };
  },

  toJSON(message: HelloWorldResponse): unknown {
    const obj: any = {};
    if (message.response !== "") {
      obj.response = message.response;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HelloWorldResponse>, I>>(base?: I): HelloWorldResponse {
    return HelloWorldResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HelloWorldResponse>, I>>(object: I): HelloWorldResponse {
    const message = createBaseHelloWorldResponse();
    message.response = object.response ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
