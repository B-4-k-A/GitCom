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
const vscode = require("vscode");
const GitComFS_1 = require("./GitComFS");
class Unparse {
    constructor() {
        this.resetComments = ((fileUri, wsEditor) => __awaiter(this, void 0, void 0, function* () {
            let a = this.Unpar(fileUri);
            for (let i = 0; i < a.length; i++) {
                let linea = parseInt(a[i]['startLine']);
                if (i !== 0) {
                    linea -= a[i - 1]['com'].toString().split('\n').length - 1;
                }
                let currPosition = new vscode.Position(linea, parseInt(a[i]['startCharacter'].startCharacter));
                wsEditor.insert(fileUri, currPosition, a[i]['com']);
            }
        }));
    }
    Unpar(fileUri) {
        const gitcom = GitComFS_1.GitComFS.getGitComUri();
        const fileName = gitcom.fsPath + "/data.json";
        var data = JSON.parse(fs.readFileSync(fileName, 'utf8').toString());
        var i = 0;
        let comres = [];
        //исключения нужны
        while (i < data[fileUri.path].length) {
            comres.push(data[fileUri.path][i]);
            i++;
        }
        return comres;
    }
}
exports.Unparse = Unparse;
//# sourceMappingURL=unparser.js.map