import { dirname } from "path";
import { fileURLToPath } from "url";
import * as plist from "../src/index.js";
import type { DemoFile } from "./utils/types.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

describe("String parsing", () => {
  it("can parse a string", () => {
    const doc = plist.readFileSync<DemoFile>(`${__dirname}/test-binary1.plist`);
    const plistString = plist.stringify(doc);
    const parsedDoc = plist.parse(plistString);

    return expect(parsedDoc).toMatchInlineSnapshot(`
              {
                "Birth Year": 1942,
                "Name": "John Doe",
                "Travel Log": [
                  "Tokyo, Honshu, Japan",
                  "Philadelphia, PA",
                  "Recife, Pernambuco, Brazil",
                ],
              }
            `);
  });
});
