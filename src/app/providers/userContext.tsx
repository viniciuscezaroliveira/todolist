// UserContext.tsx
import { User } from "@/frontend/domain/user/User";
import React, { createContext, ReactNode, useReducer } from "react";
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

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
