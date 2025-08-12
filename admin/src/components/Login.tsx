import axios from "axios";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
type Props = {
  setToken: (token: string) => void;
};
const Login = ({ setToken }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit(e: FormEvent) {
    try {
      e.preventDefault();

      const response = await axios.post(backendUrl+"v1/user/admin", {
        email,
        password,
      });
      toast.success(`Welcome back admin`);
      setToken(response.data.token);

      //@ts-expect-error aaa
    } catch (error: Error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.response.data) {
        console.log(error);
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@email.com"
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>{" "}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="Enter your Password"
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 p w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-900 active:bg-gray-600 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
