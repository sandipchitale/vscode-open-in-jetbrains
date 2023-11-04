import * as vscode from 'vscode';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-open-in-jetbrains.open-selected-file',
            openSelectedFile));
    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand('vscode-open-in-jetbrains.open-edited-file',
        openEditedFile));
    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-open-in-jetbrains.open-workspace-folder',
            openWorkspaceFolder));
}

function openSelectedFile(uri: vscode.Uri) {
    child_process.exec(`idea nosplash "${uri.fsPath}"`);
}

function openEditedFile(textEditor: vscode.TextEditor , textEditorEdit: vscode.TextEditorEdit) {
    if (textEditor && textEditor.document && textEditor.document.uri.scheme === 'file') {
        const line = textEditor.selection.active.line;
        const column = textEditor.selection.active.character;
        child_process.exec(`idea nosplash --line ${line + 1} --column ${column} "${textEditor.document.uri.fsPath}"`);
    }
}

function openWorkspaceFolder() {
    const workspaceFolder = vscode.workspace.workspaceFolders;
    if (workspaceFolder) {
        child_process.exec(`idea nosplash "${workspaceFolder[0].uri.fsPath}"`);
    }
}

export function deactivate() {}
