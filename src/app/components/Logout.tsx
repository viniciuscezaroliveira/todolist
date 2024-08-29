import { useContext } from "react";
import { UserContext } from "../providers/userContext";

export default function Logout() {
  const { state, dispatch } = useContext(UserContext)!;
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="absolute w-full top-0 right-6 flex  justify-between  left-6 p-2 gap-2 sm:justify-end sm:left-0">
      {state.name && (
        <>
          {" "}
          <div className="text-sm flex flex-col ">
            <span>User info:</span>
            <span className="font-bold">{state.name}</span>
            <span className="font-bold">{state.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 "
            id="logout"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
