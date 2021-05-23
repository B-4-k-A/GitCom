import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as rdir from 'recursive-readdir';
export class Unparse{
    public Unpar(filepath: string){
        const baseDir = vscode.workspace.workspaceFolders!![0].uri.fsPath;
        const filename = baseDir + path.normalize("/.gitcom/data.json");
        var json1 = JSON.parse(fs.readFileSync(filename, 'utf8').toString());
        var i = 0;
        let comres = [];
        //исключения нужны
        while (i < json1[filepath]['comments'].length){
             comres.push(json1[filepath]['comments'][i]);
             i++;            
        }

        return comres;
    }
    public resetComments = (async () => {
        const baseDir = vscode.workspace.workspaceFolders!![0].uri.fsPath;
        let files = await rdir(baseDir);
        const ws = vscode.workspace;
        for (const file of files) {
            if (!file.endsWith('.json')){
            let a = this.Unpar(file);
            let comFileUri = vscode.Uri.file(file);
            let wsEditor: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
            for (let i = 0; i < a.length; i++){
                let currPosition: vscode.Position = new vscode.Position(a[i]['line'], a[i]['position']);
                wsEditor.insert(comFileUri, currPosition, a[i]['comment'] + '\n');
                ws.applyEdit(wsEditor);    
                wsEditor = new vscode.WorkspaceEdit();
            }
        }
        }
    //ws.applyEdit(wsEditor);
    });
}