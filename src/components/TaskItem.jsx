import { useState } from "react";

// 1件のタスクを表示するコンポーネント
export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // 編集モードかどうか
  const [isEditing, setIsEditing] = useState(false);
  // 編集中のテキスト
  const [editText, setEditText] = useState(task.text);

  // 編集を開始する
  const startEdit = () => {
    setEditText(task.text);
    setIsEditing(true);
  };

  // 編集を確定する
  const saveEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed) return; // 空文字では確定しない
    onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  // 編集をキャンセルする
  const cancelEdit = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  // 編集中のキー操作（Enter で確定・Escape でキャンセル）
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveEdit();
    } else if (event.key === "Escape") {
      cancelEdit();
    }
  };

  // 編集モードの表示
  if (isEditing) {
    return (
      <li className="task-item task-item--editing">
        <input
          type="text"
          className="task-item__edit-input"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="タスクを編集"
          autoFocus
        />
        <button
          type="button"
          className="task-item__save"
          onClick={saveEdit}
          disabled={!editText.trim()}
          aria-label="編集を保存する"
        >
          保存
        </button>
        <button
          type="button"
          className="task-item__cancel"
          onClick={cancelEdit}
          aria-label="編集をキャンセルする"
        >
          キャンセル
        </button>
      </li>
    );
  }

  // 通常表示
  return (
    <li className={"task-item" + (task.done ? " task-item--done" : "")}>
      <input
        type="checkbox"
        className="task-item__checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={task.text + " を完了にする"}
      />
      <span className="task-item__text">{task.text}</span>
      <button
        type="button"
        className="task-item__edit"
        onClick={startEdit}
        aria-label={task.text + " を編集する"}
      >
        編集
      </button>
      <button
        type="button"
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label={task.text + " を削除する"}
      >
        削除
      </button>
    </li>
  );
}
