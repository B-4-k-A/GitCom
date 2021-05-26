import * as vscode from 'vscode';
import { ParserController } from './ParserController';

export function activate(context: vscode.ExtensionContext) {

    // let activeEditor: vscode.TextEditor;
    let parserCon: ParserController = new ParserController();


    // Register commands here

    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        
        parserCon.getCommentsInJson(vscode.window.activeTextEditor!.document.uri);
        

    });


    context.subscriptions.push(removeAllCommentsCommand);

}

export function deactivate() { }