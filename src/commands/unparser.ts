import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as rdir from 'recursive-readdir';
export class Unparse{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public Unpar(filepath: string){
        const baseDir = vscode.workspace.workspaceFolders!![0].uri.fsPath;
        const filename = baseDir + path.normalize("/.gitcom/data.json");
        var json1 = JSON.parse(fs.readFileSync(filename, 'utf8').toString());
        var i = 0;
        let comres = [];
        //исключения нужны
        while (i < json1[filepath].length){
             comres.push(json1[filepath][i]);
             i++;            
        }
        return comres;
    }
    public resetComments = (async () => {
        const baseDir = vscode.workspace.workspaceFolders!![0].uri.fsPath;
        let files = await rdir(baseDir, ["*.json"]);
        const ws = vscode.workspace;
        for (const file of files) {
            let a = this.Unpar(file);
            let comFileUri = vscode.Uri.file(file);
            let wsEditor: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
            for (let i = 0; i < a.length; i++){
                let linea = parseInt(a[i]['line']);
                if (i !== 0){
                linea -= a[i - 1]['co'].toString().split('\n').length - 1;
                }
                let currPosition: vscode.Position = new vscode.Position(linea, parseInt(a[i]['position'].position));
                wsEditor.insert(comFileUri, currPosition, a[i]['co']);    
            }
            ws.applyEdit(wsEditor);
        }
    });
}