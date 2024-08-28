"use client";

import { TodoList as TodoListEntity } from "@/frontend/domain/todolist/TodoList";
import { TodoListGateway } from "@/frontend/infra/gateway/TodoList.gateway";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/userContext";
import { ConfirmDelete } from "./ConfirmDelete";
import EditTodo from "./EditTodo";
import Filter from "./Filter";

const todoListGateway = TodoListGateway.getInstance();

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoListEntity[]>([]);
  const [input, setInput] = useState<string>("");
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<{ [key: string]: string }>({});
  const [deleteTodoId, setDeleteTodoId] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean | undefined>(undefined);
  const { state, dispatch } = useContext(UserContext);

  const load = async (completed?: boolean) => {
    completed = completed ?? filter;
    await todoListGateway
      .get({ completed })
      .then((todos) => {
        setTodoList(todos);
      })
      .catch((error) => {
        console.error(error);
        setTodoList([]);
      });
  };
  const addTodo = async () => {
    if (input.trim()) {
      const todo = await todoListGateway.create({
        title: input,
        completed: false,
      });
      load();
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
    await todoListGateway.update(id, { completed: true });
    await load();
  };
  const toggleNotComplete = async (id: string) => {
    await todoListGateway.update(id, { completed: false });
    await load();
  };

  const deleteTodo = async (id: string) => {
    await todoListGateway.delete(id);
    const todos = await todoListGateway.get({});
    setTodoList(todos);
    handleCloseDelete();
  };

  const handleCloseEdit = async () => {
    setOpenEdit(false);
    load();
  };

  const handleConfirmationDelete = async (id: string) => {
    setDeleteTodoId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleLoadFilter = async (completed?: boolean) => {
    setFilter(completed);
  };

  useEffect(() => {
    load();
  }, [filter]);

  return (
    <div className="max-w-md mx-auto mt-10 p-2 ">
      <h1 className="text-2xl font-bold mb-4 text-center">
        To-do List - {state.name}
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l"
          placeholder="Add new task"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          autoFocus
        />
        <button
          onClick={addTodo}
          className={`bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 ${
            !input.trim() ? "bg-gray-300 hover:bg-gray-300" : ""
          }`}
          disabled={!input.trim()}
        >
          Add
        </button>
      </div>
      <Filter
        getTodoList={(completed) => {
          handleLoadFilter(completed);
        }}
      />
      <ul className="mt-2">
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
              test-id="btn-completed"
            >
              {todo.completed ? "Not done" : "Done"}
            </button>
            <button
              onClick={() => handleConfirmationDelete(todo.id!)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600 ml-2"
              test-id="btn-delete"
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
      {openDelete && (
        <ConfirmDelete
          handleDelete={() => {
            deleteTodo(deleteTodoId);
          }}
          handleClose={handleCloseDelete}
        />
      )}
    </div>
  );
};

export default TodoList;
