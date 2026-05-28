export type callbackFn<T> = (error: Error | null, result?: T) => void;
export type StringOrBuffer = string | Buffer;
export type PlistJsObj = Record<any, any> | any[];
export type PlistValue =
  | string
  | number
  | boolean
  | Date
  | Uint8Array
  | { [key: string]: PlistValue }
  | PlistValue[]
  | null;
