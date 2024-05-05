import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useUserLogin } from "../QueryAndMutate";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { mutate: logIn, error, isPending } = useUserLogin();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    logIn(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-3 gap-5  md:mx-auto w-full md:w-2/4 my-20 border-slate-100"
    >
      {error && (
        <div className=" bg-red-700 p-2 rounded-md text-white">
          There is error in data , Please try again
        </div>
      )}
      <div>
        <h2 className=" text-3xl font-bold">Log In</h2>
      </div>

      <input
        {...register("email", {
          required: "Email Address is required",
        })}
        aria-invalid={errors.email ? "true" : "false"}
        type="email"
        className=" border-blue-400 border p-3 rounded-md text-black"
        placeholder="write your email"
      />
      {errors.email && (
        <p
          className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
          role="alert"
        >
          {errors.email.message}
        </p>
      )}

      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Please write password more than 6 char",
          },
        })}
        type="password"
        className=" border-blue-400  border p-3 rounded-md text-black"
        placeholder="write your password"
      />
      {errors.password && (
        <span
          className=" text-white p-3 rounded-md text-lg font-bold bg-red-600"
          role="alert"
        >
          {errors.password.message}
        </span>
      )}
      <p className=" text-lg font-semibold">
        You don't have Account ?{" "}
        <Link to="/signup" className=" text-blue-400">
          Signup
        </Link>
      </p>
      <input
        type="submit"
        disabled={isPending}
        className=" bg-orange-600 border-red-400 border p-3 cursor-pointer hover:bg-orange-700 text-lg font-semibold rounded-md"
      />
    </form>
  );
};
