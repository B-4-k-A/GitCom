import * as vscode from 'vscode';
import { ParserController } from './commands/ParserController';
import { UnparseController } from './commands/UnparseController';

export function activate(context: vscode.ExtensionContext) {
    let up: UnparseController = new UnparseController();
    let pc: ParserController = new ParserController(); 

    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        pc.hideComments();
    });

    let resetComments = vscode.commands.registerCommand('gitcom.resetComments', () => {
        up.insertCommments();
    });

    context.subscriptions.push(removeAllCommentsCommand);
    context.subscriptions.push(resetComments);
}


export function deactivate() { }