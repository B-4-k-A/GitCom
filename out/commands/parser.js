"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const vscode = require("vscode");
class Parser {
    constructor() {
        this.delimiters = [];
        this.removeRanges = [];
        this.multilineComments = false;
        this.config = vscode.workspace.getConfiguration('gitcom').multilineComments;
        this.edit = new vscode.WorkspaceEdit();
        this.supportedLanguage = true;
    }
    SetRegex(activeEditor, languageCode) {
        if (this.setDelimiter(languageCode)) {
            this.edit = new vscode.WorkspaceEdit();
            this.uri = activeEditor.document.uri;
        }
        else {
            vscode.window.showInformationMessage("Cannot remove comments : unknown language (" + languageCode + ")");
        }
    }
    FindSingleLineComments(activeEditor) {
        for (var l = 0; l < activeEditor.document.lineCount; l++) {
            let line = activeEditor.document.lineAt(l);
            let matched = false;
            for (var i = 0; i < this.delimiters.length; i++) {
                if (!matched) {
                    let expression = this.delimiters[i].replace(/\//ig, "\\/");
                    let removeRange = this.removeRanges[i];
                    let regEx = new RegExp(expression, "ig");
                    let match = regEx.exec(line.text);
                    if (match) {
                        if (removeRange) {
                            let startPos = new vscode.Position(l, match.index);
                            let endPos = new vscode.Position(l, line.text.length);
                            let range = new vscode.Range(startPos, endPos);
                            this.edit.delete(this.uri, range);
                            let n = activeEditor.document.getText(range);
                        }
                        else {
                            let startPos = new vscode.Position(l, match.index);
                            let endPos = new vscode.Position(l + 1, 0);
                            let range = new vscode.Range(startPos, endPos);
                            this.edit.delete(this.uri, range);
                            let n = activeEditor.document.getText(range);
                        }
                        matched = true;
                    }
                }
            }
        }
    }
    FindMultilineComments(activeEditor) {
        if (!this.multilineComments) {
            return;
        }
        let text = activeEditor.document.getText();
        let uri = activeEditor.document.uri;
        let regEx = /(^|[ \t])(\/\*[^*])+([\s\S]*?)(\*\/)/gm;
        let match;
        while (match = regEx.exec(text)) {
            let startPos = activeEditor.document.positionAt(match.index);
            let endPos = activeEditor.document.positionAt(match.index + match[0].length);
            let range = new vscode.Range(startPos, endPos);
            this.edit.delete(uri, range);
            let n = activeEditor.document.getText(range);
            console.log("multiline comment");
            console.log(range);
            console.log(n);
        }
    }
    setDelimiter(languageCode) {
        this.supportedLanguage = true;
        this.delimiters = [];
        this.removeRanges = [];
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
                this.delimiters.push("//");
                this.removeRanges.push(true);
                this.multilineComments = this.config;
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
                this.delimiters.push("#");
                this.removeRanges.push(true);
                break;
            case "haskell":
            case "plsql":
            case "sql":
            case "lua":
                this.delimiters.push("--");
                this.removeRanges.push(true);
                break;
            case "latex":
                this.delimiters.push("%");
                this.removeRanges.push(true);
                break;
            default:
                this.supportedLanguage = false;
                break;
        }
        return this.supportedLanguage;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map