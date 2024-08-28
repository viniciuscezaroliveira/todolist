"use client";
import TodoList from "./components/TodoList";
import { UserProvider } from "./providers/userContext";

const App = () => {
  return (
    <UserProvider>
      <TodoList />
    </UserProvider>
  );
};

export default App;
