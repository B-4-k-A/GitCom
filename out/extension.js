"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const parser_1 = require("./commands/parser");
const Writter_1 = require("./commands/Writter");
const GitComFS_1 = require("./commands/GitComFS");
function activate(context) {
    let activeEditor;
    let parser = new parser_1.Parser();
    let writter = new Writter_1.Writter();
    let gitcomFS = new GitComFS_1.GitComFS();
    let removeComments = function (n) {
        if (!activeEditor || !parser.supportedLanguage) {
            return;
        }
        parser.FindSingleLineComments(activeEditor);
        parser.FindMultilineComments(activeEditor);
        vscode.workspace.applyEdit(parser.edit);
    };
    // // Register commands here
    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        console.log("removeAllComment work");
        if (vscode.window.activeTextEditor) {
            activeEditor = vscode.window.activeTextEditor;
            parser.SetRegex(activeEditor, activeEditor.document.languageId);
            removeComments(2);
        }
    });
    // let createFile = vscode.commands.registerCommand('gitcom.createFile', () => {
    //     const document = vscode.window.activeTextEditor?.document.uri;
    //     let newGitComFileUri = gitcomFS.createFile(document);
    // });
    // let writeToFile = vscode.commands.registerCommand('gitcom.saveComments', () => {
    //     let documentUri = vscode.window.activeTextEditor!!.document.uri;
    //     writter.writeToFile(documentUri, "[0:0:0] : \"Hello! how are you? \n klsajflksjdflaksdjf\n ldskjfslkdfjs\n\"");
    // });
    context.subscriptions.push(removeAllCommentsCommand);
    // context.subscriptions.push(createFile);
    // context.subscriptions.push(writeToFile);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map