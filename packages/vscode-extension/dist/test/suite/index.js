"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/web/test/suite/index.ts
var suite_exports = {};
__export(suite_exports, {
  run: () => run
});
module.exports = __toCommonJS(suite_exports);
require("mocha/mocha");
function run() {
  return new Promise((c, e) => {
    mocha.setup({
      ui: "tdd",
      reporter: void 0
    });
    const importAll = (r) => r.keys().forEach(r);
    importAll(require.context(".", true, /\.test$/));
    try {
      mocha.run((failures) => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
    } catch (err) {
      console.error(err);
      e(err);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  run
});
//# sourceMappingURL=index.js.map
