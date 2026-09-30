# JSON Selection Converter

Convert selected text directly in the VS Code editor.

## Commands

- **Decode JSON String** parses a JSON value. If the result is another JSON string, it decodes that inner value too. For example, select `"{\"item\":1}"` to get `{"item":1}`.
- **Encode as JSON String** turns selected JSON or plain text into an escaped JSON string literal. For example, select `{"item":1}` to get `"{\"item\":1}"`.

Select text and use the editor context menu or Command Palette. Invalid JSON is left unchanged.

## 中文说明

在编辑器中选中文本后，可以通过右键菜单或命令面板解码 JSON 字符串、将 JSON 或普通文本编码为 JSON 字符串。当前扩展代码与图标由 Xuyilong 独立实现和绘制。
