# 春花園 BONSAI 美術館 WEBサイト プロジェクト記録

## プロジェクト概要
- **クライアント**：春花園 BONSAI 美術館（世界的盆栽家・小林國雄氏が創設）
- **目的**：年間3万人（8割が外国人）のインバウンド体験ツアー集客。美術館としての格・世界観を体現するサイト
- **公開URL**：https://shunkaen.genba.workers.dev
- **GitHub**：https://github.com/niwa-eiji/shunkaen（mainブランチ）

---

## 技術構成

| 項目 | 内容 |
|------|------|
| フロントエンド | HTML / CSS（バニラ）/ Vanilla JS |
| ホスティング | Cloudflare Workers（genba-standard アカウント）|
| デプロイ | GitHub mainブランチへpushで自動デプロイ（Cloudflare Workers連携）|
| フォント | EB Garamond（Google Fonts）・Noto Serif JP |
| アイコン | なし |

---

## デザイン方針

- **ベース**：白・オフホワイト（`#f7f5f2`）・墨色（`#1a1a1a`）・深緑（`#2d4a2d`）
- **スタイル**：京庭大宮スタイル。ミニマルセリフ体・余白多め・エディトリアル
- **アニメ**：スクロールフェードイン（`opacity + translateY`）、スケールアニメ

---

## サイト構成（セクション順）

1. **Hero**：全面画像・グラデーションオーバーレイ・右下縦型ナビ
2. **About**：春花園の紹介文
3. **Gallery**：マソンリーギャラリー
4. **Experience**：体験ツアー内容
5. **Access**：アクセス情報
6. **Footer**：コピーライト

---

## Gitの使い方

```bash
# 春花園フォルダで作業
cd "C:\Users\eeeni\OneDrive\デスクトップ\AI company\営業\春花園"

# 変更をpush（これでCloudflare Workersに自動デプロイ）
git add index.html
git commit -m "変更内容のメモ"
git push origin main
```

---

## これまでの主な作業履歴

| 日付 | 作業内容 |
|------|---------|
| 2026-04 | Cloudflare Workers移行（旧：niwa-914 → genba-standard アカウント）|
| 2026-04 | スクロールアニメーション・余白改善・エディトリアルマソンリーギャラリー追加 |
| 2026-04 | ヒーロー白オーバーレイ・hero-navスタイル崩れ修正 |
| 2026-04 | ヒーロー画像を屋内盆栽写真（木製台）に変更 |
| 2026-04 | 全サイト画像追加（パノラマ・ギャラリー・庭）|
| 2026-04 | 京庭大宮スタイルでフルリデザイン |

---

## 運用体制

| 作業 | 担当 |
|------|------|
| コード修正・機能追加 | niwa-eiji + Claude Code |
| Cloudflare管理 | niwa-eiji（genba-standard アカウント）|
| ドメイン更新（将来）| クライアント側 |

---

## クライアント情報

- 創設者：小林國雄氏（世界的盆栽家）
- 来館者：年間3万人・8割が外国人（インバウンド主体）
- お孫さん：永祥（えいしょう）さん

## 関連プロジェクト

- 予約〜請求管理システム（Googleスプレッドシート + GAS v8）→ `ナレッジ/` 参照
- サンクスカード企画・3ヶ月アクションプラン（提案済み）
