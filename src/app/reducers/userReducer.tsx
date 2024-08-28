import { User } from "@/frontend/domain/user/User";

// userReducer.tsx

type Action = { type: "SET_USER"; payload: User } | { type: "CLEAR_USER" };

export const initialState: User = {
  id: "",
  name: "",
  email: "",
};

export function userReducer(state: User, action: Action): User {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    case "CLEAR_USER":
      return initialState;
    default:
      return state;
  }
}
