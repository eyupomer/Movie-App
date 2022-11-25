import { useState } from "react";
import {FcGoogle} from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center">
      <div className="hidden lg:block min-w-[800px] min-h-[800px]">
        <img
          className="w-full h-full"
          src={"https://picsum.photos/800/800"}
          alt="Sample-movie"
        />
      </div>
      <div className="flex-1 p-20 bg-gray-200">
        <h1 className="text-4xl text-center mb-12">Login</h1>
        <form id="register" onSubmit = {handleSubmit}>
          <div className="flex flex-col gap-y-5">
            
            <div className="flex flex-col gap-y-1 items-start">
              <label className="pl-6 text-2xl" htmlFor="email">
                Email
              </label>
              <input
                className="w-10/12 mx-5 p-2 rounded-md border-2 focus:outline-none"
                name="email"
                id="email"
                placeholder="Enter your email adress."
                type="mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-1 items-start">
              <label className="pl-6 text-2xl" htmlFor="password">
                Password
              </label>
              <input
                className="w-10/12 mx-5 p-2 rounded-md border-2 focus:outline-none"
                name="password"
                id="password"
                placeholder="Enter your password."
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-blue-600 underline text-md cursor-pointer ml-6">Forgot Password?</div>
            <input
              className="mt-3 py-2 text-lg border-2 rounded-md cursor-pointer bg-blue-600 text-white w-full hover:bg-white hover:text-blue-600 duration-300 hover:border-blue-600"
              value="Login"
              type="submit"
            />
          </div>
        </form>
        <button className="mt-4 py-2 text-lg border-2 rounded-md bg-blue-600 text-white w-full hover:bg-white hover:text-blue-600 duration-300 hover:border-blue-600">
          Continue with Google <FcGoogle className="inline ml-2" size={22} />
        </button>
      </div>
    </div>
  );
};

export default Login;
