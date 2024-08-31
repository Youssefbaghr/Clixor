import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('clixor.initProject', async () => {
    const projectName = await vscode.window.showInputBox({
      prompt: 'Enter the name of your new Clixor project',
    });

    if (projectName) {
      const terminal = vscode.window.createTerminal('Clixor');
      terminal.sendText(`clixor init ${projectName}`);
      terminal.show();

      vscode.window.showInformationMessage(`Initializing Clixor project: ${projectName}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
