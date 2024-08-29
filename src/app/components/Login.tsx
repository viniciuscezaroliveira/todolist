import { CONFIG } from "@/frontend/infra/config/enviroments";
import { setCookie } from "@/frontend/infra/cookies/set";
import { UserGateway } from "@/frontend/infra/gateway/User.gateway";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserContext } from "../providers/userContext";
const userGateway = UserGateway.getInstance();
export default function LoginFormComponent() {
  const router = useRouter();
  const { state, dispatch } = useContext(UserContext)!;

  const handleToCreateAccount = () => {
    router.push("/create-account");
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const token: string | null = await userGateway
      .login(data.email, data.password)
      .catch((error) => {
        console.error(error);
        alert(error);
        return null;
      });

    if (token) {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      setCookie(CONFIG.cookieTokenName!, token, date);
      const user = await userGateway.me();
      dispatch({
        type: "SET_USER",
        payload: user,
      });
      router.push("/todo-list");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              autoFocus
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid email. Example: test@test.com
              </p>
            )}
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: true,
              })}
              type={"password"}
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid password.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log in
            </button>
            <button
              type="button"
              className="bg-transparent border border-gray-900 hover:bg-gray-700 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleToCreateAccount}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
