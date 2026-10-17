# 実装計画書: FAQサイトへのBobロゴ・テーマカラー・ダークテーマの追加

## 基本情報

* 仕様書: 20261017-faq-branding-darktheme-spec.md
* 作成日時: 2026-10-17T18:11:32+0900
* 更新日時: 2026-10-17T18:12:10+0900
* 作成者:
* ステータス: Approved

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
|---------|---------|---------|
| `faq.html` | 修正 | CSS変数化とBobカラー適用、ダークテーマ用CSS、ヘッダーへのロゴ・切替ボタン追加、テーマ切替JavaScript追加 |

上記以外のファイルは変更しない（`bob.svg` は読み取りのみ）。

## 実装手順

1. `bob.svg` を data URI 化する
   * `execute_command` で `bob.svg` をURLエンコードまたはBase64化し、`<img src="data:image/svg+xml;base64,...">` として埋め込む文字列を生成する
   * `<svg>` をインラインにせず `<img>` で埋め込み、グラデーションIDの衝突を避ける
2. `<head>` にテーマ早期判定の `<script>` を追加する
   * `localStorage` の `theme` 値（`light` / `dark` のみ有効）を読み、なければ `prefers-color-scheme` で判定
   * `document.documentElement` の `data-theme` 属性に設定（描画前に実行してちらつきを防ぐ）
   * `localStorage` アクセスは `try/catch` で保護
3. `<style>` を修正する
   * `:root` にライト用CSS変数、`[data-theme="dark"]` にダーク用CSS変数を定義（仕様書の配色表に従う）
   * 既存の固定色（`#1f2328` `#ffffff` `#e5e7eb` `#57606a` `#3b82d4` `#f7f8fa` `#c9d1d9`）をCSS変数に置換
   * `.page-header` の背景を `linear-gradient(135deg, #0f62fe, #a56eff)` に変更
   * ヘッダーのレイアウトを調整（ロゴ左上・切替ボタン右上に絶対配置、タイトル中央寄せ維持）
   * `.logo-link` / `.logo-link img`（48px）、`.theme-toggle`（ボタン）、`:focus-visible` のスタイルを追加
   * 狭い画面幅（`@media (max-width: 480px)`）でロゴとボタンがタイトルと重ならないよう、ヘッダーの上部パディングを確保
4. `<header>` のHTMLを修正する
   * ロゴ: `<a class="logo-link" href="https://www.ibm.com/products/bob" target="_blank" rel="noopener noreferrer"><img src="data:..." alt="IBM Bob"></a>`
   * 切替ボタン: `<button type="button" class="theme-toggle" id="theme-toggle"></button>`（ラベルはJavaScriptで設定）
5. 末尾の `<script>` にテーマ切替ロジックを追加する
   * ボタンラベル更新関数（ダーク中は「ライトテーマ」、ライト中は「ダークテーマ」）
   * クリックで `data-theme` を反転、`localStorage` に保存（`try/catch`）、ラベル更新
   * 既存の検索・絞り込み・アコーディオンのコードは変更しない
6. 自己検証（`grep` で外部リソース参照の有無を確認、HTMLの構文確認）

## GUI実装

* 対象コンポーネント: 単一HTMLファイル `faq.html`（フレームワーク不使用）
  * ロゴ: `<header class="page-header">` 内の `.logo-link`
  * 切替ボタン: `<header class="page-header">` 内の `.theme-toggle`
  * テーマ早期判定: `<head>` 内のインラインスクリプト
  * 切替ロジック: 既存の末尾 `<script>` に追記
* スタイル:
  * `<style>` 内のCSS変数（`:root` / `[data-theme="dark"]`）で全色を管理
  * ヘッダー背景はブルー→パープルのグラデーション、文字は白
  * アクセント色: ライト `#0f62fe` / ダーク `#4589ff`
  * ロゴは48px四方、切替ボタンは丸角の枠付きボタン（白半透明背景＋白文字、ヘッダー上で視認可能）
  * `:focus-visible` でキーボードフォーカスを表示
* 状態管理:
  * `<html data-theme="light|dark">` 属性で管理
  * 永続化は `localStorage`（キー: `theme`）
* 画面遷移: ロゴクリックで外部サイトを新しいタブで開く。サイト内の画面遷移なし
* レスポンシブ対応: 既存の max-width + padding を維持。480px以下ではヘッダー上部パディングを増やし、ロゴ・ボタンとタイトルの重なりを回避

## テストの追加・更新

自動テストなし（静的HTML単一ファイルのため）。手動検証で代替する。

## 検証計画

| 確認項目 | 確認方法 | 合格基準 |
|---------|---------|---------|
| ロゴ表示 | ブラウザで `faq.html` を開く | ヘッダー左上にBobロゴ（約48px）が表示される |
| ロゴリンク | ロゴをクリック | `https://www.ibm.com/products/bob` が新しいタブで開く。`rel="noopener noreferrer"` がHTMLに存在する |
| ライトテーマ配色 | 目視確認 | ヘッダーがブルー→パープルのグラデーション、アクセント色が `#0f62fe` |
| ダークテーマ切替 | 切替ボタンをクリック | ダーク配色（背景 `#161616` 系）に変わり、ボタン表記が「ライトテーマ」になる |
| 選択の保存 | 切替後にページを再読み込み | 直前に選択したテーマが維持される |
| OS設定による初期値 | 開発者ツールで `prefers-color-scheme` をエミュレートし、`localStorage` を消去して再読み込み | OS設定どおりのテーマで開く |
| 不正な保存値 | `localStorage.theme` に不正値を設定して再読み込み | 無視されOS設定に従う |
| 既存機能（ライト） | 検索・カテゴリ絞り込み・アコーディオン操作 | 従来どおり動作する |
| 既存機能（ダーク） | 同上 | 従来どおり動作し、文字が読める |
| 狭い画面幅 | 幅360px程度で確認 | ロゴ・ボタン・タイトルが重ならない |
| キーボード操作 | Tabキーで切替ボタンへ移動しEnter/Space | 切替でき、フォーカス表示が見える |
| 外部リソース参照なし | `grep` でHTMLソースを確認 | `<link>`・`<script src>`・`<img src>` に外部URLがない（ロゴの `<a href>` のみ外部URL） |

## 移行・ロールバック

* `faq.html` の変更のみ。ロールバックは `git checkout`（コミット済みの場合）または変更前の内容へ戻す。ただし `faq.html` は現在未追跡のため、実装前に退避コピーは作成せず、必要であればユーザーがGit管理に追加する
* 既存の他ファイルへの変更なし

## 未解決事項

* ダークテーマでヘッダーのグラデーションの明るさが適切かは、実装後の目視確認でユーザーに確認する
