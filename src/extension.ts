import * as vscode from 'vscode';
import { Parser2 } from './parser2';

export function activate(context: vscode.ExtensionContext) {

    // let activeEditor: vscode.TextEditor;
    let parser: Parser2 = new Parser2();


    // Register commands here

    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        
        parser.removeComments(vscode.window.activeTextEditor!.document.uri);
        

    });


    context.subscriptions.push(removeAllCommentsCommand);

}

export function deactivate() { }