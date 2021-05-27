import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class GitComFS {

    private static gitcomUri?: vscode.Uri;
    private static wsEditor: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();

    private static createDirectory(): vscode.Uri{
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

    public static getGitComUri(): vscode.Uri{
        return this.createDirectory();
    }

    public static isExists(fileUri?: vscode.Uri): boolean {
        if(fileUri === undefined) {
            return false;
        }
        return fs.existsSync(fileUri!.fsPath);
    }

}
