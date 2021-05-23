import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class GitComFS {

    private gitcomUri?: vscode.Uri;
    private wsEditor: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();

    private createDirectory(): vscode.Uri{
        if(this.isExists(this.gitcomUri)) {
            return this.gitcomUri!;
        }
        let ws = vscode.workspace;
        let wsFolders = ws.workspaceFolders;

        if(wsFolders === undefined) {
            console.log("folder undefined");
        }
        let gitcomPath = wsFolders!![0].uri.fsPath + "/.gitcom";
        let directoryUri = vscode.Uri.file(gitcomPath);
        ws.fs.createDirectory(directoryUri);
        this.gitcomUri = directoryUri;
        return this.gitcomUri;
    }

    public getGitComUri(): vscode.Uri | null{
        return this.createDirectory();
    }

    public isExists(fileUri?: vscode.Uri): boolean {
        if(fileUri === undefined) {
            return false;
        }
        return fs.existsSync(fileUri!.fsPath);
    }

}