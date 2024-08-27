"use client";

import { useEffect } from "react";
import TodoList from "./components/TodoList";

const App = () => {
  useEffect(() => {
    console.log(8);
  }, []);
  return <TodoList />;
};

export default App;
