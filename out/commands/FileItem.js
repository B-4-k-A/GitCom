"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCreator = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
class FileCreator {
    createFile(fileUri) {
        let workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders === undefined) {
            console.log("folder undefined");
        }
        let gitcomPath = workspaceFolders[0].uri.fsPath + "/.gitcom";
        mkdirp.sync(gitcomPath);
        let filePath = gitcomPath + "/" + path.basename(fileUri.fsPath);
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            fs.writeFileSync(filePath, '');
            return vscode.Uri.file(filePath);
        }
        else {
            console.log("File already exists");
        }
    }
}
exports.FileCreator = FileCreator;
//# sourceMappingURL=FileItem.js.map