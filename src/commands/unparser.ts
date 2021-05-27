import * as fs from 'fs';
import * as vscode from 'vscode';
import { GitComFS } from './GitComFS';

export class Unparse{

    private Unpar(fileUri: vscode.Uri){
        const gitcom = GitComFS.getGitComUri();
        const fileName = gitcom.fsPath + "/data.json";
        var data = JSON.parse(fs.readFileSync(fileName, 'utf8').toString());
        var i = 0;
        let comres = [];
        //исключения нужны
        while (i < data[fileUri.path].length){
            comres.push(data[fileUri.path][i]);
            i++;            
        }
        return comres;
    }

    public resetComments = (async (fileUri: vscode.Uri, wsEditor: vscode.WorkspaceEdit) => {
        
            let a = this.Unpar(fileUri);
            for (let i = 0; i < a.length; i++){
                let linea = parseInt(a[i]['startLine']);
                if (i !== 0){
                linea -= a[i - 1]['com'].toString().split('\n').length - 1;
                }
                let currPosition: vscode.Position = new vscode.Position(linea, 
                    parseInt(a[i]['startCharacter'].startCharacter));
                wsEditor.insert(fileUri, currPosition, a[i]['com']);
            } 
        }
    );
}