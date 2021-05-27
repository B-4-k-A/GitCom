"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnparseController = void 0;
const vscode = require("vscode");
const rdir = require("recursive-readdir");
const unparser_1 = require("./unparser");
class UnparseController {
    constructor() {
        this.unparser = new unparser_1.Unparse();
    }
    insertCommments() {
        return __awaiter(this, void 0, void 0, function* () {
            const workspaceFolder = vscode.workspace.workspaceFolders;
            if (workspaceFolder === undefined) {
                vscode.window.showWarningMessage("Open project folder please");
            }
            const baseDir = workspaceFolder[0].uri.fsPath;
            let files = yield rdir(baseDir, ["*.json"]);
            const ws = vscode.workspace;
            let wsEditor = new vscode.WorkspaceEdit();
            for (const file of files) {
                let fileUri = vscode.Uri.file(file);
                this.unparser.resetComments(fileUri, wsEditor);
            }
            ws.applyEdit(wsEditor);
        });
    }
}
exports.UnparseController = UnparseController;
//# sourceMappingURL=UnparseController.js.map