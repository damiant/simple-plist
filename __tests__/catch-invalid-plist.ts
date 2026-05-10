import { dirname } from "path";
import { fileURLToPath } from "url";
import * as plist from "../src/index.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

it("Throws an error on improperly formatted plist", () => {
  const doIt = () => plist.readFileSync(`${__dirname}/test-xml1-invalid.plist`);
  expect(doIt).toThrow();
});

it("returns an empty object when the file is zero bytes", () => {
  const obj = plist.readFileSync(`${__dirname}/test-xml1-invalid-2.plist`);
  expect(obj).toMatchInlineSnapshot(`{}`);
});
