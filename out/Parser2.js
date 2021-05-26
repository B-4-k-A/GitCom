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
exports.Parser2 = void 0;
const vscode = require("vscode");
class Parser2 {
    constructor() {
        this.multilineComment = false;
        this.supportedLanguage = true;
    }
    removeComments(fileUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let languageId = yield vscode.workspace.openTextDocument(fileUri).then((doc) => __awaiter(this, void 0, void 0, function* () {
                return doc.languageId;
            }));
            let supported = this.setDelimiter(languageId);
            if (!supported) {
                vscode.window.showWarningMessage("Unsupported file");
                return;
            }
            let editor = new vscode.WorkspaceEdit();
            let singleLineCommData = yield this.removeSingleLineCom(fileUri, editor);
            let multiLineCommData = yield this.removeMultiLineCom(fileUri, editor);
            vscode.workspace.applyEdit(editor);
            console.log(singleLineCommData[0]);
            console.log(multiLineCommData[0]);
        });
    }
    removeSingleLineCom(fileUri, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            let deletedComm = [];
            let deletedCommStartPos = [];
            let deletedCommEndPos = [];
            let doc = yield this.uriToTextDocument(fileUri);
            let regex = RegExp(this.delimiter + "~.+");
            let match;
            for (var l = 0; l < doc.lineCount; l++) {
                let line = doc.lineAt(l);
                match = regex.exec(line.text);
                if (match === null) {
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
        });
    }
    removeMultiLineCom(fileUri, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.multilineComment) {
                return;
            }
            let deletedComm = [];
            let deletedCommStartPos = [];
            let deletedCommEndPos = [];
            let doc = yield this.uriToTextDocument(fileUri);
            let text = doc.getText();
            let regEx = /(^|[ \t])(\/\*~[^*])+([\s\S]*?)(\*\/)/gm;
            let match;
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
        });
    }
    uriToTextDocument(fileUri) {
        return __awaiter(this, void 0, void 0, function* () {
            return vscode.workspace.openTextDocument(fileUri).then((doc) => {
                return doc;
            });
        });
    }
    setDelimiter(languageCode) {
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
exports.Parser2 = Parser2;
//# sourceMappingURL=Parser2.js.map