import { useEffect, useState } from 'react';
import { X, Keyboard, Code2, Eye, EyeOff, Lightbulb, CheckCircle2, RotateCcw } from 'lucide-react';

const isMac = typeof navigator !== 'undefined' && navigator.platform.includes('Mac');
const mod = isMac ? '\u2318' : 'Ctrl';

const shortcuts = [
  { keys: '\u2190/\u2192', desc: '\u524d\u5f8c\u306e\u30da\u30fc\u30b8\u306b\u79fb\u52d5' },
  { keys: `Shift+\u2190/\u2192`, desc: '\u524d\u5f8c\u306e\u30bb\u30af\u30b7\u30e7\u30f3\u306b\u79fb\u52d5' },
  { keys: `${mod}+K`, desc: '\u691c\u7d22\u306b\u30d5\u30a9\u30fc\u30ab\u30b9' },
  { keys: `${mod}+Shift+D`, desc: '\u30c0\u30fc\u30af/\u30e9\u30a4\u30c8\u30e2\u30fc\u30c9\u5207\u66ff' },
  { keys: `${mod}+,`, desc: '\u8a2d\u5b9a\u3092\u958b\u304f' },
  { keys: '?', desc: '\u3053\u306e\u30d8\u30eb\u30d7\u3092\u8868\u793a' },
  { keys: 'Home', desc: '\u30da\u30fc\u30b8\u30c8\u30c3\u30d7\u306b\u30b9\u30af\u30ed\u30fc\u30eb' },
];

export default function HelpModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    document.addEventListener('keydown', handler);
    document.addEventListener('open-help', handleOpen);
    document.addEventListener('close-help', handleClose);
    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('open-help', handleOpen);
      document.removeEventListener('close-help', handleClose);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-border bg-card/95 backdrop-blur-sm rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Keyboard size={20} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">ヘルプ</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* キーボードショートカット */}
          <section>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">キーボードショートカット</h3>
            <div className="space-y-1.5">
              {shortcuts.map((s) => (
                <div key={s.keys} className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-muted/50">
                  <span className="text-sm text-muted-foreground">{s.desc}</span>
                  <kbd className="px-2 py-1 rounded bg-muted border border-border text-xs font-mono text-foreground shrink-0 ml-4">
                    {s.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </section>

          {/* コーディングチャレンジ */}
          <section>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">コーディングチャレンジ</h3>
            <p className="text-sm text-muted-foreground mb-3">
              各ページのコーディングチャレンジでは、エディタにコードを入力してターミナル出力やMarkdownプレビューを確認できます。
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span className="text-muted-foreground">チェックで採点</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20">
                <Lightbulb size={14} className="text-amber-500 shrink-0" />
                <span className="text-muted-foreground">段階的にヒント表示</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <Eye size={14} className="text-blue-500 shrink-0" />
                <span className="text-muted-foreground">模範解答を表示</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <EyeOff size={14} className="text-blue-500 shrink-0" />
                <span className="text-muted-foreground">模範解答を非表示</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <Code2 size={14} className="text-blue-500 shrink-0" />
                <span className="text-muted-foreground">コード入力エリア</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <RotateCcw size={14} className="text-amber-500 shrink-0" />
                <span className="text-muted-foreground">初期状態にリセット</span>
              </div>
            </div>
            <div className="mt-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                プレビュー付きチャレンジでは、コードを変更するとターミナル出力またはMarkdownプレビューがリアルタイム更新されます。
              </p>
            </div>
          </section>
        </div>

        {/* フッター */}
        <div className="px-6 py-3 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">?</kbd> でこのヘルプを表示 / <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">Esc</kbd> で閉じる
          </p>
        </div>
      </div>
    </div>
  );
}
