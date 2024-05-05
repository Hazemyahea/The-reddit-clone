import { useContext, useEffect, useState } from "react";
import { useGetPost, useGetuserbId, useUpdateLike } from "../../QueryAndMutate";
import Loader from "../../components/iu/Loader";
import { formatDateToRelativeTime } from "../../helper/helperFn";
import { useParams } from "react-router-dom";
import { GetSinglePost } from "../../api";
import { AuthContext } from "../../Context/AuthContext";
import CommentForm from "../../components/CommentForm";
import Comments from "../../components/Comments";

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const { mutate: addLike, error } = useUpdateLike();
  let { id } = useParams();
  const { data, error: errorPost, isLoading: loading } = useGetPost(id);
  if (loading) {
    return (
      <div className="flex flex-col w-3/4 p-5">
        <Loader />
      </div>
    );
  } else {
    ////////////////// Likes //////////////////
    let likeSpan = (
      <img
        src="/icons/likenotfill.png"
        className=" cursor-pointer"
        alt="like"
      />
    );
    let newLikes = [];
    let likes = [];
    likes = [...data.post[0]?.likes];
    if (likes.includes(user.user.id)) {
      newLikes = likes.filter((like) => like != user.user.id);
      likeSpan = (
        <img
          src="/icons/likefill.png"
          className=" cursor-pointer"
          alt="like fill"
        />
      );
    } else {
      newLikes = [...likes, user.user.id];

      likeSpan = (
        <img
          src="/icons/likenotfill.png"
          className=" cursor-pointer"
          alt="like"
        />
      );
    }

    ////////////////// Likes ////////////////////
    function LikeHandle() {
      addLike({ post_id: data.post[0].id, likes: newLikes });
    }
    if (error) {
      console.log(error);
    }

    if (errorPost) {
      console.log(error);
    }

    return (
      <>
        <div className="flex flex-col w-full mx-4 md:w-3/4 gap-3 mt-5">
          <div className=" flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img src={data.profiles[0].avatar} width={30} alt="profile" />
              <span>{data.profiles[0].fullname}</span>
              {data.profiles[0].status ? (
                <div className=" w-3 h-3 bg-green-500 rounded-full"></div>
              ) : (
                <div className=" w-3 h-3 bg-slate-400 rounded-full"></div>
              )}
              <span className=" text-sm text-slate-400">
                {formatDateToRelativeTime}
              </span>
            </div>
            <h2 className=" text-3xl font-bold text-slate-400">
              {" "}
              {data.post[0].title}{" "}
            </h2>
            <p>{data.post[0].content}</p>
            <img
              src={data.post[0].image}
              alt="post image"
              className=" rounded-md "
              width={700}
            />
            <div className=" flex gap-5">
              <p
                className=" bg-slate-700 rounded-lg p-1 flex items-center gap-1"
                onClick={() => LikeHandle()}
              >
                {likeSpan}
                {data.post[0].likes.length}
              </p>
              <p className=" bg-slate-700 rounded-lg p-1 flex items-center gap-1">
                <span className="material-symbols-outlined">comment</span>
                {data.post[0].comments.length}
              </p>
            </div>
          </div>
          <CommentForm post={data.post[0].id} />
          <Comments id={data.post[0].id} />
        </div>
      </>
    );
  }
};

export default PostDetails;
