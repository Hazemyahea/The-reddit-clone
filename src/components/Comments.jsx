import { useGetComment } from "../QueryAndMutate";
import Comment from "./Comment";
import Loader from "./iu/Loader";

const Comments = ({ id }) => {
  const { data, isLoading } = useGetComment(id);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="flex flex-col gap-5 w-full p-5">
        {data.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    );
  }
};

export default Comments;
