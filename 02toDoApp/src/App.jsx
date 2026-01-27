import React, { useState } from "react";
import "./App.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const startEdit = (todo) => {
    setIsEditing(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setIsEditing(null);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Main Title - Even Larger */}
      <h1 className="text-6xl font-black text-center text-white mb-10 tracking-tighter">
        TODO APP
      </h1>

      {/* Container - Widened to max-w-2xl (approx 672px) */}
      <div className="max-w-5xl mx-auto p-10 bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 font-sans">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center uppercase tracking-wide">
          My Tasks
        </h2>

        {/* Input Section - Larger Padding and Text */}
        <form onSubmit={addTodo} className="flex gap-4 mb-10">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-gray-800 text-white text-50 px-3 py-4 rounded-2xl outline-none border-2 border-gray-600 focus:border-blue-500 transition-all"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg"
          >
            Add
          </button>
        </form>

        {/* Todo List Container */}
        <div className="flex flex-col font-bold gap-5">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 border-4 border-dashed border-gray-800 rounded-3xl">
              <p className="text-2xl font-bold">No tasks yet</p>
              <p className="text-lg opacity-70">
                Get started by adding one above!
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex justify-between items-center bg-gray-800 p-3 rounded-2xl border-2 border-gray-700 transition-all ${
                  todo.completed ? "opacity-50 border-green-900" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-5 flex-1 overflow-hidden">
                  {/* Larger Tick Circle */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-8 h-8 shrink-0 rounded-full border-4 flex items-center justify-center transition-all ${
                      todo.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-500 hover:border-blue-400"
                    }`}
                  >
                    {todo.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  {isEditing === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="bg-gray-700 text-white px-3 py-2 rounded-xl outline-none border-2 border-blue-500 w-full"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => toggleTodo(todo.id)}
                      className={`cursor-pointer truncate ${
                        todo.completed
                          ? "text-gray-500 line-through"
                          : "text-white"
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                {/* Larger Control Buttons */}
                <div className="flex gap-3 shrink-0 ml-4">
                  <button
                    onClick={() =>
                      isEditing === todo.id
                        ? saveEdit(todo.id)
                        : startEdit(todo)
                    }
                    className={`px-5 py-3 text-lg rounded-xl text-white font-black transition-all ${
                      isEditing === todo.id
                        ? "bg-blue-500 hover:bg-blue-400"
                        : "bg-green-600 hover:bg-green-500"
                    }`}
                  >
                    {isEditing === todo.id ? "Save" : "Edit"}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-5 py-3 text-lg bg-red-600 hover:bg-red-500 rounded-xl text-white font-black transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
