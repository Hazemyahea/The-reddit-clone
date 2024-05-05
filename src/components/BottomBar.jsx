import { Link } from "react-router-dom";
import { useLogOut } from "../QueryAndMutate";
import { useEffect, useRef, useState } from "react";

const BottomBar = () => {
  const { mutate: logout } = useLogOut();

  return (
    <div className={` sticky w-full md:hidden  bottom-0 bg-custom-dark`}>
      <ul className="flex  w-full justify-around items-center ">
        <li className="">
          <Link
            to="/create"
            className=" text-sm flex items-center  gap-2 hover:bg-custom-dark p-3 rounded-md"
          >
            <span className="material-symbols-outlined">edit_square</span>
            Create Post
          </Link>
        </li>
        <li>
          <Link
            to="/allusers"
            className=" flex items-center text-sm gap-2 hover:bg-custom-dark p-3 rounded-md"
          >
            <span class="material-symbols-outlined">group</span>
            All Users
          </Link>
        </li>
        <li>
          <Link
            className=" flex items-center text-sm gap-2 hover:bg-custom-dark p-3 rounded-md"
            onClick={logout}
          >
            <span className="material-symbols-outlined">logout</span>
            logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomBar;
