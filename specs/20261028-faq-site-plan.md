# 実装計画書: Bob 日本語FAQサイト（ロゴ・ブランドカラー・ダークテーマ追加）

## 基本情報

* 仕様書: 20261028-faq-site-spec.md
* 作成日時: 2026-10-28T10:24:21+09:00
* 更新日時: 2026-10-28T10:43:38+09:00
* 作成者: Bob
* ステータス: Approved

## Top-Level Overview

Bob 日本語FAQサイト（`site/`）に対し、Bobロゴ（リンク付き）の配置、Bobブランドカラー（IBM Blue `#0f62fe` およびパープル `#a56eff`）を取り入れたデザイン適用、ならびにダークテーマ切り替え機能（トグルボタン・OS連動・localStorage保存）を実装する。

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
| ------------ | ------------ | ---- |
| `site/bob.svg` | 新規 | ルートの `bob.svg` をコピーして配置 |
| `site/index.html` | 修正 | ヘッダーにロゴ・外部リンク（Bob公式）およびテーマ切り替えトグルボタンを追加 |
| `site/css/style.css` | 修正 | Bobカラー変数・グラデーション追加、ダークテーマ配色定義、ロゴ・トグルボタンスタイリング |
| `site/js/app.js` | 修正 | テーマ初期判定、トグル切り替え、localStorage保存、ARIA属性更新処理の追加 |
| `specs/20261028-faq-site-spec.md` | 修正 | 仕様書の更新（Approved） |
| `specs/20261028-faq-site-plan.md` | 修正 | 本書（Approved） |

## Sub-Tasks

### Sub-Task 1: ロゴ画像の配置とHTMLヘッダー構造の更新
- **Intent**: サイトヘッダー左上にBobロゴ画像を表示し、クリック時に新しいタブで公式製品ページを開くリンク構造と、テーマ切り替えボタンのマークアップを追加する。
- **Expected Outcomes**:
  - `site/bob.svg` が配置される。
  - `site/index.html` のヘッダー内に、ロゴ画像と外部リンク（`https://www.ibm.com/products/bob`、`target="_blank"`、`rel="noopener noreferrer"`）が追加される。
  - ヘッダー右上にテーマ切り替えボタン（`id="theme-toggle"`）が配置される。
- **Todo List**:
  1. `bob.svg` を `site/bob.svg` にコピー。
  2. `site/index.html` の `<header class="site-header">` 内部を更新し、Flexコンテナ内に「ロゴ＋タイトル部」と「テーマ切り替えボタン」を配置。
- **Relevant Context**: `site/index.html`, `bob.svg`
- **Status**: `[x] done`

### Sub-Task 2: ブランドカラーパレットとダークテーマCSSの定義・スタイリング
- **Intent**: BobのSVGパレット（ブルー `#0f62fe`、パープル `#a56eff`）をアクセントに取り入れ、ダークテーマ用のCSS変数と各UI要素のスタイルを実装する。
- **Expected Outcomes**:
  - ライトテーマおよびダークテーマ（`[data-theme="dark"]`）のCSS変数が定義される。
  - ヘッダー上部または下部にBobブランドのグラデーションバーが表示される。
  - ロゴ画像、タイトルのレイアウト、テーマ切り替えボタンのスタイルが整う。
  - ダークテーマ時に背景色、サーフェス、文字色、枠線、入力欄、アコーディオンが適切に高コントラストで表示される。
- **Todo List**:
  1. `site/css/style.css` の `:root` にBobカラー（`--accent`, `--accent-purple`, `--accent-gradient` 等）を整備。
  2. `:root[data-theme="dark"]` （および `@media (prefers-color-scheme: dark)` フォールバック）の配色を定義。
  3. ヘッダーのFlexレイアウト（ロゴ、タイトル、トグルボタンの配置）、ロゴ画像サイズ（40px）、トグルボタンの装飾を追加。
  4. 検索ボックス、カテゴリボタン、FAQカード、フッター等のダークテーマ適用確認と調整。
- **Relevant Context**: `site/css/style.css`, `bob.svg`
- **Status**: `[x] done`

### Sub-Task 3: テーマ切り替えロジックと状態保持（JavaScript）の実装
- **Intent**: ユーザーの操作でテーマを切り替え、OS設定の初期反映および `localStorage` への保存・読み込みを安全に行う。
- **Expected Outcomes**:
  - テーマ切り替えボタン押下で `data-theme` が `"dark"` / `"light"` に切り替わり、ボタンのテキスト/アイコンおよび `aria-label`/`aria-pressed` が更新される。
  - `localStorage` に保存され、ページ再読み込み時も選択テーマが維持される。
  - `localStorage` が無効/利用制限のある環境でもエラー落ちしない（`try...catch`）。
- **Todo List**:
  1. `site/js/app.js` にテーマ管理機能（`initTheme()`, `setTheme()`, `toggleTheme()`）を実装。
  2. トグルボタンのクリックイベントリスナーを登録。
  3. `DOMContentLoaded` 時に保存テーマまたはOS設定を適用。
- **Relevant Context**: `site/js/app.js`
- **Status**: `[x] done`

### Sub-Task 4: 動作検証と完了確認
- **Intent**: 改修後のサイトが仕様通りの挙動を示し、既存機能にデグレがないかを検証する。
- **Expected Outcomes**:
  - ロゴリンク、テーマ切り替え、配色、リロード時の保持、検索・絞り込み・アコーディオン開閉のすべてが正常に動作することを確認。
- **Todo List**:
  1. 静的コードチェック（`innerHTML` の不使用、構文エラーチェック）。
  2. 手動確認項目の実施（ロゴリンク遷移、テーマ切り替え、各FAQ操作、レスポンシブ表示）。
  3. 仕様書・計画書のステータスを `Approved` に更新。
- **Relevant Context**: `site/index.html`, `site/css/style.css`, `site/js/app.js`, `specs/20261028-faq-site-spec.md`
- **Status**: `[x] done`

## テスト・検証計画

1. **構文確認**: JavaScriptファイルの構文チェック（エラーがないこと）。
2. **静的チェック**: `innerHTML` や不要な外部通信（CDNスクリプトなど）が含まれていないことを確認。
3. **ブラウザ手動確認**:
   - ヘッダー左上のBobロゴをクリックし、別タブで `https://www.ibm.com/products/bob` が開くこと。
   - テーマ切り替えボタンでライト ⇔ ダークがスムーズに切り替わり、文字やUIの視認性が保たれていること。
   - リロードしても選択されたテーマが維持されること。
   - FAQのキーワード検索、カテゴリ絞り込み、アコーディオン開閉がダークテーマ下でも正常に動作すること。
   - モバイル幅（幅400px前後）でヘッダー（ロゴ、タイトル、トグルボタン）が崩れず適切に表示されること。

## 移行・ロールバック

- 静的ファイルの追加・修正のみのため、Gitコミット単位で容易にロールバック可能。
