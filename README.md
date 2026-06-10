# 株式会社BeRevo コーポレートサイト

採用強化を目的とした、中途採用向けコーポレートサイト（1ページ完結型）。

## 完成済み機能

- ヘッダーナビゲーション（スクロール追従・ハンバーガーメニュー）
- ヒーローセクション（採用メッセージ）
- 採用バナー（全国募集訴求）
- **ABOUT US**（ユーザー指定文面で代表メッセージ3段構成）
- 全国展開エリアセクション（18都道府県タグ表示）
- **事業内容**（4事業：営業支援・人材採用支援広告・販売促進・コンサルティング）
- 働く環境（6つの特徴カード）
- 採用情報（事務職募集要項・勤務地エリア・選考フロー）
- FAQ（アコーディオン形式、5問）
- 応募フォーム（バリデーション・送信完了画面・APIへのデータ保存）
- フッター

## ファイル構成

```
index.html         メインページ（1ページ完結）
css/style.css      全スタイル
js/main.js         インタラクション・フォーム送信
README.md          本ドキュメント
```

## データ

| テーブル名     | 内容                         |
|------------|------------------------------|
| applications | 応募フォームの送信データを保存 |

## 会社情報

- **会社名**: 株式会社BeRevo
- **代表取締役**: 松本 志穂里
- **所在地**: 大阪府大阪市北区曽根崎新地1-7-6
- **事業内容**: 広告事業
- **採用職種**: 事務職（中途採用）

## 今後の推奨アップデート

- ロゴ画像の差し替え
- 会社・オフィス写真の追加
- 代表者写真の追加
- 具体的な給与・待遇の確認と反映
- お問い合わせフォームの送信先メールアドレス設定
- SEO用OGタグの追加
/* ===========================
   株式会社BeRevo - リニューアルスクリプト
   =========================== */

// ===========================
// ローディング画面
// ===========================
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  // バーアニメーション完了後（約2s）に非表示
  setTimeout(() => {
    loading.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2200);
});

// ローディング中はスクロール禁止
document.body.style.overflow = 'hidden';

// ===========================
// ヘッダースクロール
// ===========================
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ===========================
// ハンバーガーメニュー
// ===========================
const hamburger = document.getElementById('hamburger');
const globalNav = document.getElementById('global-nav');

hamburger.addEventListener('click', () => {
  const isOpen = globalNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

globalNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    globalNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ===========================
// スクロールアニメーション
// ===========================
const animTargets = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animTargets.forEach(el => scrollObserver.observe(el));

// ===========================
// マーキー（横スクロールテキスト）- マウスオーバーで一時停止
// ===========================
document.querySelectorAll('.marquee-track').forEach(track => {
  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
});

// ===========================
// カーソルに追従するスポットライト（ヒーロー）
// ===========================
const heroSection = document.getElementById('hero');
const spotlight = document.querySelector('.hero-spotlight');

if (heroSection && spotlight) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.transition = 'none';
    spotlight.style.left = x + 'px';
    spotlight.style.top = (y - 400) + 'px';
    spotlight.style.transform = 'translateX(-50%)';
  });
  heroSection.addEventListener('mouseleave', () => {
    spotlight.style.transition = 'all 1s ease';
    spotlight.style.left = '50%';
    spotlight.style.top = '-200px';
    spotlight.style.transform = 'translateX(-50%)';
  });
}

// ===========================
// ビジネスカード - ホバー番号ハイライト
// ===========================
document.querySelectorAll('.business-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.num').style.color = 'var(--gold-light)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.num').style.color = 'var(--gold)';
  });
});

// ===========================
// FAQ アコーディオン
// ===========================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===========================
// エリアタグ ホバーアクセント
// ===========================
document.querySelectorAll('.area-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.borderColor = 'var(--gold)';
    tag.style.color = 'var(--gold)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.borderColor = '';
    tag.style.color = '';
  });
});

// ===========================
// 応募フォーム送信
// ===========================
const applyForm   = document.getElementById('apply-form');
const formFields  = document.getElementById('form-fields');
const formSuccess = document.getElementById('form-success');

if (applyForm) {
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = applyForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';

    const data = {
      name:     document.getElementById('name').value,
      kana:     document.getElementById('kana').value,
      email:    document.getElementById('email').value,
      tel:      document.getElementById('tel').value,
      location: document.getElementById('location').value,
      message:  document.getElementById('message').value,
      submitted_at: new Date().toISOString()
    };

    try {
      await fetch('tables/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error('API save error:', err);
    }

    // フェードアウト → 成功画面
    formFields.style.opacity = '0';
    formFields.style.transform = 'translateY(10px)';
    formFields.style.transition = 'opacity 0.4s, transform 0.4s';
    setTimeout(() => {
      formFields.style.display = 'none';
      formSuccess.style.display = 'block';
      formSuccess.style.opacity = '0';
      setTimeout(() => { formSuccess.style.opacity = '1'; formSuccess.style.transition = 'opacity 0.5s'; }, 50);
    }, 400);

    applyForm.reset();
  });
}

// ===========================
// スムーズスクロール
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// セクションタイトル テキストスライン演出
// ===========================
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.backgroundSize = '100% 2px';
      titleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
  title.style.backgroundImage = 'linear-gradient(var(--gold), var(--gold))';
  title.style.backgroundRepeat = 'no-repeat';
  title.style.backgroundPosition = '0 100%';
  title.style.backgroundSize = '0 2px';
  title.style.transition = 'background-size 0.8s ease 0.3s';
  titleObserver.observe(title);
});
