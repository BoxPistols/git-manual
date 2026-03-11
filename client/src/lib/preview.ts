/**
 * Markdownをプレビュー用HTMLに変換する
 */
export function buildMarkdownPreviewHtml(markdown: string, isDark = false): string {
  const jsonContent = JSON.stringify(markdown);
  const bg = isDark ? '#1e1e2e' : '#fff';
  const fg = isDark ? '#cdd6f4' : '#24292f';
  const borderColor = isDark ? '#45475a' : '#d0d7de';
  const codeBg = isDark ? '#313244' : '#f6f8fa';
  const blockquoteColor = isDark ? '#a6adc8' : '#57606a';
  const linkColor = isDark ? '#89b4fa' : '#0969da';
  const thBg = isDark ? '#313244' : '#f6f8fa';
  const errorColor = isDark ? '#f38ba8' : '#cf222e';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    padding: 16px;
    color: ${fg};
    background: ${bg};
    font-size: 14px;
    line-height: 1.6;
  }
  h1 { font-size: 1.8em; border-bottom: 1px solid ${borderColor}; padding-bottom: 0.3em; margin-bottom: 16px; }
  h2 { font-size: 1.4em; border-bottom: 1px solid ${borderColor}; padding-bottom: 0.3em; margin: 24px 0 16px; }
  h3 { font-size: 1.15em; margin: 24px 0 16px; }
  p { margin: 0 0 16px; }
  ul, ol { padding-left: 2em; margin: 0 0 16px; }
  li { margin: 4px 0; }
  code { background: ${codeBg}; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
  pre { background: ${codeBg}; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 0 0 16px; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid ${borderColor}; padding: 0 16px; color: ${blockquoteColor}; margin: 0 0 16px; }
  a { color: ${linkColor}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  table { border-collapse: collapse; width: 100%; margin: 0 0 16px; }
  th, td { border: 1px solid ${borderColor}; padding: 6px 13px; }
  th { background: ${thBg}; font-weight: 600; }
  img { max-width: 100%; }
  hr { border: none; border-top: 1px solid ${borderColor}; margin: 24px 0; }
  strong { font-weight: 600; }
  em { font-style: italic; }
  #error { color: ${errorColor}; font-family: monospace; font-size: 13px; padding: 12px; }
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
export function buildTerminalPreviewHtml(output: string, isDark = true): string {
  const jsonOutput = JSON.stringify(output);
  const bg = isDark ? '#1e1e2e' : '#f8f9fa';
  const fg = isDark ? '#cdd6f4' : '#1e1e2e';
  const promptColor = isDark ? '#a6e3a1' : '#16a34a';
  const cmdColor = isDark ? '#89b4fa' : '#2563eb';
  const errorColor = isDark ? '#f38ba8' : '#dc2626';
  const dimColor = isDark ? '#6c7086' : '#9ca3af';
  const highlightColor = isDark ? '#f9e2af' : '#d97706';
  const greenColor = isDark ? '#a6e3a1' : '#16a34a';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    font-family: 'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;
    background: ${bg};
    color: ${fg};
    padding: 16px;
    font-size: 13px;
    line-height: 1.7;
  }
  .prompt { color: ${promptColor}; }
  .cmd { color: ${cmdColor}; }
  .error { color: ${errorColor}; }
  .dim { color: ${dimColor}; font-style: italic; }
  .highlight { color: ${highlightColor}; }
  .green { color: ${greenColor}; }
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
