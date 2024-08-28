// UserContext.tsx
import { User } from "@/frontend/domain/user/User";
import { CONFIG } from "@/frontend/infra/config/enviroments";
import { getCookie } from "@/frontend/infra/cookies/get";
import { UserGateway } from "@/frontend/infra/gateway/User.gateway";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { initialState, userReducer } from "../reducers/userReducer";

interface UserContextProps {
  state: User;
  dispatch: React.Dispatch<any>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const router = useRouter();
  const handleUser = async () => {
    const token = getCookie(CONFIG.cookieTokenName!);
    if (token) {
      const userGateway = UserGateway.getInstance();
      const user = await userGateway.me();
      if (user) {
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      }
      router.push("/todo-list");
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
