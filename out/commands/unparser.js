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
exports.Unparse = void 0;
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const rdir = require("recursive-readdir");
class Unparse {
    constructor() {
        this.resetComments = (() => __awaiter(this, void 0, void 0, function* () {
            const baseDir = vscode.workspace.workspaceFolders[0].uri.fsPath;
            let files = yield rdir(baseDir);
            const ws = vscode.workspace;
            for (const file of files) {
                if (!file.endsWith('.json')) {
                    let a = this.Unpar(file);
                    let comFileUri = vscode.Uri.file(file);
                    let wsEditor = new vscode.WorkspaceEdit();
                    for (let i = 0; i < a.length; i++) {
                        let currPosition = new vscode.Position(a[i]['line'], a[i]['position']);
                        wsEditor.insert(comFileUri, currPosition, a[i]['comment'] + '\n');
                        ws.applyEdit(wsEditor);
                        wsEditor = new vscode.WorkspaceEdit();
                    }
                }
            }
            //ws.applyEdit(wsEditor);
        }));
    }
    Unpar(filepath) {
        const baseDir = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const filename = baseDir + path.normalize("/.gitcom/data.json");
        var json1 = JSON.parse(fs.readFileSync(filename, 'utf8').toString());
        var i = 0;
        let comres = [];
        //исключения нужны
        while (i < json1[filepath]['comments'].length) {
            comres.push(json1[filepath]['comments'][i]);
            i++;
        }
        return comres;
    }
}
exports.Unparse = Unparse;
//# sourceMappingURL=unparser.js.map