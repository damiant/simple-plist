import { dirname } from "path";
import { fileURLToPath } from "url";
import * as plist from "../src/index.js";
import type { DemoFile } from "./utils/types.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = `${__dirname}/test-xml1.plist`;

type TestXml1 = DemoFile & { "Empty String": string };

describe("readFileSync can properly load and read a file", () => {
  const contents = plist.readFileSync<TestXml1>(filePath);
  it("has the proper values", () => {
    if (!contents["Name"]) {
      throw new Error(`Failed to parse ${filePath}`);
    }
    expect(contents).toMatchInlineSnapshot(`
      {
        "Birth Year": 1942,
        "Empty String": "",
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

describe("readFile works asynchronously", () => {
  it("has the proper values", async () => {
    await new Promise<void>((resolve) => {
      plist.readFile<TestXml1>(filePath, (err, contents) => {
        if (!contents) {
          throw new Error(`Failed to parse ${filePath}`);
        }
        expect(contents).toMatchInlineSnapshot(`
          {
            "Birth Year": 1942,
            "Empty String": "",
            "Name": "John Doe",
            "Travel Log": [
              "Tokyo, Honshu, Japan",
              "Philadelphia, PA",
              "Recife, Pernambuco, Brazil",
            ],
          }
        `);
        resolve();
      });
    });
  });
});
