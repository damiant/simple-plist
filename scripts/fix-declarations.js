import { readFileSync, readdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../dist");

// Read all .d.ts files and add .js extensions to relative imports
readdirSync(distDir)
  .filter((f) => f.endsWith(".d.ts"))
  .forEach((file) => {
    const filePath = join(distDir, file);
    let content = readFileSync(filePath, "utf8");

    // Replace relative imports without .js extension
    content = content.replace(/from ['"](\.\/.+?)['"](?!\.)/g, "from '$1.js'");

    writeFileSync(filePath, content);
  });

console.log("Declaration files fixed with .js extensions");
