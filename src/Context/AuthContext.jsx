import { createContext, useEffect, useState } from "react";
import { useGetCurrentUser } from "../QueryAndMutate";

export const AuthContext = createContext({
  id: "",
  email: "",
  isAuth: () => {},
  login: () => {},
  user: {},
  setIsAuth: () => {},
  setUser: () => {},
  posts: 0,
  setPosts: () => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [userID, setUSerid] = useState("");
  const [posts, setPosts] = useState(0);
  let initValue = {
    id: userID,
    email: "",
    isAuth: isAuth,
    setIsAuth: setIsAuth,
    login: "",
    user: user,
    setIsAuth,
    setUser,
    posts,
    setPosts,
  };
  return (
    <AuthContext.Provider value={initValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
