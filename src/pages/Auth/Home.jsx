import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { useGetPosts } from "../../QueryAndMutate";
import Form from "../../Form";
import { AuthContext } from "../../Context/AuthContext";
import { Sidebar } from "../../components/Sidebar";
import { Posts } from "../../components/Posts";
import BottomBar from "../../components/BottomBar";

export const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Posts />
    </>
  );
};
