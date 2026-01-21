const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "../dist");

// Read all .d.ts files and add .js extensions to relative imports
fs.readdirSync(distDir)
  .filter((f) => f.endsWith(".d.ts"))
  .forEach((file) => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, "utf8");

    // Replace relative imports without .js extension
    content = content.replace(/from ['"](\.\/.+?)['"](?!\.)/g, "from '$1.js'");

    fs.writeFileSync(filePath, content);
  });

console.log("Declaration files fixed with .js extensions");
