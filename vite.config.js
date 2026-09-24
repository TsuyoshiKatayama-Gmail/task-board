import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite の設定（React プラグインを有効化）
export default defineConfig({
  // GitHub Pages はリポジトリ名のサブパス（/task-board/）で公開されるため、
  // アセットの参照が正しく解決されるよう base を指定する。
  base: "/task-board/",
  plugins: [react()],
  server: {
    open: true, // dev サーバー起動時にブラウザを自動で開く
  },
});
