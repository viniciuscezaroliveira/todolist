"use client";

import { TodoList as TodoListEntity } from "@/frontend/domain/todolist/TodoList";
import { TodoListGateway } from "@/frontend/infra/gateway/TodoList.gateway";
import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const todoListGateway = TodoListGateway.getInstance();

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoListEntity[]>([]);
  const [input, setInput] = useState<string>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<{ [key: string]: string }>({});

  const load = async () => {
    console.log(17);
    const todos = await todoListGateway.get({});
    setTodoList(todos);
  };
  const addTodo = async () => {
    if (input.trim()) {
      const todo = await todoListGateway.create({
        title: input,
        completed: false,
      });
      setTodoList([...todoList, todo]);
      setInput("");
    }
  };

  const handleEdit = (id: string, title: string) => {
    setEditData({
      id,
      title,
    });
    setOpenEdit(true);
  };

  const toggleComplete = async (id: string) => {
    const results = await todoListGateway.update(id, { completed: true });
    setTodoList(results);
  };
  const toggleNotComplete = async (id: string) => {
    const results = await todoListGateway.update(id, { completed: false });
    setTodoList(results);
  };

  const deleteTodo = async (id: string) => {
    await todoListGateway.delete(id);
    const todos = await todoListGateway.get({});
    setTodoList(todos);
  };

  const handleCloseEdit = async () => {
    setOpenEdit(false);
    load();
  };
  useEffect(() => {
    console.log(60);
    load();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-2 ">
      <h1 className="text-2xl font-bold mb-4 text-center">To-do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l"
          placeholder="Add new task"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="list-none">
        {todoList.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-2 mb-2 border rounded ${
              todo.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <span
              onClick={() => handleEdit(todo.id!, todo.title!)}
              className={`flex-grow cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() =>
                todo.completed
                  ? toggleNotComplete(todo.id!)
                  : toggleComplete(todo.id!)
              }
              className={`text-white p-1 rounded ml-2
                ${
                  todo.completed
                    ? "bg-purple-500  hover:bg-purple-600 "
                    : "bg-green-500  hover:bg-green-600"
                } 
                  `}
            >
              {todo.completed ? "Not done" : "Done"}
            </button>
            <button
              onClick={() => deleteTodo(todo.id!)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {openEdit && (
        <EditTodo
          id={editData.id}
          title={editData.title}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default TodoList;
