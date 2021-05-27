"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const unparser_1 = require("./commands/unparser");
const ParserController_1 = require("./commands/ParserController");
function activate(context) {
    let unparser = new unparser_1.Unparse();
    let pc = new ParserController_1.ParserController();
    let removeAllCommentsCommand = vscode.commands.registerCommand('gitcom.removeAllComments', () => {
        pc.hideComments();
    });
    let resetComments = vscode.commands.registerCommand('gitcom.resetComments', () => {
        unparser.resetComments();
    });
    context.subscriptions.push(removeAllCommentsCommand);
    context.subscriptions.push(resetComments);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map