const dev = process.argv.includes("--dev");

require("esbuild")
  .build({
    entryPoints: [
      "src/web/extension.ts",
      "src/web/test/suite/index.ts",
    ],
    bundle: true,
    outdir: "./dist",
    external: ["vscode", "mocha"],
    format: "cjs",
    platform: "node",
    target: "node12",
    watch: undefined,
    sourcemap: dev,
    minify: !dev,
  })
  .catch(() => process.exit(1));
