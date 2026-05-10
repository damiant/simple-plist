import plist from "plist";
import type { PlistJsObj } from "./types.js";

export function stringify(anObject: PlistJsObj) {
  return plist.build(anObject);
}
