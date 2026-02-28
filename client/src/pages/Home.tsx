import { ArrowRight, CheckCircle2, Zap, Users, BookOpen, Keyboard, BrainCircuit, Rocket, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOS } from '@/contexts/OSContext';
import { modKey, ctrlKey } from '@/lib/keyLabels';

/**
 * ホームページ - ランディング
 */

export default function Home() {
  const { selectedOS } = useOS();
  const isMac = selectedOS === 'mac';

  const learningPath = [
    {
      number: 1,
      title: '環境準備',
      description: 'Cursor、Git、Node.js をインストール',
      duration: '30分',
      icon: '⚙️',
    },
    {
      number: 2,
      title: 'GitHub 基礎',
      description: 'アカウント作成と初期設定',
      duration: '20分',
      icon: '🔐',
    },
    {
      number: 3,
      title: 'Git ワークフロー',
      description: 'Commit、Push、Pull を実践',
      duration: '40分',
      icon: '🔄',
    },
    {
      number: 4,
      title: 'React 実践',
      description: 'コンポーネント作成と Git 管理',
      duration: '45分',
      icon: '⚛️',
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: '実践的な学習',
      description: '実際に手を動かしながら学べます',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '初心者向け',
      description: 'コーディング未経験者を想定した説明',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: '達成感',
      description: '各ステップで成功体験を得られます',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'わかりやすい',
      description: 'スクリーンショット付きの詳細ガイド',
    },
  ];

  const aiContextCards = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-violet-600" />,
      title: 'AI がコードを書く時代に',
      body: 'ChatGPT や Claude に「このボタンを青くして」と頼むだけで、コードが完成する時代になりました。でも、そのコードを**どこに保存して、どうやってチームで共有するか**はまだ人間の仕事です。',
    },
    {
      icon: <Rocket className="w-6 h-6 text-orange-500" />,
      title: 'デザイナー・ビジネスパーソンが GitHub を持つ意味',
      body: '「GitHub を使える」というだけで、エンジニアとの会話が変わります。AI ツールの多くは GitHub と連携しており、使いこなせる人とそうでない人の差は今後さらに広がっていきます。',
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: '世界標準のコラボレーション基盤',
      body: 'GitHub は世界中の 1 億人以上が使うプラットフォームです。オープンソースの AI ツール、デザインシステム、ライブラリのほぼすべてが GitHub 上にあります。読めるだけで情報収集力が格段に上がります。',
    },
  ];

  const shortcuts = [
    { keys: `${modKey(isMac)}+K`, description: 'ページ検索' },
    { keys: `${ctrlKey(isMac)}+↓`, description: '次のページへ移動' },
    { keys: `${ctrlKey(isMac)}+↑`, description: '前のページへ移動' },
    { keys: `Shift+${ctrlKey(isMac)}+↓`, description: '次のセクションへ移動' },
    { keys: `Shift+${ctrlKey(isMac)}+↑`, description: '前のセクションへ移動' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
            <span className="text-secondary font-medium text-sm">はじめての開発入門</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-foreground mb-6 leading-tight">
            GitHub & React
            <span className="block text-primary">環境構築</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            コーディング未経験でも、ステップバイステップで GitHub と React を習得できます。実践的な開発体験を通じて、自信を持って開発に参加できるようになります。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => window.location.href = '/environment/prerequisites'}
            >
              学習を始める
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* Learning Duration */}
          <div className="inline-block bg-card border border-border rounded-lg px-6 py-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">総学習時間：</span> 約 2 時間 45 分
            </p>
          </div>
        </div>
      </section>

      {/* AI Context Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-950/20 dark:to-indigo-950/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-700">
              <BrainCircuit className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-violet-700 dark:text-violet-300 font-medium text-sm">AI 時代の新しいスタンダード</span>
            </div>
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              なぜ今、これを学ぶのか？
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              「エンジニアじゃないから関係ない」は、もう通じない時代になっています。
              AI があらゆる職種の仕事を変えている今、その変化を使いこなす側に立てるかどうかが問われています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiContextCards.map((card, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-semibold text-foreground mb-3 text-base">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Real-world scenario */}
          <div className="mt-10 bg-card border border-border rounded-xl p-8">
            <h3 className="font-bold text-foreground mb-6 text-lg">こんなシーンで役立ちます</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0">🎨</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">デザイナーの場合</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Figma でデザインしたコンポーネントを AI に実装してもらい、GitHub でエンジニアにレビューしてもらう。「コードは書けないけど Git は使える」だけで、コラボレーションの質が変わる。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0">💼</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">企画・マーケターの場合</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    LP や社内ツールを AI に作らせて GitHub Pages で公開。エンジニアに頼まずに「とりあえず動くもの」を作れる人材は、どんな組織でも重宝される。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0">🚀</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">スタートアップ・副業の場合</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    アイデアを AI で素早くプロトタイプ化し、GitHub でバージョン管理しながら改善を重ねる。コードを書く速さより「使いこなす」力が価値になる時代。
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0">🤝</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">エンジニアとの協働</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    「このリポジトリをフォークして PR を送って」「main ブランチにマージして」といった会話が理解できるだけで、エンジニアチームとの距離が縮まる。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-poppins font-bold text-center text-foreground mb-12">学習フロー</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPath.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
              >
                {/* Connector Line */}
                {index % 2 === 0 && index < learningPath.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 w-6 h-0.5 bg-primary/30" />
                )}

                {/* Card */}
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  {/* Step Number */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-poppins font-bold text-lg">
                        {step.number}
                      </span>
                    </div>
                    <span className="text-3xl">{step.icon}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Duration Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 md:px-8 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-poppins font-bold text-center text-foreground mb-12">
            このガイドの特徴
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Keyboard className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-poppins font-bold text-foreground">キーボードショートカット</h2>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-6 py-3 font-semibold text-foreground">キー</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">動作</th>
                </tr>
              </thead>
              <tbody>
                {shortcuts.map((s, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-3">
                      <kbd className="inline-flex items-center px-2 py-1 rounded bg-muted border border-border text-xs font-mono font-medium text-foreground">
                        {s.keys}
                      </kbd>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
            準備はいいですか？
          </h2>
          <p className="text-muted-foreground mb-8">
            AI が当たり前になった今、「使いこなす側」になる最初の一歩を踏み出しましょう。
          </p>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => window.location.href = '/environment/prerequisites'}
          >
            今すぐ始める
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
}
