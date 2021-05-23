import * as vscode from 'vscode';
import { Parser } from './commands/parser';
import { Writter } from './commands/Writter';
import { GitComFS } from './commands/GitComFS';

export function activate(context: vscode.ExtensionContext) {
    let activeEditor: vscode.TextEditor;
    let parser: Parser = new Parser();
    let writter: Writter = new Writter();
    let gitcomFS: GitComFS = new GitComFS();
    let removeComments = function (n: number) {

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


export function deactivate() { }