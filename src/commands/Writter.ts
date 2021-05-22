import * as vscode from 'vscode';
import * as path from 'path';

export class Writter {
    
    private wsEditor: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
    public currPosition: vscode.Position = new vscode.Position(0, 0);
    public writeToFile(fileUri: vscode.Uri, text: string) {
        const ws = vscode.workspace;
        let gitcom = ws.workspaceFolders!![0].uri.fsPath + "/.gitcom";
        let comFileUri = vscode.Uri.file(gitcom + "/" + path.basename(fileUri.fsPath).split(".")[0].concat(".txt"));
        this.wsEditor.insert(comFileUri, this.currPosition, text);
        ws.applyEdit(this.wsEditor);
    }
}