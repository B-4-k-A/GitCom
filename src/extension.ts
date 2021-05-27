import * as vscode from 'vscode';
import { Unparse } from './commands/unparser';
import { ParserController } from './commands/ParserController';

export function activate(context: vscode.ExtensionContext) {
    let unparser: Unparse = new Unparse();
    let pc: ParserController = new ParserController(); 

    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        pc.hideComments();
    });

    let resetComments = vscode.commands.registerCommand('gitcom.resetComments', () => {
        unparser.resetComments();
    });

    context.subscriptions.push(removeAllCommentsCommand);
    context.subscriptions.push(resetComments);
}


export function deactivate() { }