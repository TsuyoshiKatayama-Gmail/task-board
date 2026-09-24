// 1件のタスクを表示するコンポーネント
export default function TaskItem({ task, onToggle, onDelete }) {
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
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label={task.text + " を削除する"}
      >
        削除
      </button>
    </li>
  );
}
