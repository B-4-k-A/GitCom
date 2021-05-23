"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitComFS = void 0;
const vscode = require("vscode");
const fs = require("fs");
class GitComFS {
    constructor() {
        this.wsEditor = new vscode.WorkspaceEdit();
    }
    createDirectory() {
        if (this.isExists(this.gitcomUri)) {
            return this.gitcomUri;
        }
        let ws = vscode.workspace;
        let wsFolders = ws.workspaceFolders;
        if (wsFolders === undefined) {
            console.log("folder undefined");
        }
        let gitcomPath = wsFolders[0].uri.fsPath + "/.gitcom";
        let directoryUri = vscode.Uri.file(gitcomPath);
        ws.fs.createDirectory(directoryUri);
        this.gitcomUri = directoryUri;
        return this.gitcomUri;
    }
    getGitComUri() {
        return this.createDirectory();
    }
    isExists(fileUri) {
        if (fileUri === undefined) {
            return false;
        }
        return fs.existsSync(fileUri.fsPath);
    }
}
exports.GitComFS = GitComFS;
//# sourceMappingURL=GitComFS.js.map