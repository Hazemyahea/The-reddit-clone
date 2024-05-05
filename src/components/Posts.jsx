import { Post } from "./Post";
import { useGetPosts } from "../QueryAndMutate";
import Loader from "./iu/Loader";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import BottomBar from "./BottomBar";

export const Posts = () => {
  const { ref, inView, entry } = useInView();
  const { isLoading, data: posts } = useGetPosts();

  // console.log(isError);
  // if (isError) {
  //   return <div>{error.message}</div>;
  // }

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [inView, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col md:w-3/4 container mx-auto w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col md:w-3/4 container mx-auto w-full">
      {posts &&
        posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      {posts && <BottomBar />}
    </div>
  );
};
