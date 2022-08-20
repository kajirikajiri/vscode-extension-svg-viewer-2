"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/web/extension.ts
var extension_exports = {};
__export(extension_exports, {
  EditorProvider: () => EditorProvider,
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
function activate(context) {
  console.log('Congratulations, your extension "svg-viewer" is now active in the web extension host!');
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      "svg-viewer.hello",
      new EditorProvider(context),
      {
        webviewOptions: {
          retainContextWhenHidden: true
        },
        supportsMultipleEditorsPerDocument: false
      }
    )
  );
}
function deactivate() {
}
var EditorProvider = class {
  constructor(context) {
    this._onDidChangeCustomDocument = new vscode.EventEmitter();
    this.onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
    this.context = context;
  }
  async saveCustomDocument(document, cancellation) {
    console.log("saveCustomDocument");
  }
  async saveCustomDocumentAs(document, destination, cancellation) {
    console.log("saveCustomDocumentAs");
  }
  async revertCustomDocument(document, cancellation) {
    console.log("revertCustomDocument");
  }
  async backupCustomDocument(document, context, cancellation) {
    console.log("backupCustomDocument");
    return {};
  }
  async openCustomDocument(uri, openContext, token) {
    console.log("openCustomDocument");
    return {
      uri,
      dispose: () => void 0
    };
  }
  async resolveCustomEditor(document, webviewPanel, token) {
    console.log("resolveCustomEditor");
    webviewPanel.webview.onDidReceiveMessage((e) => {
      vscode.window.showInformationMessage(e);
    });
    webviewPanel.webview.options = {
      enableScripts: true
    };
    const nonce = getNonce();
    const isDevelopment = this.context.extensionMode === vscode.ExtensionMode.Development;
    const csp = `
    default-src 'none';
    connect-src ${webviewPanel.webview.cspSource} https: data: ${isDevelopment ? "ws://localhost:5971" : ""};
    img-src ${webviewPanel.webview.cspSource} https: data:;
    font-src ${webviewPanel.webview.cspSource} https: data:;
    style-src ${webviewPanel.webview.cspSource} https: data: 'unsafe-inline';
    script-src 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic';
  `;
    const viteScripts = `
  <script nonce="${nonce}" type="module">
    console.log("load vite script");
    import RefreshRuntime from "http://localhost:5971/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  <\/script>
  <script nonce="${nonce}" type="module" src="http://localhost:5971/@vite/client"><\/script>
`;
    const scriptSrc = isDevelopment ? "http://localhost:5971/src/main.tsx" : webviewPanel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "dist", "webview.js")
    ).toString();
    webviewPanel.webview.html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="${csp}">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div id="root"></div>
      ${isDevelopment ? viteScripts : ""}
      <script nonce="${nonce}" type="module" src="${scriptSrc}"><\/script>
    </body>
    </html>
    `;
  }
};
function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditorProvider,
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
