"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileItem = void 0;
const fs = require("fs");
const mkdirp = require("mkdirp");
class FileItem {
    createFile(current_folder, fileName) {
        // const folders = selection.substring(0, selection.lastIndexOf('/'));
        if (current_folder === undefined) {
            console.log("folder undefined");
        }
        mkdirp.sync(current_folder + "/.gitcom");
        const file_exists = fs.existsSync(current_folder + "/.gitcom/" + fileName);
        if (!file_exists) {
            fs.writeFileSync(current_folder + "/.gitcom/" + fileName, '');
            return fileName + "Created";
        }
        else {
            return "File already exists";
        }
    }
}
exports.FileItem = FileItem;
//# sourceMappingURL=FileItem.js.map