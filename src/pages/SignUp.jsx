import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUp } from "../QueryAndMutate";
const Signup = () => {
  const navigate = useNavigate();
  const { mutate: Signup, isPending, error } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    Signup(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-3 gap-5 mx-auto w-2/4 my-20 border-slate-100"
    >
      <div>
        <h2 className=" text-3xl font-bold">Sign Up</h2>
        {error && (
          <div className=" bg-red-700 p-2 rounded-md text-white">
            There is error in data , Please try again
          </div>
        )}
      </div>
      <input
        {...register("fullname", {
          required: "fullname Address is required",
        })}
        aria-invalid={errors.fullname ? "true" : "false"}
        type="text"
        className=" border-blue-400 border p-3 rounded-md text-black"
        placeholder="write your fullname"
      />
      {errors.email && (
        <p
          className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
          role="alert"
        >
          {errors?.fullname.message}
        </p>
      )}
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
        You have Account ?{" "}
        <Link to="/login" className=" text-blue-400">
          Signin
        </Link>
      </p>
      <input
        disabled={isPending}
        type="submit"
        className=" bg-orange-600 border-red-400 border p-3 cursor-pointer hover:bg-orange-700 text-lg font-semibold rounded-md"
      />
    </form>
  );
};

export default Signup;
