import * as vscode from 'vscode';
import { Parser } from './parser';

export function activate(context: vscode.ExtensionContext) {

    let activeEditor: vscode.TextEditor;
    let parser: Parser = new Parser();

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


    context.subscriptions.push(removeAllCommentsCommand);

}

export function deactivate() { }