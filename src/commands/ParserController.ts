import * as vscode from 'vscode';
import { GitComFS } from './GitComFS';
import { Parser } from './parser';
import * as rdir from 'recursive-readdir';
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
        return comments;

    }

    public async hideComments(){
        const workspaceFolder = vscode.workspace.workspaceFolders;
        if(workspaceFolder === undefined) {
            vscode.window.showWarningMessage("Open project folder please");
        }
        const baseDir = workspaceFolder![0].uri.fsPath;
        let files = await rdir(baseDir, ["*.json"]);
        const ws = vscode.workspace;
        interface IData {
            [index: string] : {com: string, startLine: string, startCharacter: string, 
                endLine: string, endCharacter: string}[];
        }
        const data = {} as IData;
        for (const file of files) {
            let comments = await this.getCommentsInJson(vscode.Uri.file(file));
            if(comments.length === 0) {
                continue;
            }
            data[file] = [];
            let a = data[file];
            for(const comm of comments) {
                a.push({com: comm.getComment(), 
                    startLine: comm.getStart().line.toString(), 
                    startCharacter: comm.getStart().character.toString(), 
                    endLine: comm.getEnd().line.toString(), 
                    endCharacter: comm.getEnd().character.toString()});
            }
            data[file] = a;
        }

        const gitCom = GitComFS.getGitComUri();
        const fileName = gitCom.fsPath + "/data.json";
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }
}
