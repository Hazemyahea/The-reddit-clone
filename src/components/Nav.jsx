import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useLogOut } from "../QueryAndMutate";

const Nav = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-[#0B1416] text-white px-4 py-2 shadow-sm shadow-[#3C4345]">
      <Link to="/">
        <div className="flex items-center">
          <img
            src="/images/redditlogo.jpg"
            width={70}
            className=" bg-slate-500 rounded-md"
            alt=""
          />
          <p className=" ml-2 font-black text-3xl">reddit</p>
        </div>
      </Link>
      <div className="flex items-center space-x-2">
        <Link to={`/myprofile`}>
          {user && (
            <div className="flex items-center">
              <img
                src={user?.user.user_metadata.avatar || "/images/profile.png"}
                alt="profile picture"
                width={30}
                className="rounded-full ml-4"
              />
              <p className="text-white ml-2">
                {user?.user.user_metadata.fullname}
              </p>
            </div>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
