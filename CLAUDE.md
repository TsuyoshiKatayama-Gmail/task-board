# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

- **プロジェクト名**: task-board
- **概要**: タスクを追加・完了/未完了の切り替え・削除できるタスクボード Web アプリケーション。完了済みタスクはグレー表示になる。
- **技術スタック**: React 18 + Vite（JavaScript / JSX）
- **現状**: 基本機能（タスク追加・完了切替・削除・完了時グレー表示・localStorage による永続化）を実装済み。

## 機能一覧

- テキスト入力でタスクを追加できる
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
        └── TaskItem.jsx    # タスク1件の表示（完了切替・削除）
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

## セットアップ・実行方法

初回のみ依存パッケージをインストールする。

```bash
npm install
```

開発サーバーを起動する（起動時にブラウザが自動で開く。URL は http://localhost:5173/ ）。

```bash
npm run dev
```

本番用ビルドとビルド結果のプレビュー。

```bash
npm run build     # dist/ に成果物を生成
npm run preview   # ビルド結果をローカルで確認
```

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
