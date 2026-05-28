import _bplistCreator from "bplist-creator";
import _bplistParser from "bplist-parser";
import type { PlistJsObj } from "./types.js";

export const bplistCreator: (object: PlistJsObj) => Buffer = _bplistCreator;

export const bplistParser: {
  parseFile<T = any>(
    fileNameOrBuffer: string | Buffer,
    callback?: (error: Error | null, result: [T]) => void
  ): Promise<[T]>;
  parseFileSync<T = any>(fileNameOrBuffer: string | Buffer): [T];
  parseBuffer<T = any>(buffer: string | Buffer): [T];
} = _bplistParser;

export { parse } from "./parse.js";
export { readFile } from "./readFile.js";
export { readFileSync } from "./readFileSync.js";
export { stringify } from "./stringify.js";
export { writeBinaryFile } from "./writeBinaryFile.js";
export { writeBinaryFileSync } from "./writeBinaryFileSync.js";
export { writeFile } from "./writeFile.js";
export { writeFileSync } from "./writeFileSync.js";

export type {
  callbackFn,
  PlistJsObj,
  StringOrBuffer,
  PlistValue,
} from "./types.js";
