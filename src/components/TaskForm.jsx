import { useState } from "react";

// タスク追加フォームのコンポーネント
export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  // 送信時にタスクを追加する
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return; // 空文字は追加しない
    onAdd(trimmed);
    setText(""); // 入力欄をクリア
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-form__input"
        placeholder="新しいタスクを入力"
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="新しいタスク"
      />
      <button type="submit" className="task-form__button" disabled={!text.trim()}>
        追加
      </button>
    </form>
  );
}
