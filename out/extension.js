"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const ParserController_1 = require("./ParserController");
function activate(context) {
    // let activeEditor: vscode.TextEditor;
    let parserCon = new ParserController_1.ParserController();
    // Register commands here
    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        parserCon.getCommentsInJson(vscode.window.activeTextEditor.document.uri);
    });
    context.subscriptions.push(removeAllCommentsCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map