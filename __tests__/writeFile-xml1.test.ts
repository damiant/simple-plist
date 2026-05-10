import { dirname } from "path";
import { fileURLToPath } from "url";
import * as plist from "../src/index.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = `${__dirname}/write-test-xml1.plist`;
const testObj = {
  Name: "John Doe",
  "Birth Year": 1942,
  "Travel Log": [
    "Tokyo, Honshu, Japan",
    "Philadelphia, PA",
    "Recife, Pernambuco, Brazil",
  ],
};

describe("writeFileSync can produce a valid file", () => {
  it("has the proper values", async () => {
    plist.writeFileSync(filePath, testObj);
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

describe("writeFile works asynchronously", () => {
  it("has the proper values", async () => {
    await new Promise<void>((resolve) => {
      plist.writeFile(filePath, testObj, () => {
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
