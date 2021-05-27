"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const ParserController_1 = require("./commands/ParserController");
const UnparseController_1 = require("./commands/UnparseController");
function activate(context) {
    let up = new UnparseController_1.UnparseController();
    let pc = new ParserController_1.ParserController();
    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        pc.hideComments();
    });
    let resetComments = vscode.commands.registerCommand('gitcom.resetComments', () => {
        up.insertCommments();
    });
    context.subscriptions.push(removeAllCommentsCommand);
    context.subscriptions.push(resetComments);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map