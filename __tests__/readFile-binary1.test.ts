import { dirname } from "path";
import { fileURLToPath } from "url";
import * as plist from "../src/index.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = `${__dirname}/test-binary1.plist`;

describe("readFileSync can properly load and read a binary file", () => {
  it("has the proper values", () => {
    expect(plist.readFileSync(filePath)).toMatchInlineSnapshot(`
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

describe("readFile works asynchronously", () => {
  it("has the proper values", async () => {
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
