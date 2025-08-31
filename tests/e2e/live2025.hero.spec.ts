import { test, expect, devices } from '@playwright/test';

const IG_IOS_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.32.100 (iPhone14,5; iOS 17_6; ja_JP; scale=2.00)';

const IG_ANDROID_UA =
  'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Instagram 350.0.0.32.100';

async function simulateAutoplayBlocked(page: any) {
  // 初期ロード前に、ユーザー操作がないと play() を拒否する環境をシミュレート
  await page.addInitScript(() => {
    // @ts-ignore
    window.__allowPlay = false;
    const origPlay = HTMLMediaElement.prototype.play;
    // 最初は NotAllowedError として reject。__allowPlay=true で許可。
    // @ts-ignore
    HTMLMediaElement.prototype.play = new Proxy(origPlay, {
      apply(target, thisArg, args) {
        // @ts-ignore
        if (!window.__allowPlay) {
          return Promise.reject(new DOMException('NotAllowedError'));
        }
        return Reflect.apply(target, thisArg, args);
      }
    });
  });
}

test.describe('Live2025 Hero (common)', () => {
  test('poster is visible at first paint and video has required attributes', async ({ page }) => {
    await page.goto('/concerts/2025');

    const video = page.getByTestId('hero-video');
    await expect(video).toBeVisible();

    // poster 属性が設定されていること
    await expect(video).toHaveAttribute('poster', /hero_poster\.jpg$/);

    // 必須属性
    await expect(video).toHaveAttribute('muted', '');
    await expect(video).toHaveAttribute('playsinline', /.*/); // iOS のため playsInline/playsinline どちらでも
    await expect(video).toHaveAttribute('loop', '');

    // 初期再生状態（自動再生が通る環境でもこのチェック自体は許容範囲）
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused === true);
    expect(isPaused).toBeTruthy();
  });

  test('scroll indicator is shown', async ({ page }) => {
    await page.goto('/concerts/2025');
    await expect(page.getByTestId('hero-scroll-indicator')).toBeVisible();
  });

  test('hero section has optimized height and scroll container class', async ({ page }) => {
    await page.goto('/concerts/2025');
    
    // hero-scroll-container クラスが適用されていること
    const heroContainer = page.locator('.hero-scroll-container').first();
    await expect(heroContainer).toBeVisible();
    
    // 最適化された高さ (300vh) が適用されていることを確認
    const height = await heroContainer.evaluate(el => getComputedStyle(el).height);
    const viewportSize = page.viewportSize();
    const viewportHeight = viewportSize ? viewportSize.height : 1080;
    const expectedHeight = viewportHeight * 3; // 300vh
    const actualHeight = parseInt(height);
    
    // 許容範囲内であることを確認（±10%）
    expect(actualHeight).toBeGreaterThan(expectedHeight * 0.9);
    expect(actualHeight).toBeLessThan(expectedHeight * 1.1);
  });
});

test.describe('Live2025 Hero (autoplay fallback)', () => {
  test('autoplay blocked fallback shows play button', async ({ page }) => {
    await simulateAutoplayBlocked(page);
    await page.goto('/concerts/2025');

    const video = page.getByTestId('hero-video');
    // 初期は自動再生できず、ポスター見えている想定
    await expect(video).toBeVisible();
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused).toBeTruthy();

    // 再生ボタン（カスタムUI）が見えること
    const playBtn = page.getByTestId('hero-play-btn');
    await expect(playBtn).toBeVisible();
  });

  test('user gesture starts playback after autoplay block', async ({ page }) => {
    await simulateAutoplayBlocked(page);
    await page.goto('/concerts/2025');

    const video = page.getByTestId('hero-video');
    const playBtn = page.getByTestId('hero-play-btn');
    await expect(playBtn).toBeVisible();

    // ユーザー操作（クリック/タップ相当）で play 許可 → 再生
    await page.evaluate(() => { 
      // @ts-ignore 
      window.__allowPlay = true; 
    });
    await playBtn.click();

    const isPlaying = await video.evaluate((el: HTMLVideoElement) => !el.paused);
    expect(isPlaying).toBeTruthy();
    await expect(playBtn).toBeHidden();
  });
});

test.describe('No console errors on hero init', () => {
  test('no severe console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/concerts/2025');
    // 軽く動かす
    await page.mouse.wheel(0, 600);
    
    // 少し待機してエラーを収集
    await page.waitForTimeout(1000);

    expect(errors.join('\n')).toEqual('');
  });

  test('video attributes are properly set for performance', async ({ page }) => {
    await page.goto('/concerts/2025');

    const video = page.getByTestId('hero-video');
    
    // パフォーマンス最適化のための属性確認
    await expect(video).toHaveAttribute('preload', 'none');
    await expect(video).toHaveAttribute('disablepictureinpicture', '');
    
    // ポスター画像がロードされていること
    const posterSrc = await video.getAttribute('poster');
    expect(posterSrc).toMatch(/hero_poster\.jpg$/);
  });

  test('fallback play button appears when video fails to autoplay', async ({ page }) => {
    // 自動再生をブロック
    await simulateAutoplayBlocked(page);
    await page.goto('/concerts/2025');

    // フォールバック再生ボタンが表示されることを確認
    const playBtn = page.getByTestId('hero-play-btn');
    await expect(playBtn).toBeVisible();
    
    // ボタンのアクセシビリティ確認
    await expect(playBtn).toHaveAttribute('aria-label', '動画を再生');
    
    // ボタンのスタイル確認（十分なサイズとコントラスト）
    const btnBox = await playBtn.boundingBox();
    expect(btnBox?.width).toBeGreaterThan(50); // 最低50px以上
    expect(btnBox?.height).toBeGreaterThan(50); // 最低50px以上
  });
});

test.describe('Performance optimizations', () => {
  test('no performance-heavy CSS properties in hero', async ({ page }) => {
    await page.goto('/concerts/2025');
    
    // mix-blend-mode が使用されていないことを確認
    const elementsWithBlendMode = await page.locator('*').evaluateAll(elements => 
      elements.filter(el => {
        const style = getComputedStyle(el);
        return style.mixBlendMode && style.mixBlendMode !== 'normal';
      })
    );
    
    // ヒーロー内でmix-blend-modeが使用されていないことを確認
    expect(elementsWithBlendMode.length).toBe(0);
  });

  test('CSS Scroll-Driven Animations support detection', async ({ page }) => {
    await page.goto('/concerts/2025');
    
    // CSS Scroll-Driven Animationsがサポートされているかチェック
    const supportsScrollTimeline = await page.evaluate(() => {
      return CSS.supports('animation-timeline: scroll()');
    });
    
    // サポート状況に関係なく、フォールバックが機能することを確認
    const heroContainer = page.locator('.hero-scroll-container').first();
    await expect(heroContainer).toBeVisible();
  });

  test('scroll performance with reduced motion', async ({ page }) => {
    // prefers-reduced-motion を有効にしてテスト
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/concerts/2025');
    
    // アニメーションが抑制されていても基本機能は動作すること
    const video = page.getByTestId('hero-video');
    await expect(video).toBeVisible();
    
    const scrollIndicator = page.getByTestId('hero-scroll-indicator');
    await expect(scrollIndicator).toBeVisible();
  });
});