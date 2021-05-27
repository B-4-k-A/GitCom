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
exports.ParserController = void 0;
const vscode = require("vscode");
const parser_1 = require("./parser");
const rdir = require("recursive-readdir");
const path = require("path");
const fs = require("fs");
class ParserController {
    constructor() {
        this.parser = new parser_1.Parser();
    }
    removeComments(fileUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let comments = yield this.parser.removeComments(fileUri);
            return comments;
        });
    }
    getCommentsInJson(fileUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let comments = yield this.removeComments(fileUri);
            if (comments.length === 0) {
                return [];
            }
            let anscom = [];
            for (const com of comments) {
                anscom.push([com.getComment(), com.getStart().line, com.getStart().character, com.getEnd().character]);
            }
            return anscom;
        });
    }
    hideComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const baseDir = vscode.workspace.workspaceFolders[0].uri.fsPath;
            let files = yield rdir(baseDir, ["*.json"]);
            const ws = vscode.workspace;
            const data = {};
            for (const file of files) {
                let s = yield this.getCommentsInJson(vscode.Uri.file(file));
                let i = 0;
                data[file] = [];
                let a = data[file];
                while (i < s.length) {
                    a.push({ co: s[i][0].toString(), line: s[i][1].toString(),
                        position: s[i][2].toString(), endposition: s[i][3].toString() });
                    i += 1;
                }
                data[file] = a;
            }
            const filename = baseDir + path.normalize("/.gitcom/data.json");
            fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        });
    }
}
exports.ParserController = ParserController;
//# sourceMappingURL=ParserController.js.map