"use client";

import { TodoListEntity } from "@/backend/domain/entities/todolist.entity";
import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoListEntity[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { title: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">ToDo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l"
          placeholder="Add a new task"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="list-none">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-2 mb-2 border rounded ${
              todo.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <span
              onClick={() => toggleComplete(index)}
              className={`flex-grow cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(index)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
