import { Link } from "react-router-dom";
import { formatDateToRelativeTime } from "../helper/helperFn";
import { useUpdateLike } from "../QueryAndMutate";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export const Post = ({ post }) => {
  const [userid, setUSer] = useState(null);
  const [loading, setloading] = useState(false);

  const relativeTime = formatDateToRelativeTime(post.created_at);
  const { user } = useContext(AuthContext);
  const { mutate: addLike, error, isLoading: likeloading } = useUpdateLike();

  //////////////////// Likes //////////////////

  let likeSpan = (
    <img src="/icons/likenotfill.png" className=" cursor-pointer" alt="like" />
  );
  const likes = [...post.likes];
  let newLikes = [];
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
  function LikeHandle(event) {
    addLike({ post_id: post.id, likes: newLikes });
  }

  return (
    <div className=" p-7 rounded-md hover:bg-custom-dark border-b border-[#3C4345]">
      <div className=" flex flex-col gap-3">
        <Link
          className="flex items-center gap-2"
          to={`profile/${post.profiles.id}`}
        >
          <img
            src={
              post.profiles.avatar
                ? post.profiles.avatar
                : "/images/profile.png"
            }
            width={30}
            alt="profile"
          />
          <span>{post.profiles.fullname}</span>
          {post.profiles.status ? (
            <div className=" w-3 h-3 bg-green-500 rounded-full"></div>
          ) : (
            <div className=" w-3 h-3 bg-slate-400 rounded-full"></div>
          )}
          <span className=" text-sm text-slate-400">{relativeTime}</span>
        </Link>
        <Link to={`/post/${post.id}`} className="flex flex-col gap-2">
          <h2 className=" text-3xl text-slate-400"> {post.title} </h2>
          <p>
            {post.content.slice(0, 150)}{" "}
            {post.content.length > 200 ? "..." : ""}
          </p>
          <img
            src={post.image}
            alt="post image"
            className=" rounded-md w-[60%]"
          />
        </Link>
        <div className=" flex gap-5">
          <p
            className=" bg-slate-700 rounded-lg p-1 flex items-center gap-1"
            onClick={(e) => LikeHandle(e)}
          >
            {likeSpan}
            {post.likes.length}
          </p>
          <p className=" bg-slate-700 rounded-lg p-1 flex items-center gap-1">
            <span className="material-symbols-outlined">comment</span>
            {post.comments.length}
          </p>
        </div>
      </div>
    </div>
  );
};
