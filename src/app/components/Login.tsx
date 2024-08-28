import { UserGateway } from "@/frontend/infra/gateway/User.gateway";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const userGateway = UserGateway.getInstance();
export default function LoginFormComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
    await userGateway.login(data.email, data.password);
    // .then(() => {
    //   gotoLoginPage();
    // })
    // .catch((error) => {
    //   console.error(error);
    //   alert(error);
    // });
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid password.
              </p>
            )}
            <div className="flex justify-end">
              <Link
                href={"/forgot"}
                className="text-sm mt-1 hover:underline text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
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
