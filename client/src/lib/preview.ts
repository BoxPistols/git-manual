/**
 * Markdownをプレビュー用HTMLに変換する
 */
export function buildMarkdownPreviewHtml(markdown: string): string {
  const jsonContent = JSON.stringify(markdown);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    padding: 16px;
    color: #24292f;
    background: #fff;
    font-size: 14px;
    line-height: 1.6;
  }
  h1 { font-size: 1.8em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; margin-bottom: 16px; }
  h2 { font-size: 1.4em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; margin: 24px 0 16px; }
  h3 { font-size: 1.15em; margin: 24px 0 16px; }
  p { margin: 0 0 16px; }
  ul, ol { padding-left: 2em; margin: 0 0 16px; }
  li { margin: 4px 0; }
  code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
  pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 0 0 16px; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid #d0d7de; padding: 0 16px; color: #57606a; margin: 0 0 16px; }
  a { color: #0969da; text-decoration: none; }
  a:hover { text-decoration: underline; }
  table { border-collapse: collapse; width: 100%; margin: 0 0 16px; }
  th, td { border: 1px solid #d0d7de; padding: 6px 13px; }
  th { background: #f6f8fa; font-weight: 600; }
  img { max-width: 100%; }
  hr { border: none; border-top: 1px solid #d0d7de; margin: 24px 0; }
  strong { font-weight: 600; }
  em { font-style: italic; }
  #error { color: #cf222e; font-family: monospace; font-size: 13px; padding: 12px; }
</style>
</head>
<body>
<div id="content"></div>
<script>
function parseMarkdown(md) {
  var html = md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>')
    .replace(/\`(.+?)\`/g, '<code>$1</code>')
    .replace(/^> (.*$)/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>')
    .replace(/^(?!<[hupblo]|<\\/|<li|<hr|$)(.*$)/gm, '<p>$1</p>')
    .replace(/<p><\\/p>/g, '');
  return html;
}
try {
  document.getElementById('content').innerHTML = parseMarkdown(${jsonContent});
} catch(e) {
  document.getElementById('content').innerHTML = '<div id="error">' + e.message + '</div>';
}
<\/script>
</body>
</html>`;
}

/**
 * ターミナル風のシミュレーター出力プレビューHTML
 * runCommands() の出力を受け取って表示する
 */
export function buildTerminalPreviewHtml(output: string): string {
  const jsonOutput = JSON.stringify(output);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;
    background: #1e1e2e;
    color: #cdd6f4;
    padding: 16px;
    font-size: 13px;
    line-height: 1.7;
  }
  .prompt { color: #a6e3a1; }
  .cmd { color: #89b4fa; }
  .error { color: #f38ba8; }
  .dim { color: #6c7086; font-style: italic; }
  .highlight { color: #f9e2af; }
  .green { color: #a6e3a1; }
</style>
</head>
<body>
<pre id="terminal"></pre>
<script>
var raw = ${jsonOutput};
var html = raw
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/\\x1b\\[32m(.*?)\\x1b\\[0m/g, '<span class="prompt">$1</span>')
  .replace(/\\x1b\\[90m(.*?)\\x1b\\[0m/g, '<span class="dim">$1</span>')
  .replace(/(fatal:.*)/g, '<span class="error">$1</span>')
  .replace(/(error:.*)/g, '<span class="error">$1</span>')
  .replace(/(\\$ )(git \\S+)/g, '$1<span class="cmd">$2</span>')
  .replace(/(\\$ )(ssh\\S*|npm|npx|node|brew|gh|claude|gemini|wsl|sudo|apt|chmod|mkdir|touch|echo|cat|ls|cd|pwd|rm|cp|mv|nano|code|cursor|source)/g, '$1<span class="cmd">$2</span>');
document.getElementById('terminal').innerHTML = html;
<\/script>
</body>
</html>`;
}
