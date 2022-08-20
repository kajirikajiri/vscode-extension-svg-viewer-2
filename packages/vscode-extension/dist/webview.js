window.addEventListener("load", () => {
    console.log("helloooo")
    const vscode = acquireVsCodeApi()
    vscode.postMessage("test")
})
// console.log("helloooo")