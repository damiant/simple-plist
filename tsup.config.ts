import { defineConfig } from "tsup";
import { fileURLToPath, pathToFileURL } from "node:url";
import { builtinModules } from "node:module";

// plist@5 is ESM-only with no "require" condition in exports.
// This project uses Yarn PnP which blocks esbuild from resolving transitive deps.
// We use a catch-all onResolve plugin that delegates to Node's import.meta.resolve
// (which respects PnP) for every package import.
const resolved = new Map<string, string>();
const builtins = new Set(builtinModules);

async function resolveWithNode(spec: string): Promise<string | undefined> {
  // Skip Node.js builtins (fs, path, etc.)
  if (builtins.has(spec) || builtins.has(spec.replace(/^node:/, ""))) {
    return undefined;
  }
  if (resolved.has(spec)) return resolved.get(spec)!;
  try {
    const url = await import.meta.resolve!(spec);
    const path = fileURLToPath(url);
    resolved.set(spec, path);
    return path;
  } catch {
    return undefined;
  }
}

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  outDir: "dist",
  splitting: false,
  sourcemap: false,
  noExternal: [/^.*/],
  esbuildPlugins: [
    {
      name: "resolve-via-node",
      setup(build) {
        // Catch all bare specifier imports and resolve via Node's resolver
        build.onResolve({ filter: /^[^./]/ }, async (args) => {
          const path = await resolveWithNode(args.path);
          return path ? { path } : undefined;
        });
      },
    },
  ],
});
