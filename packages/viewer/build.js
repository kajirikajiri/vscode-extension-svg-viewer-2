const {
  NodeGlobalsPolyfillPlugin,
} = require("@esbuild-plugins/node-globals-polyfill");
const {
  NodeModulesPolyfillPlugin,
} = require("@esbuild-plugins/node-modules-polyfill");

require("esbuild")
  .build({
    entryPoints: [
      "src/main.tsx",
    ],
    bundle: true,
    outdir: "./dist",
    format: "cjs",
    platform: "node",
    target: "node12",
    watch: undefined,
    sourcemap: false,
    minify: true,

    // Node.js global to browser globalThis
    define: {
      global: "globalThis",
    },

    // Enable esbuild polyfill plugins
    plugins: [
      NodeGlobalsPolyfillPlugin({
        process: true,
        buffer: true,
      }),
      NodeModulesPolyfillPlugin(),
    ],
  })
  .catch(() => process.exit(1));

