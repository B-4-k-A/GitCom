"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writter = void 0;
const vscode = require("vscode");
const path = require("path");
class Writter {
    constructor() {
        this.wsEditor = new vscode.WorkspaceEdit();
        this.currPosition = new vscode.Position(0, 0);
    }
    writeToFile(fileUri, text) {
        const ws = vscode.workspace;
        let gitcom = ws.workspaceFolders[0].uri.fsPath + "/.gitcom";
        let comFileUri = vscode.Uri.file(gitcom + "/" + path.basename(fileUri.fsPath).split(".")[0].concat(".txt"));
        this.wsEditor.insert(comFileUri, this.currPosition, text);
        ws.applyEdit(this.wsEditor);
    }
}
exports.Writter = Writter;
//# sourceMappingURL=Writter.js.map