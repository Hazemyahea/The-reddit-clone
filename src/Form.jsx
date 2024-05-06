import { useContext, useRef, useState } from "react";
import { useInsertPost } from "./QueryAndMutate";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "./components/iu/Loader";
import { AuthContext } from "./Context/AuthContext";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Form = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutate: inserPost, isPending, isSuccess, error } = useInsertPost();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const notify = () => {
    toast("🦄 Post Added !", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const onSubmit = (data) => {
    inserPost({
      title: data.title,
      content: data.content,
      image: data.image[0],
      user_id: user.user.id,
    });
    notify();
  };
  if (error) {
    console.log(error);
  }
  if (isSuccess) {
    navigate("/");
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <input
          defaultValue=""
          {...register("title", { required: true })}
          placeholder="Title"
          className=" bg-transparent border-slate-300 border p-2 rounded-lg h-[60px] outline-none hover:bg-custom-dark"
        />
        {errors.title?.type === "required" && (
          <p className="bg-red-600 text-white p-3 rounded-md text-lg font-bold">
            title is required
          </p>
        )}
        <textarea
          {...register("content", { required: true, max: 10 })}
          className=" bg-transparent border-slate-300 border p-2 rounded-lg outline-none hover:bg-custom-dark"
          placeholder="body"
        />
        {errors.content?.type === "required" && (
          <p className=" bg-red-600 text-white p-3 rounded-md text-lg font-bold">
            body is required
          </p>
        )}

        <input
          defaultValue=""
          {...register("image", { required: true })}
          type="file"
          className=" block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        {errors.image?.type === "required" && (
          <p className="bg-red-600 text-white p-3 rounded-md text-lg font-bold">
            image is required
          </p>
        )}

        <input
          disabled={isPending}
          type="submit"
          className=" bg-custom-dark w-20 p-3 rounded-lg text-lg  cursor-pointer mt-2 hover:bg-blue-800"
        />
      </form>

      <ToastContainer />
    </>
  );
};

export default Form;
