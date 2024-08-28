"use client";
import { CONFIG } from "@/frontend/infra/config/enviroments";
import { getCookie } from "@/frontend/infra/cookies/get";
import { useEffect } from "react";

const App = () => {
  function handler() {
    const token = getCookie(CONFIG.cookieTokenName!);
    if (token) {
      location.href = "/todo-list";
    } else {
      location.href = "/login";
    }
  }
  useEffect(() => {
    handler();
  });

  return <></>;
};

export default App;
