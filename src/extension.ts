import * as vscode from 'vscode';

import { decodeJsonSelection, encodeJsonSelection } from './selectionConverter';

interface ConversionAction {
  command: string;
  convert: (source: string) => string;
  failureMessage: string;
}

const actions: ConversionAction[] = [
  {
    command: 'jsonSelectionConverter.decode',
    convert: decodeJsonSelection,
    failureMessage: 'The selection is not valid JSON.'
  },
  {
    command: 'jsonSelectionConverter.encode',
    convert: encodeJsonSelection,
    failureMessage: 'Could not encode the selection as a JSON string.'
  }
];

export function activate(context: vscode.ExtensionContext): void {
  actions.forEach(action => {
    const registration = vscode.commands.registerTextEditorCommand(
      action.command,
      (editor, edit) => {
        const selection = editor.selection;
        const source = editor.document.getText(selection);

        if (selection.isEmpty || source.trim().length === 0) {
          vscode.window.showInformationMessage('Select some text first.');
          return;
        }

        try {
          edit.replace(selection, action.convert(source));
        } catch (error) {
          vscode.window.showErrorMessage(action.failureMessage);
        }
      }
    );
    context.subscriptions.push(registration);
  });
}
