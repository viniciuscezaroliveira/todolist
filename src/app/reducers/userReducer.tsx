import { User } from "@/frontend/domain/user/User";
import { CONFIG } from "@/frontend/infra/config/enviroments";
import { eraseCookie } from "@/frontend/infra/cookies/erase";

// userReducer.tsx

type Action = { type: "SET_USER"; payload: User } | { type: "LOGOUT" };

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
    case "LOGOUT":
      eraseCookie(CONFIG.cookieTokenName!);
      location.href = "/login";
      return initialState;
    default:
      return state;
  }
}
