// React のフックを取得（CDN 版なので window.React から取り出す）
const { useState, useEffect } = React;

// localStorage に保存する際のキー
const STORAGE_KEY = "task-board.tasks";

// localStorage から初期タスクを読み込む
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    // 壊れたデータが入っていた場合は空配列で開始する
    console.error("タスクの読み込みに失敗しました", error);
    return [];
  }
}

// タスク追加フォームのコンポーネント
function TaskForm({ onAdd }) {
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

// 1件のタスクを表示するコンポーネント
function TaskItem({ task, onToggle, onDelete }) {
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

// アプリ全体のコンポーネント
function App() {
  const [tasks, setTasks] = useState(loadTasks);

  // タスクが変わるたびに localStorage へ保存する
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // タスクを追加する
  const addTask = (text) => {
    const newTask = {
      id: Date.now(), // 一意な ID として現在時刻を利用
      text: text,
      done: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // 完了・未完了を切り替える
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  // タスクを削除する
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1 className="app__title">タスクボード</h1>
      <TaskForm onAdd={addTask} />
      {tasks.length === 0 ? (
        <p className="task-empty">タスクはありません。上のフォームから追加してください。</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

// React アプリを #root にマウントする
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
