"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writter = void 0;
const vscode = require("vscode");
class Writter {
    constructor() {
        this.file = vscode.Uri.file("saver.txt");
        this.fedit = new vscode.WorkspaceEdit;
    }
    SaveComments() {
        this.fedit.createFile(this.file);
    }
}
exports.Writter = Writter;
//# sourceMappingURL=writter.js.map