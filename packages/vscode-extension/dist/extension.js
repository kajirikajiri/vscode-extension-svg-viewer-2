"use strict";var p=Object.create;var i=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var g=(t,o)=>{for(var e in o)i(t,e,{get:o[e],enumerable:!0})},u=(t,o,e,c)=>{if(o&&typeof o=="object"||typeof o=="function")for(let n of h(o))!D.call(t,n)&&n!==e&&i(t,n,{get:()=>o[n],enumerable:!(c=C(o,n))||c.enumerable});return t};var x=(t,o,e)=>(e=t!=null?p(w(t)):{},u(o||!t||!t.__esModule?i(e,"default",{value:t,enumerable:!0}):e,t)),y=t=>u(i({},"__esModule",{value:!0}),t);var k={};g(k,{EditorProvider:()=>r,activate:()=>f,deactivate:()=>b});module.exports=y(k);var s=x(require("vscode"));function f(t){console.log('Congratulations, your extension "svg-viewer" is now active in the web extension host!'),t.subscriptions.push(s.window.registerCustomEditorProvider("svg-viewer.hello",new r(t),{webviewOptions:{retainContextWhenHidden:!0},supportsMultipleEditorsPerDocument:!1}))}function b(){}var r=class{constructor(o){this._onDidChangeCustomDocument=new s.EventEmitter;this.onDidChangeCustomDocument=this._onDidChangeCustomDocument.event;this.context=o}async saveCustomDocument(o,e){console.log("saveCustomDocument")}async saveCustomDocumentAs(o,e,c){console.log("saveCustomDocumentAs")}async revertCustomDocument(o,e){console.log("revertCustomDocument")}async backupCustomDocument(o,e,c){return console.log("backupCustomDocument"),{}}async openCustomDocument(o,e,c){return console.log("openCustomDocument"),{uri:o,dispose:()=>{}}}async resolveCustomEditor(o,e,c){console.log("resolveCustomEditor"),e.webview.onDidReceiveMessage(v=>{s.window.showInformationMessage(v)}),e.webview.options={enableScripts:!0};let n=$(),a=this.context.extensionMode===s.ExtensionMode.Development,d=`
    default-src 'none';
    connect-src ${e.webview.cspSource} https: data: ${a?"ws://localhost:5971":""};
    img-src ${e.webview.cspSource} https: data:;
    font-src ${e.webview.cspSource} https: data:;
    style-src ${e.webview.cspSource} https: data: 'unsafe-inline';
    script-src 'nonce-${n}' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic';
  `,m=`
  <script nonce="${n}" type="module">
    console.log("load vite script");
    import RefreshRuntime from "http://localhost:5971/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  <\/script>
  <script nonce="${n}" type="module" src="http://localhost:5971/@vite/client"><\/script>
`,l=a?"http://localhost:5971/src/main.tsx":e.webview.asWebviewUri(s.Uri.joinPath(this.context.extensionUri,"dist","webview.js")).toString();e.webview.html=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="${d}">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="padding:0;">
      <div id="root" style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; display: flex;"></div>
      ${a?m:""}
      <script nonce="${n}" type="module" src="${l}"><\/script>
    </body>
    </html>
    `}};function $(){let t="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let e=0;e<32;e++)t+=o.charAt(Math.floor(Math.random()*o.length));return t}0&&(module.exports={EditorProvider,activate,deactivate});
