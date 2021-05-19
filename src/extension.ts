import * as vscode from 'vscode';
import { Parser } from './commands/parser';
import { FileItem } from './commands/FileItem';
// import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

export function activate(context: vscode.ExtensionContext) {
    let activeEditor: vscode.TextEditor;
    let parser: Parser = new Parser();
    let fitem: FileItem = new FileItem();
    let removeComments = function (n: number) {

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
        
        let workspaceName = vscode.workspace.workspaceFolders!![0].uri.fsPath;
        
        let fileName = path.basename(current_editor.document.fileName).split(".")[0].concat(".txt");
        const file = fitem.createFile(workspaceName, fileName);
        
        
        //Display a message box to the user
        vscode.window.setStatusBarMessage(file,1000);
        //fitem.openFile();
    });
    //let open = vscode.commands.registerCommand('gitcom.openFile', () => fitem.openFile());

    context.subscriptions.push(removeAllCommentsCommand);
    context.subscriptions.push(createFile);
    //context.subscriptions.push(open);
}


export function deactivate() { }