"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const parser_1 = require("./commands/parser");
const FileItem_1 = require("./commands/FileItem");
// import * as fs from 'fs';
const path = require("path");
function activate(context) {
    let activeEditor;
    let parser = new parser_1.Parser();
    let fitem = new FileItem_1.FileItem();
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
    let createFile = vscode.commands.registerCommand('gitcom.createFile', () => {
        const current_editor = vscode.window.activeTextEditor;
        if (!current_editor) {
            return;
        }
        let workspaceName = vscode.workspace.workspaceFolders[0].uri.fsPath;
        let fileName = path.basename(current_editor.document.fileName).split(".")[0].concat(".txt");
        const file = fitem.createFile(workspaceName, fileName);
        //Display a message box to the user
        vscode.window.setStatusBarMessage(file, 1000);
        //fitem.openFile();
    });
    //let open = vscode.commands.registerCommand('gitcom.openFile', () => fitem.openFile());
    context.subscriptions.push(removeAllCommentsCommand);
    context.subscriptions.push(createFile);
    //context.subscriptions.push(open);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map