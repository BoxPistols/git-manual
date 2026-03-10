export const searchIndex: Record<string, string[]> = {
  '/': [
    '環境構築', 'GitHub', 'React', '学習フロー', 'キーボードショートカット',
    'なぜこれを学ぶのか', 'このガイドの特徴', 'AI', 'デザイナー', 'マーケター',
  ],
  '/environment/prerequisites': [
    '前提知識', 'Git とは何か', 'GitHub とは何か', 'ターミナルの基本',
    '必要なツール一覧', 'バージョン管理', 'リポジトリ', 'コマンドライン',
  ],
  '/environment/cursor': [
    'Cursor インストール', 'Cursor とは', 'インストール手順', 'インストール確認',
    'エディタ', 'AI コーディング', 'VSCode',
  ],
  '/environment/git': [
    'Git インストール', 'Git をインストールする理由', 'インストール手順',
    'トラブルシューティング', 'Homebrew', 'バージョン確認',
  ],
  '/environment/nodejs': [
    'Node.js インストール', 'Node.js とは', 'npm について', 'インストール手順',
    'パッケージマネージャ', 'JavaScript', 'ランタイム',
  ],
  '/github/account': [
    'GitHub アカウント作成', 'GitHub アカウントが必要な理由', 'アカウント作成手順',
    'サインアップ', 'メールアドレス', 'ユーザー名',
  ],
  '/github/setup': [
    'Git ローカル設定', 'Git ユーザー情報を設定', 'SSH キーを生成・登録',
    'トラブルシューティング', 'git config', 'user.name', 'user.email', 'SSH',
  ],
  '/github/first-repo': [
    '最初のリポジトリ作成', 'リポジトリとは', 'GitHub 上でリポジトリを作成',
    'リポジトリをローカルにクローン', 'リポジトリの構造', 'GitHub Pages',
    'git clone', 'README',
  ],
  '/github/markdown': [
    'Markdown 入門', 'なぜ Markdown を覚えるべきなのか', 'Markdown が使われている場所',
    '基本の書き方', 'よく使う応用記法', 'プラットフォームごとの対応状況',
    '実践：README.md を書いてみよう', 'Markdown 早見表',
    '見出し', 'リスト', 'リンク', 'コードブロック', 'テーブル', 'チェックボックス',
    '太字', '斜体', '引用', '水平線', 'GFM',
  ],
  '/markdown-prompt/prompt-engineering': [
    'プロンプトエンジニアリング入門', 'なぜ構造化された指示が効くのか',
    'プロンプトの基本構造', 'Before / After：GitHub 関連の例', '実践的なコツ',
    'ChatGPT', 'Claude', 'AI', 'プロンプト', '構造化',
  ],
  '/workflow/commit': [
    'ファイル作成と Commit', 'Commit とは', 'ファイルを作成',
    'Git ワークフロー：add → commit → push',
    'git add', 'git commit', 'ステージング', 'コミットメッセージ', 'セーブポイント',
  ],
  '/workflow/push-pull': [
    'Push と Pull', 'ローカルとリモートの概念',
    'Push：ローカルの変更を GitHub にアップロード',
    'Pull：GitHub の最新をローカルに取得',
    'Push と Pull のワークフロー',
    'git push', 'git pull', 'origin', 'リモート',
  ],
  '/workflow/history': [
    '差分・履歴確認', '差分・履歴を確認する理由',
    'git log：変更履歴を確認', 'git diff：変更内容を確認',
    'GitHub Web UI で確認', 'セルフレビューの重要性',
    'git log', 'git diff', '差分', '履歴', 'コミット履歴',
  ],
  '/workflow/branch': [
    'ブランチの基本', 'ブランチとは', 'ブランチを作成・切り替え',
    'ブランチで変更を加える', 'ブランチをマージ',
    'git branch', 'git checkout', 'git switch', 'git merge',
    'feature', 'main', '並行開発', 'マージ',
  ],
  '/react/setup': [
    'React 開発環境セットアップ', 'React とは', 'React プロジェクトを作成',
    'React プロジェクトの構造', '開発サーバーを起動',
    'npm create', 'Vite', 'コンポーネント', 'JSX',
  ],
  '/react/modify': [
    'デザイン変更と Git 管理', 'このセクションの目的',
    'App.js を編集してデザイン変更', 'Git でバージョン管理', '学習成果',
    'CSS', 'スタイル', 'コンポーネント編集',
  ],
  '/advanced/wsl2': [
    'WSL2 導入', 'WSL2 とは', '前提条件', 'インストール手順',
    'トラブルシューティング', 'Windows', 'Linux', 'Ubuntu',
  ],
  '/advanced/wsl2-ssh': [
    'WSL2 での SSH キー接続', 'SSH キーの確認', 'SSH キーの生成',
    'GitHub に公開キーを登録', 'SSH 接続のテスト', 'Git の SSH 設定確認',
    'リポジトリをクローン', 'ssh-keygen', 'id_ed25519',
  ],
  '/advanced/github-cli': [
    'GitHub CLI 導入', 'GitHub CLI のインストール', 'GitHub CLI で認証',
    'GitHub CLI の基本コマンド', '実践例：GitHub CLI でのワークフロー',
    '便利なエイリアス設定', 'gh', 'gh auth', 'gh repo', 'gh pr',
  ],
  '/advanced/linux-basics': [
    'Linux/Ubuntu 基礎', 'ターミナルの基本', 'よく使うコマンド',
    'ファイルシステムの理解', 'ユーザーと権限', '実践練習',
    'ls', 'cd', 'mkdir', 'rm', 'chmod', 'sudo',
  ],
  '/advanced/vscode': [
    'VSCode 導入', 'VSCode とは', 'インストール手順',
    'おすすめの拡張機能', 'ターミナル統合',
    'WSL2 との統合（Windows ユーザー向け）',
    'Visual Studio Code', '拡張機能', 'Remote WSL',
  ],
  '/advanced/integration': [
    '開発環境の統合確認', 'インストール確認', '初めてのプロジェクト作成',
    '実践的な開発フロー', 'Cursor vs VSCode - 使い分け',
    '統合テスト', '環境確認',
  ],
  '/ai-agent/overview': [
    'AI コーディング環境の全体像', 'AI コーディングツールって何？',
    'このセクションのゴール', 'ツールは3タイプある',
    'GitHub Copilot', 'Claude Code', 'Cursor', 'Cline',
  ],
  '/ai-agent/claude-code-setup': [
    'Claude Code 導入', 'Claude Code とは？', 'このページのまとめ',
    'Anthropic', 'API キー', 'インストール', 'npm',
  ],
  '/ai-agent/claude-code-basics': [
    'Claude Code 基本操作', 'このページのゴール', '実践チャレンジ', 'このページのまとめ',
    'リポジトリと接続', 'fetch / pull', '画面で確認',
    'git status', 'git log', '開発サーバー', 'CLAUDE.md',
  ],
  '/ai-agent/cursor-cline': [
    'Cursor + Cline 導入', 'Cursor とは？', 'Cline とは？',
    'Cursor と Cline、どっちを使う？', 'このページのまとめ',
    'AI エディタ', 'VSCode 拡張',
  ],
  '/ai-agent/sub-tools': [
    '予備ツール', 'Gemini CLI', 'Warp', 'Google Antigravity',
    'このページのまとめ', 'ターミナル', 'AI ツール',
  ],
};
