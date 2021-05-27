import * as vscode from 'vscode';
import { Parser } from './parser';
import * as rdir from 'recursive-readdir';
import * as path from 'path';
import * as fs from 'fs';
export class ParserController {
    private parser = new Parser();
    
    public async removeComments(fileUri: vscode.Uri) {
        let comments = await this.parser.removeComments(fileUri);
        return comments;
    }

    public async getCommentsInJson(fileUri: vscode.Uri) {
        
        let comments = await this.removeComments(fileUri);
        if(comments.length === 0) {
            return [];
        }
        let anscom = [];
        for(const com of comments){
            anscom.push([com.getComment(), com.getStart().line, com.getStart().character, com.getEnd().character]);
        }
        return anscom;

    }
    public async hideComments(){
        const baseDir = vscode.workspace.workspaceFolders!![0].uri.fsPath;
        let files = await rdir(baseDir, ["*.json"]);
        const ws = vscode.workspace;
        interface IData {
            [index: string] : {co: string, line: string, position: string, endposition: string}[];
        }
        const data = {} as IData;
        for (const file of files) {
            let s = await this.getCommentsInJson(vscode.Uri.file(file));
            let i = 0;
            data[file] = [];
            let a = data[file];
            while(i < s.length) {
                a.push({co: s[i][0].toString(), line: s[i][1].toString(), 
                    position:s[i][2].toString() , endposition: s[i][3].toString()});
                i += 1;
            }
            data[file] = a;
        }
        const filename = baseDir + path.normalize("/.gitcom/data.json");
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    }
}
