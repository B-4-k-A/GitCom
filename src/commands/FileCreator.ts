// import * as vscode from 'vscode';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as mkdirp from 'mkdirp';

// export class FileCreator {
//     private wsEditor: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
//     public createFile(fileUri: vscode.Uri) {
//         let ws = vscode.workspace;
//         let gitcomPath = 
//         let filePath = gitcomPath + "/" + path.basename(fileUri.fsPath);
//         let newFileUri = vscode.Uri.file(filePath);
//         const fileExists = fs.existsSync(filePath);
//         if(!fileExists){
//             this.wsEditor.createFile(newFileUri);
//             // ws.applyEdit(this.wsEditor);
//             return newFileUri;
//         }else {
//             return newFileUri;
//         }
//     }
// }