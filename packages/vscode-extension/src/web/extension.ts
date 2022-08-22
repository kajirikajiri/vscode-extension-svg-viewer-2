// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "svg-viewer" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('svg-viewer.hello', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from  in a web extension host!@!@!');
	// });

	context.subscriptions.push(
		vscode.window.registerCustomEditorProvider(
			"svg-viewer.hello",
			new EditorProvider(context),
			{
			  webviewOptions: {
          retainContextWhenHidden: true,
			  },
			  supportsMultipleEditorsPerDocument: false,
			}
		  )
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}

export class EditorProvider implements vscode.CustomEditorProvider {
	constructor(context: vscode.ExtensionContext) {
		this.context = context;
	}

	private readonly context: vscode.ExtensionContext;
	
	private readonly _onDidChangeCustomDocument =
		new vscode.EventEmitter<vscode.CustomDocumentContentChangeEvent>();

	readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

  async saveCustomDocument(
    document: vscode.CustomDocument,
    cancellation: vscode.CancellationToken
  ): Promise<void> {
    console.log("saveCustomDocument")
	//   
  }

  async saveCustomDocumentAs(
    document: vscode.CustomDocument,
    destination: vscode.Uri,
    cancellation: vscode.CancellationToken
  ): Promise<void> {
    console.log("saveCustomDocumentAs")
	//   
  }

  async revertCustomDocument(
    document: vscode.CustomDocument,
    cancellation: vscode.CancellationToken
  ): Promise<void> {
    console.log("revertCustomDocument")
    // TODO
  }

  async backupCustomDocument(
    document: vscode.CustomDocument,
    context: vscode.CustomDocumentBackupContext,
    cancellation: vscode.CancellationToken
  ): Promise<vscode.CustomDocumentBackup> {
    console.log("backupCustomDocument")
	  return {} as vscode.CustomDocumentBackup
  }

  async openCustomDocument(
    uri: vscode.Uri,
    openContext: vscode.CustomDocumentOpenContext,
    token: vscode.CancellationToken
  ): Promise<vscode.CustomDocument> {
    console.log("openCustomDocument")
    return {
      uri,
      dispose: () => undefined
    }
  }

  async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken
  ): Promise<void> {
    console.log("resolveCustomEditor")
    
    webviewPanel.webview.onDidReceiveMessage((e) => {
      vscode.window.showInformationMessage(e)
    })

    webviewPanel.webview.options = {
      enableScripts: true,
    };
    const nonce = getNonce()
    const isDevelopment = this.context.extensionMode === vscode.ExtensionMode.Development;

    const csp = `
      default-src 'none';
      connect-src ${webviewPanel.webview.cspSource} https: data: ${isDevelopment ? "ws://localhost:5971" : "" };
      img-src ${webviewPanel.webview.cspSource} https: data:;
      font-src ${webviewPanel.webview.cspSource} https: data:;
      style-src ${webviewPanel.webview.cspSource } https: data: 'unsafe-inline';
      script-src 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic';
    `;

    // https://ja.vitejs.dev/guide/backend-integration.html
    const viteScripts = `
      <script nonce="${nonce}" type="module">
        console.log("load vite script");
        import RefreshRuntime from "http://localhost:5971/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script>
      <script nonce="${nonce}" type="module" src="http://localhost:5971/@vite/client"></script>
    `;

    const scriptSrc = isDevelopment
      ? "http://localhost:5971/src/main.tsx"
      : webviewPanel.webview
        .asWebviewUri(
          vscode.Uri.joinPath(this.context.extensionUri, "dist", "webview.js")
        )
        .toString();
        
    // packages/viewerのソースコードを埋め込むための要素
    // 現状、cssファイルの読み込みに対応していないので、直接埋め込んでいる
    const viewerRootElement = `<div id="root" style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; display: flex;"></div>`

    webviewPanel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="${csp}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="padding:0;">
        ${viewerRootElement}
        ${isDevelopment ? viteScripts : ""}
        <script nonce="${nonce}" type="module" src="${scriptSrc}"></script>
      </body>
      </html>
    `
  }
}

function getNonce(): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
