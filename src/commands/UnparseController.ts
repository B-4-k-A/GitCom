import * as vscode from 'vscode';
import * as rdir from 'recursive-readdir';
import { Unparse } from './unparser';


export class UnparseController {
    private unparser: Unparse = new Unparse();

    public async insertCommments() {
        const workspaceFolder = vscode.workspace.workspaceFolders;
            if(workspaceFolder === undefined) {
                vscode.window.showWarningMessage("Open project folder please");
            }
            const baseDir = workspaceFolder![0].uri.fsPath;

            let files = await rdir(baseDir, ["*.json"]);
            const ws = vscode.workspace;
            let wsEditor: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
            for (const file of files) {
                let fileUri = vscode.Uri.file(file);
                this.unparser.resetComments(fileUri, wsEditor);
            }
            ws.applyEdit(wsEditor);
        }
}