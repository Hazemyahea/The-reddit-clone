import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser, useUpdateStatus } from "../../QueryAndMutate";
import Loader from "../../components/iu/Loader";
import Nav from "../../components/Nav";
import BottomBar from "../../components/BottomBar";

const Auth = () => {
  const { isLoading, user, isAuth, fetchStatus } = useGetCurrentUser();
  const { mutate: UpdateStatus } = useUpdateStatus();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !isLoading && fetchStatus !== "fetching") {
      navigate("/login");
    }
    setUser(user);
    console.log("from Au");
  }, [isAuth, isLoading, user]);

  if (isLoading) {
    return <Loader />;
  }

  if (isAuth) {
    return (
      <>
        <Nav />

        <div className="flex justify-between container mx-auto gap-5 ">
          <Sidebar />
          <Outlet />
        </div>
      </>
    );
  }
};

export default Auth;
