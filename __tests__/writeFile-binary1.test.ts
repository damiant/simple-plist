import { dirname } from "path";
import { fileURLToPath } from "url";
import * as plist from "../src/index.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = `${__dirname}/write-test-binary1.plist`;
const testObj = {
  Name: "John Doe",
  "Birth Year": 1942,
  "Travel Log": [
    "Tokyo, Honshu, Japan",
    "Philadelphia, PA",
    "Recife, Pernambuco, Brazil",
  ],
};

describe("writeBinaryFileSync can properly load and read a file", () => {
  it("has the proper values", async () => {
    plist.writeBinaryFileSync(filePath, testObj);
    await new Promise<void>((resolve) => {
      plist.readFile(filePath, (error, contents) => {
        expect(contents).toMatchInlineSnapshot(`
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
        resolve();
      });
    });
  });
});

describe("writeBinaryFile works asynchronously", () => {
  it("has the proper values", async () => {
    await new Promise<void>((resolve) => {
      plist.writeBinaryFile(filePath, testObj, () => {
        plist.readFile(filePath, (error, contents) => {
          expect(contents).toMatchInlineSnapshot(`
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
          resolve();
        });
      });
    });
  });
});
