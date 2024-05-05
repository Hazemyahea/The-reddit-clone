import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthContext";
import { userInserComments } from "../QueryAndMutate";
import { Bounce, ToastContainer, toast } from "react-toastify";

const CommentForm = ({ post }) => {
  const { user } = useContext(AuthContext);
  const {
    mutate: addComment,
    isPending: loading,
    isSuccess,
  } = userInserComments();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const notify = () => {
    toast.success("🦄 Comment Added successfully", {
      position: "top-left",
      autoClose: 500,
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
    addComment({
      user_id: user.user.id,
      content: data.content,
      post_id: post,
    });
    notify();

    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <textarea
          {...register("content", { required: true })}
          className=" bg-transparent border-slate-300 border p-2 rounded-lg outline-none hover:bg-custom-dark"
          placeholder="body"
        />
        {errors.content?.type === "required" && (
          <p className=" bg-red-600 text-white p-3 rounded-md text-lg font-bold">
            body is required
          </p>
        )}
        <input
          type="submit"
          value="Comment"
          className=" bg-custom-dark w-28 p-3 rounded-lg text-lg  cursor-pointer mt-2 hover:bg-blue-800"
        />
      </form>
      <ToastContainer
        position="top-left"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default CommentForm;
