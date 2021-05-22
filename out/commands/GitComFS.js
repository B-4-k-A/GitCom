"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitComFS = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
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
    createFile(fileUri) {
        if (fileUri === undefined) {
            return;
        }
        this.getGitComUri();
        const fileUriGC = vscode.Uri.file(this.parseGitComPath(fileUri.fsPath));
        const ws = vscode.workspace;
        if (this.isExists(fileUriGC)) {
            return fileUriGC;
        }
        this.wsEditor.createFile(fileUriGC);
        ws.applyEdit(this.wsEditor);
        this.wsEditor = new vscode.WorkspaceEdit();
        return fileUriGC;
    }
    parseGitComPath(filePath) {
        var _a;
        return ((_a = this.gitcomUri) === null || _a === void 0 ? void 0 : _a.fsPath) + "/" + path.basename(filePath).split(".")[0].concat(".txt");
    }
}
exports.GitComFS = GitComFS;
//# sourceMappingURL=GitComFS.js.map