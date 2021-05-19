import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

export class FileItem {
    public createFile(current_folder : string | undefined, fileName: string) {
        // const folders = selection.substring(0, selection.lastIndexOf('/'));
        if(current_folder === undefined) {
            console.log("folder undefined");
        }
        mkdirp.sync(current_folder + "/.gitcom");
        
        const file_exists = fs.existsSync(current_folder + "/.gitcom/" + fileName);
        if(!file_exists){
            fs.writeFileSync(current_folder + "/.gitcom/" + fileName, '');
            return fileName + "Created";
        }else {
            return "File already exists";
        }
    }
    
    // public openFile() {
    //     const current_editor = vscode.window.activeTextEditor;
    //     if (!current_editor) {
    //         return;
    //     }
    //     const selection = current_editor.document.getText(current_editor.selection).trim();
    
    //     const current_file = current_editor.document.fileName;
    //     const current_folder = path.dirname(current_file);
    //     const myPath = path.resolve(current_folder,selection);
    //     vscode.workspace.openTextDocument(myPath).then(doc => {
    //         const column = vscode.window.visibleTextEditors.findIndex(x => (x.document === doc));
    //         vscode.window.showTextDocument(doc, {preview : false, viewColumn: column});
    //     });
    //     vscode.window.setStatusBarMessage("Opened " + selection, 1000);
    // }
}