import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDateToRelativeTime } from "../../helper/helperFn";

export const User = ({ user }) => {
  const [show, setShow] = useState(false);
  let totalLikes = 0;
  /// tota Likes
  for (let i = 0; i < user.posts.length; i++) {
    totalLikes += user.posts[i].likes.length;
  }
  return (
    <Link
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      key={user.id}
      to={`/profile/${user.id}`}
      className="flex gap-1 relative items-start p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300"
    >
      <div className="">
        <h3 className=" text-center font-semibold text-lg">{user.fullname}</h3>
        <img
          src={user.avatar}
          alt="profile picture"
          width={80}
          className="rounded-lg shadow-lg w-full mt-3"
        />
        <p className=" text-center font-mono mt-4">
          {user.About?.slice(0, 100)}
        </p>
      </div>
      {show && (
        <div className=" absolute p-5 rounded-lg bg-slate-950 text-white">
          <p>SignUp From {formatDateToRelativeTime(user.created_at)}</p>
          <p>have {user.posts.length} Posts</p>
          <p>user have {totalLikes} likes</p>
        </div>
      )}
    </Link>
  );
};
