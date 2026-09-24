# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

- **プロジェクト名**: task-board
- **概要**: タスクを追加・完了/未完了の切り替え・削除できるタスクボード Web アプリケーション。完了済みタスクはグレー表示になる。
- **技術スタック**: React 18 + Vite（JavaScript / JSX）
- **現状**: 基本機能（タスク追加・編集・完了切替・削除・完了時グレー表示・localStorage による永続化）を実装済み。

## 技術スタック

- **言語**: JavaScript（ES Modules）/ JSX（TypeScript は未使用）
- **UI ライブラリ**: React 18（`react` / `react-dom` `^18.3.1`）— 関数コンポーネント + Hooks
- **ビルドツール**: Vite 5（`vite` `^5.4.11`）+ `@vitejs/plugin-react`
- **状態管理**: React 標準の `useState` / `useEffect` のみ（外部の状態管理ライブラリは導入しない）
- **データ永続化**: ブラウザの `localStorage`（サーバー・DB は不要）
- **スタイル**: 素の CSS（`src/style.css`）。クラス名は BEM 風
- **ホスティング / CI**: GitHub Pages + GitHub Actions（詳細は「デプロイ先」を参照）

## 機能一覧

- テキスト入力でタスクを追加できる
- 既存タスクのテキストをインラインで編集できる（Enter で保存・Escape でキャンセル）
- チェックボックスで完了・未完了を切り替えられる
- タスクを削除できる
- 完了済みのタスクはグレー（取り消し線付き）で表示する
- タスクは `localStorage` に自動保存され、リロードしても保持される

## 開発方針

- UI は React（関数コンポーネント + Hooks）で実装する。クラスコンポーネントは使わない。
- ビルド・開発サーバーには Vite を使用する。
- 状態管理は React の `useState` / `useEffect` を基本とし、不要な外部状態管理ライブラリは導入しない。
- モダンブラウザ（Chrome / Safari / Firefox / Edge の最新版）で動作すること。
- レスポンシブ対応（スマホ・PC両対応）を意識する。
- タスクデータの永続化は `localStorage` を利用し、サーバー不要で完結させる。

## ディレクトリ構成

```
task-board/
├── index.html              # Vite のエントリー（/src/main.jsx を読み込む）
├── package.json            # npm スクリプト・依存関係の定義
├── vite.config.js          # Vite の設定（React プラグイン・自動ブラウザ起動）
├── .gitignore              # node_modules, dist などを除外
└── src/
    ├── main.jsx            # React アプリのマウント処理
    ├── App.jsx             # 状態管理・localStorage 永続化・全体の組み立て
    ├── style.css           # スタイル定義
    └── components/
        ├── TaskForm.jsx    # タスク追加フォーム
        └── TaskItem.jsx    # タスク1件の表示（編集・完了切替・削除）
```

## コーディング規約

- **React / JSX**:
  - 関数コンポーネントと Hooks（`useState` / `useEffect` など）を使用する。
  - コンポーネントは機能ごとにファイルを分割し、`src/components/` に配置する。
  - コンポーネント名は英語のパスカルケース（例: `TaskForm`）、ファイル名も同名の `.jsx` とする。
- **CSS**: クラス名は分かりやすい命名（BEM 風）にする。レスポンシブ対応を意識する。
- **JavaScript**:
  - `const` / `let` を使用し、`var` は使わない。
  - 変数名・関数名は英語のキャメルケース、コメントは日本語で記述する。
  - 機能ごとに関数・コンポーネントを分割し、可読性を保つ。
- **アクセシビリティ**: `aria-label` などを付与し、フォームやボタンの用途が分かるようにする。

## コンポーネント命名規約

- **コンポーネント名**: 英語のパスカルケース（例: `App` / `TaskForm` / `TaskItem`）。ファイル名も同名の `.jsx` とし、1 ファイル 1 コンポーネントを基本とする。
- **配置**: 画面全体を組み立てる `App.jsx` は `src/` 直下、再利用・分割した部品は `src/components/` 配下に置く。
- **役割による命名**: 名前から役割が分かるようにする（`〜Form` は入力フォーム、`〜Item` は一覧の 1 件、`〜List` は一覧全体、など）。
- **Props / イベントハンドラ**:
  - 親から渡すコールバックは `on〜`（例: `onAdd` / `onToggle` / `onDelete` / `onEdit`）と命名する。
  - コンポーネント内部で定義するハンドラ関数は `handle〜`（例: `handleSubmit` / `handleKeyDown`）と命名する。
- **CSS クラス名（BEM 風）**: `ブロック__要素--修飾子` の形式で、コンポーネント名に対応するブロック名を使う。
  - ブロック: コンポーネント単位（例: `task-form` / `task-item`）
  - 要素: `ブロック__要素`（例: `task-item__text` / `task-item__delete`）
  - 状態・修飾子: `ブロック--修飾子`（例: `task-item--done` / `task-item--editing`）

## セットアップ・実行方法

初回のみ依存パッケージをインストールする。

```bash
npm install
```

### 開発サーバーの起動

開発サーバーを起動する（起動時にブラウザが自動で開く。URL は http://localhost:5173/ ）。

```bash
npm run dev
```

- 起動後はソースを保存すると自動でブラウザに反映される（ホットリロード）。
- サーバーはフォアグラウンドで動き続けるため、そのターミナルは開発サーバー専用になる。別のコマンドを実行したいときは新しいターミナルを開く。
- ポート `5173` が使用中の場合は Vite が自動で別のポート（`5174` など）を割り当てる。実際の URL は起動時のログで確認する。

### 開発サーバーの停止

- サーバーを起動しているターミナルで `Ctrl + C` を押すと停止する。
- ターミナルを閉じてしまった等で停止できない場合は、ポートを使っているプロセスを調べて終了する。

```bash
# 5173 番ポートを使っているプロセスを確認して終了する（macOS / Linux）
lsof -ti:5173 | xargs kill
```

### 本番ビルド・プレビュー

本番用ビルドとビルド結果のプレビュー。

```bash
npm run build     # dist/ に成果物を生成
npm run preview   # ビルド結果をローカルで確認
```

## デプロイ先

- **ホスティング**: GitHub Pages
- **公開 URL**: https://TsuyoshiKatayama-Gmail.github.io/task-board/
- **リポジトリ**: https://github.com/TsuyoshiKatayama-Gmail/task-board
- **デプロイ方法**: `main` ブランチへの push をトリガーに、GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルド（`npm ci` → `npm run build`）し、`dist/` を GitHub Pages へ公開する。Actions タブから手動実行（`workflow_dispatch`）も可能。
- **注意点**:
  - GitHub Pages はリポジトリ名のサブパス（`/task-board/`）で公開されるため、`vite.config.js` の `base: "/task-board/"` を変更しない（変更するとアセットのパスが解決できず 404 になる）。
  - `dist/` はコミットせず、ビルドは CI 上で行う（成果物はリポジトリに含めない）。

## Git 運用ルール

- **コードを変更するたびに GitHub にプッシュすること。** 動作確認まで終えた変更は、その都度コミットしてリモート（GitHub）へ push する。
- 1 コミットには意味のある単位の変更をまとめる（大きな変更を溜め込まない）。
- コミットメッセージは日本語で、何を変更したかが分かるように書く（例: `タスクの完了切り替え機能を追加`）。
- `node_modules` や `dist` はコミットしない（`.gitignore` で除外済み）。
- 基本的な手順:

  ```bash
  git add -A
  git commit -m "変更内容を説明するメッセージ"
  git push origin main
  ```

## コミュニケーション

- **返答は必ず日本語で行うこと。**
- コード内のコメントも日本語で記述する。
