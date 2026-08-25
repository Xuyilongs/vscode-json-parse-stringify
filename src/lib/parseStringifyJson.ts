import * as vscode from 'vscode';

export function replaceSelectedWithParsed() {
  const selected = getSelectedText();

  if (!selected || !selected.trim()) {
    vscode.window.showInformationMessage('Select stringified JSON first');
    return;
  }

  try {
    const parsed = parseJsonString(selected);
    replaceSelectedText(JSON.stringify(parsed));
  } catch (ex) {
    vscode.window.showInformationMessage('Failed to parse input string');
  }
}

export function replaceSelectedWithStringified() {
  const selected = getSelectedText();

  if (!selected || !selected.trim()) {
    vscode.window.showInformationMessage('Select a javascript object or JSON');
    return;
  }
  try {
    replaceSelectedText(stringifyJsonString(selected));
  } catch (ex) {
    vscode.window.showInformationMessage('Failed to stringify input string');
  }
}

export function parseJsonString(value: string) {
  const normalized = unwrapSingleQuotedJson(value.trim());
  const parsed = JSON.parse(normalized);

  if (typeof parsed === 'string') {
    try {
      return JSON.parse(parsed);
    } catch (ex) {
      return parsed;
    }
  }

  return parsed;
}

export function stringifyJsonString(value: string) {
  let obj;
  try {
    obj = JSON.parse(value);
  } catch (ex) {
    obj = value;
  }
  return JSON.stringify(JSON.stringify(obj));
}

function unwrapSingleQuotedJson(value: string) {
  if (value.length >= 2 && value[0] === "'" && value[value.length - 1] === "'") {
    return value.slice(1, -1);
  }
  return value;
}

function getSelectedText(editor = vscode.window.activeTextEditor) {
  if (!editor) {
    return;
  }
  const selectedText = editor.document.getText(editor.selection);
  return selectedText;
}

function replaceSelectedText(
  value: string,
  editor = vscode.window.activeTextEditor
) {
  if (!editor) {
    return;
  }
  editor.edit(builder => {
    builder.replace(editor.selection, value);
  });
}
