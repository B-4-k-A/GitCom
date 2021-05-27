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
const GitComFS_1 = require("./GitComFS");
const parser_1 = require("./parser");
const rdir = require("recursive-readdir");
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
            return comments;
        });
    }
    hideComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const workspaceFolder = vscode.workspace.workspaceFolders;
            if (workspaceFolder === undefined) {
                vscode.window.showWarningMessage("Open project folder please");
            }
            const baseDir = workspaceFolder[0].uri.fsPath;
            let files = yield rdir(baseDir, ["*.json"]);
            const ws = vscode.workspace;
            const data = {};
            for (const file of files) {
                let comments = yield this.getCommentsInJson(vscode.Uri.file(file));
                if (comments.length === 0) {
                    continue;
                }
                data[file] = [];
                let a = data[file];
                for (const comm of comments) {
                    a.push({ com: comm.getComment(),
                        startLine: comm.getStart().line.toString(),
                        startCharacter: comm.getStart().character.toString(),
                        endLine: comm.getEnd().line.toString(),
                        endCharacter: comm.getEnd().character.toString() });
                }
                data[file] = a;
            }
            const gitCom = GitComFS_1.GitComFS.getGitComUri();
            const fileName = gitCom.fsPath + "/data.json";
            fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
        });
    }
}
exports.ParserController = ParserController;
//# sourceMappingURL=ParserController.js.map