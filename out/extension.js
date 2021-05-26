"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const parser2_1 = require("./parser2");
function activate(context) {
    // let activeEditor: vscode.TextEditor;
    let parser = new parser2_1.Parser2();
    // Register commands here
    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        parser.removeComments(vscode.window.activeTextEditor.document.uri);
    });
    context.subscriptions.push(removeAllCommentsCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map