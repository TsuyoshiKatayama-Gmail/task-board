import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskItem from "./components/TaskItem.jsx";

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

// アプリ全体のコンポーネント
export default function App() {
  const [tasks, setTasks] = useState(loadTasks);

  // タスクが変わるたびに localStorage へ保存する
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // タスクを追加する
  const addTask = (text) => {
    const newTask = {
      id: Date.now(), // 一意な ID として現在時刻を利用
      text,
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
