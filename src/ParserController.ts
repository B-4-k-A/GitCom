import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import * as vscode from 'vscode';
import { Parser } from './Parser';


export class ParserController {
    private parser = new Parser();

    public async removeComments(fileUri: vscode.Uri) {
        let comments = await this.parser.removeComments(fileUri);
        if(comments.length === 0) {
            return [];
        }
        if(comments[1] === undefined) {
            return comments[0];
        }
        return comments;
    }

    public async getCommentsInJson(fileUri: vscode.Uri) {
        let comments = await this.removeComments(fileUri);
        if(comments!.length === 0) {
            return [];
        }
        for(const data of comments!) {
            let comm!: string[] = data![0];
            let startPos!: vscode.Position[] = data![1];
            let endPos!: vscode.Position[] = data![2];

            for(let i = 0; i < comm.length; i++)
        }
    }
}