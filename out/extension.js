"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const parser_1 = require("./parser");
function activate(context) {
    let activeEditor;
    let parser = new parser_1.Parser();
    let removeComments = function (n) {
        if (!activeEditor || !parser.supportedLanguage) {
            return;
        }
        parser.FindSingleLineComments(activeEditor);
        parser.FindMultilineComments(activeEditor);
        vscode.workspace.applyEdit(parser.edit);
    };
    // Register commands here
    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        if (vscode.window.activeTextEditor) {
            activeEditor = vscode.window.activeTextEditor;
            parser.SetRegex(activeEditor, activeEditor.document.languageId);
            removeComments(2);
        }
    });
    context.subscriptions.push(removeAllCommentsCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map