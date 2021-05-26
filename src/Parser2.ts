import * as vscode from 'vscode';

export class Parser2 {
    private delimiter?: string;
    private multilineComment: boolean = false;
    public supportedLanguage: boolean = true;
    

    public async removeComments(fileUri: vscode.Uri) {
        let languageId = await vscode.workspace.openTextDocument(fileUri).then(async (doc: vscode.TextDocument) => {
            return doc.languageId;
        });
            let supported = this.setDelimiter(languageId);
            if(!supported) {
                vscode.window.showWarningMessage("Unsupported file");
                return;
            }
            let editor = new vscode.WorkspaceEdit();
            let singleLineCommData = await this.removeSingleLineCom(fileUri, editor);
            let multiLineCommData = await this.removeMultiLineCom(fileUri, editor);

            vscode.workspace.applyEdit(editor);
            console.log(singleLineCommData[0]);
            console.log(multiLineCommData![0]);

    }

    private async removeSingleLineCom(fileUri: vscode.Uri, editor: vscode.WorkspaceEdit) {
        let deletedComm: string[] = [];
        let deletedCommStartPos: vscode.Position[] = [];
        let deletedCommEndPos: vscode.Position[] = [];
        let doc = await this.uriToTextDocument(fileUri);
        let regex = RegExp(this.delimiter + "~.+");
        let match: any;
        for(var l = 0; l < doc.lineCount; l++) {
            let line = doc.lineAt(l);
            match = regex.exec(line.text);
            if(match === null) {
                continue;
            }
            let startPos = new vscode.Position(l, match.index);
            let endPos = new vscode.Position(l, line.text.length);
            let range = new vscode.Range(startPos, endPos);
            let comment = doc.getText(range);
            deletedCommStartPos.push(startPos);
            deletedCommEndPos.push(endPos);
            deletedComm.push(comment);
            editor.delete(doc.uri, range);
        }
        return [deletedComm, deletedCommStartPos, deletedCommEndPos];
    }

    private async removeMultiLineCom(fileUri: vscode.Uri, editor: vscode.WorkspaceEdit) {
        if (!this.multilineComment) {
            return;
        }
        let deletedComm: string[] = [];
        let deletedCommStartPos: vscode.Position[] = [];
        let deletedCommEndPos: vscode.Position[] = [];

        let doc = await this.uriToTextDocument(fileUri);
        let text = doc.getText();
        let regEx: RegExp = /(^|[ \t])(\/\*~[^*])+([\s\S]*?)(\*\/)/gm;
        let match: any;

        while (match = regEx.exec(text)) {
            let startPos = doc.positionAt(match.index);
            let endPos = doc.positionAt(match.index + match[0].length);
            let range = new vscode.Range(startPos, endPos);
            let comment = doc.getText(range);
            editor.delete(fileUri, range);
            deletedCommStartPos.push(startPos);
            deletedCommEndPos.push(endPos);
            deletedComm.push(comment);
        }
        return [deletedComm, deletedCommStartPos, deletedCommEndPos];

    }

    private async uriToTextDocument(fileUri: vscode.Uri) {
        return vscode.workspace.openTextDocument(fileUri).then((doc: vscode.TextDocument) => {
            return doc;
        });
    }

    public setDelimiter(languageCode: string) {
        switch (languageCode) {
            case "c":
            case "cpp":
            case "csharp":
            case "css":
            case "dart":
            case "fsharp":
            case "go":
            case "java":
            case "javascript":
            case "javascriptreact":
            case "jsonc":
            case "kotlin":
            case "pascal":
            case "objectpascal":
            case "php":
            case "rust":
            case "scala":
            case "swift":
            case "typescript":
            case "typescriptreact":
                this.delimiter = "//";
                this.multilineComment = true;
                break;

            case "coffeescript":
            case "dockerfile":
            case "elixir":
            case "graphql":
            case "julia":
            case "makefile":
            case "perl":
            case "perl6":
            case "powershell":
            case "python":
            case "r":
            case "ruby":
            case "shellscript":
            case "yaml":
                this.delimiter = "#";
                break;

            case "haskell":
            case "plsql":
            case "sql":
            case "lua":
                this.delimiter = "--";
                break;

            case "latex":
                this.delimiter = "%";
                break;
            default:
                this.supportedLanguage = false;
                break;
        }

        return this.supportedLanguage;
    }
}