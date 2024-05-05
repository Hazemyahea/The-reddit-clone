import { Link } from "react-router-dom";
import { useGetuserbId } from "../QueryAndMutate";

const Comment = ({ comment }) => {
  const {
    data: user,
    error: userError,
    isLoading: userloading,
  } = useGetuserbId(comment.user_id);

  return (
    <div className="flex flex-col gap-3 p-5  shadow-sm shadow-slate-600 hover:bg-custom-dark">
      <Link className=" flex items-center w-fit gap-3">
        <div>
          <img
            className=" rounded-lg bg-slate-500 shadow-lg"
            src={comment.profiles.avatar}
            alt="profile"
            width={70}
          />
        </div>
        <p className="">{comment.profiles.fullname}</p>
      </Link>
      <div className=" font-light">{comment.content}</div>
    </div>
  );
};

export default Comment;
