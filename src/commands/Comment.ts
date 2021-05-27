import * as vscode from 'vscode';

export class Comment {
    private comment!: string;
    private start!: vscode.Position;
    private end!: vscode.Position;

    constructor(comment: string, start: vscode.Position, end: vscode.Position) {
        this.comment = comment;
        this.start = start;
        this.end = end;
    }

    public getComment(): string {
        return this.comment;
    }

    public getStart(): vscode.Position {
        return this.start;
    }

    public getEnd(): vscode.Position {
        return this.end;
    }
}