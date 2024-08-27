import { TodoListGateway } from "@/frontend/infra/gateway/TodoList.gateway";
import { useState } from "react";

type Props = {
  id: string;
  title: string;
  onClose: () => void;
};
const todoListGateway = TodoListGateway.getInstance();
export default function EditTodo({ id, title, onClose }: Props) {
  const [input, setInput] = useState(title);
  async function editTodo() {
    if (input.trim()) {
      await todoListGateway.update(id, { title: input }).then(onClose);
    }
  }
  return (
    //max-w-md
    <div className="absolute w-full top-0 left-0 right-0 ml-auto mr-auto container z-10 h-full backdrop-blur-md flex justify-center items-center">
      <div className="max-w-lg w-full h-1/3 bg-white border border-gray-200 rounded p-4">
        <h1>Edit To-do</h1>
        <div className="flex flex-col mb-4 gap-4 mt-2 ">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Add new task"
          />
          <div className="flex justify-end items-end gap-2  mt-10">
            <button
              onClick={editTodo}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
