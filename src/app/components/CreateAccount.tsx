import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserGateway } from "../../frontend/infra/gateway/User.gateway";
const userGateway = UserGateway.getInstance();
export default function CreateAccountFormComponent() {
  const [isPasswordEqualConfirm, setIsPasswordEqualConfirm] =
    useState<boolean>(false);
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const router = useRouter();
  function gotoLoginPage() {
    router.push("/login");
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    await userGateway
      .createAccount(data)
      .then(() => {
        alert("Conta criada com sucesso.");
        gotoLoginPage();
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  };

  function onChangePass(event: any) {
    setPass(event.target.value);
  }

  function onChangeConfirmPass(event: any) {
    setConfirmPass(event.target.value);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name", {
                required: true,
                maxLength: 100,
                minLength: 3,
                pattern: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
              })}
              maxLength={100}
              autoFocus
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid name. Min 3 characters. Max 100 characters.
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid email. Example: test@test.com
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              id="password"
              name="password"
              type={"password"}
              onChange={onChangePass}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid password. Min 6 characters. Max 12
                characters.
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", { required: true })}
              id="confirmPassword"
              name="confirmPassword"
              type={"password"}
              onChange={onChangeConfirmPass}
              required
              onKeyDown={(e) => e.key === "Enter" && onSubmit}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {pass !== confirmPass && (
            <p className="text-red-500 text-xs italic">
              Passwords do not match
            </p>
          )}
          <div className="flex items-center justify-between gap-2">
            <button
              type="submit"
              className={`w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                pass !== confirmPass
                  ? "bg-gray-100 text-gray-200 hover:bg-gray-100 "
                  : ""
              }`}
              disabled={pass !== confirmPass}
            >
              Create
            </button>
            <button
              type="button"
              className="w-full bg-transparent border border-gray-900 hover:bg-gray-700 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={gotoLoginPage}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
