import { test, expect } from "@playwright/test";

const pagesWithEditor = [
  "/environment/git",
  "/github/setup",
  "/github/first-repo",
  "/github/markdown",
  "/markdown-prompt/prompt-engineering",
  "/workflow/commit",
  "/workflow/push-pull",
  "/workflow/history",
  "/workflow/branch",
  "/react/modify",
  // WSL2 ページは selectedOS === 'windows' 時のみ表示
  // "/advanced/wsl2",
  // "/advanced/wsl2-ssh",
  "/advanced/github-cli",
  "/advanced/linux-basics",
  "/advanced/vscode",
  "/advanced/integration",
  "/ai-agent/claude-code-setup",
  "/ai-agent/claude-code-basics",
  "/ai-agent/cursor-cline",
  "/ai-agent/sub-tools",
  "/environment/nodejs",
];

test.describe("CodingChallenge エディター存在確認", () => {
  for (const path of pagesWithEditor) {
    test(`${path} にエディターが存在する`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      // ページ最下部にエディターがある場合があるのでスクロール
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const textarea = page.locator("textarea").first();
      await expect(textarea).toBeVisible({ timeout: 10000 });
    });
  }
});

test.describe("Git シミュレーター動作確認", () => {
  test("ターミナルプレビューにコマンド結果が表示される", async ({ page }) => {
    await page.goto("/workflow/commit", { waitUntil: "networkidle" });
    const textarea = page.locator("textarea").first();
    await expect(textarea).toBeVisible({ timeout: 10000 });

    // エディターをクリアして git コマンドを入力
    await textarea.fill("git init\ntouch index.html\ngit add .\ngit status");
    // プレビュー更新を待つ (400ms debounce)
    await page.waitForTimeout(800);

    // プレビュー iframe が存在
    const iframe = page.locator('iframe[title*="プレビュー"]');
    await expect(iframe).toBeVisible({ timeout: 5000 });

    // iframe 内のコンテンツを確認
    const frame = iframe.contentFrame();
    if (frame) {
      // "Initialized" が表示されている（git init の出力）
      await expect(frame.locator("text=Initialized")).toBeVisible({ timeout: 5000 });
      // "index.html" が表示されている（git status の出力）
      await expect(frame.locator("text=index.html")).toBeVisible({ timeout: 3000 });
    }
  });

  test("git commit の結果が表示される", async ({ page }) => {
    await page.goto("/workflow/commit", { waitUntil: "networkidle" });
    const textarea = page.locator("textarea").first();
    await expect(textarea).toBeVisible({ timeout: 10000 });

    await textarea.fill(
      'git init\ntouch README.md\ngit add .\ngit commit -m "初回コミット"\ngit log --oneline'
    );
    await page.waitForTimeout(800);

    const iframe = page.locator('iframe[title*="プレビュー"]');
    const frame = iframe.contentFrame();
    if (frame) {
      // コミットメッセージが表示される
      await expect(frame.locator("text=初回コミット")).toBeVisible({ timeout: 5000 });
    }
  });

  test("git branch の結果が表示される", async ({ page }) => {
    await page.goto("/workflow/branch", { waitUntil: "networkidle" });
    const textarea = page.locator("textarea").first();
    await expect(textarea).toBeVisible({ timeout: 10000 });

    await textarea.fill(
      'git init\ntouch file.txt\ngit add .\ngit commit -m "init"\ngit branch feature\ngit branch'
    );
    await page.waitForTimeout(800);

    const iframe = page.locator('iframe[title*="プレビュー"]');
    const frame = iframe.contentFrame();
    if (frame) {
      await expect(frame.locator("text=feature")).toBeVisible({ timeout: 5000 });
      await expect(frame.locator("text=main")).toBeVisible({ timeout: 3000 });
    }
  });
});

test.describe("Markdown プレビュー", () => {
  test("Markdown が HTML に変換されてプレビューされる", async ({ page }) => {
    await page.goto("/github/markdown", { waitUntil: "networkidle" });
    const textarea = page.locator("textarea").first();
    await expect(textarea).toBeVisible({ timeout: 10000 });

    await textarea.fill("# Hello World\n\nこれは **テスト** です。\n\n- 項目1\n- 項目2");
    await page.waitForTimeout(800);

    const iframe = page.locator('iframe[title*="プレビュー"]');
    const frame = iframe.contentFrame();
    if (frame) {
      await expect(frame.locator("h1")).toBeVisible({ timeout: 5000 });
      await expect(frame.locator("strong")).toBeVisible({ timeout: 3000 });
    }
  });
});

test.describe("エディター操作", () => {
  test("チェックボタンが機能する", async ({ page }) => {
    await page.goto("/workflow/commit", { waitUntil: "networkidle" });
    const checkButton = page.locator("button", { hasText: "チェック" });
    await expect(checkButton).toBeVisible({ timeout: 10000 });
    await checkButton.click();
    await page.waitForTimeout(500);
    const feedback = page.locator("text=正解").or(page.locator("text=もう少し"));
    await expect(feedback).toBeVisible({ timeout: 3000 });
  });

  test("リセットボタンが機能する", async ({ page }) => {
    await page.goto("/workflow/commit", { waitUntil: "networkidle" });
    const textarea = page.locator("textarea").first();
    await expect(textarea).toBeVisible({ timeout: 10000 });
    const initialValue = await textarea.inputValue();

    // テキストを変更
    await textarea.fill("changed content");
    expect(await textarea.inputValue()).toBe("changed content");

    // リセット
    const resetButton = page.locator("button", { hasText: "リセット" });
    await resetButton.click();
    await page.waitForTimeout(300);
    expect(await textarea.inputValue()).toBe(initialValue);
  });
});

test.describe("検索 + アンカースクロール", () => {
  test("キーワード検索で結果が表示される", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const searchInput = page.locator('input[placeholder*="検索"]');
    await searchInput.fill("コミット");
    await page.waitForTimeout(300);
    await expect(page.locator("text=検索結果")).toBeVisible();
  });

  test("検索結果にアンカーリンク付きサブアイテムが表示される", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const searchInput = page.locator('input[placeholder*="検索"]');
    await searchInput.fill("ブランチ");
    await page.waitForTimeout(300);
    const anchorLinks = page.locator("nav a[href*='#']");
    expect(await anchorLinks.count()).toBeGreaterThan(0);
  });

  test("アンカーリンクをクリックするとページ遷移する", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const searchInput = page.locator('input[placeholder*="検索"]');
    await searchInput.fill("ステージ");
    await page.waitForTimeout(300);
    const anchorLink = page.locator("nav a[href*='#']").first();
    if (await anchorLink.isVisible()) {
      await anchorLink.click();
      await page.waitForTimeout(500);
      // URL にハッシュが含まれる
      expect(page.url()).toContain("#");
    }
  });
});
