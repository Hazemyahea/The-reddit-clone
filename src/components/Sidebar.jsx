import { Link } from "react-router-dom";
import { useLogOut } from "../QueryAndMutate";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { mutate: logout, isPending } = useLogOut();
  return (
    <div className="hidden md:block p-5 border-r border-[#3C4345] flex flex-col gap-5 w-1/4 h-screen sticky top-10 overflow-y-auto">
      <ul className="flex flex-col gap-5">
        <li>
          <Link
            to="/"
            className=" flex items-center text-lg gap-2 hover:bg-custom-dark p-3 rounded-md"
          >
            <span className="material-symbols-outlined">home</span>
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/allusers"
            className=" flex items-center text-lg gap-2 hover:bg-custom-dark p-3 rounded-md"
          >
            <span class="material-symbols-outlined">group</span>
            All Users
          </Link>
        </li>

        <li>
          <Link
            to="/create"
            className=" flex items-center text-lg gap-2 hover:bg-custom-dark p-3 rounded-md"
          >
            <span className="material-symbols-outlined">edit_square</span>
            Create Post
          </Link>
        </li>
        <li>
          <Link
            className=" flex items-center text-lg gap-2 hover:bg-custom-dark p-3 rounded-md"
            onClick={() => logout({ user_id: user?.user.id })}
          >
            <span className="material-symbols-outlined">logout</span>
            logout
          </Link>
        </li>
      </ul>
    </div>
  );
};
