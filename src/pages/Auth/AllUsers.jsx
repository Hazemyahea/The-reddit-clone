import { Link } from "react-router-dom";
import { useGetAllUsers } from "../../QueryAndMutate";
import Loader from "../../components/iu/Loader";
import { formatDateToRelativeTime } from "../../helper/helperFn";
import { useState } from "react";
import { User } from "../../components/iu/User";

const AllUsers = () => {
  const { data: users, isError, isLoading } = useGetAllUsers();

  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {isLoading && <Loader />}
      {users && users.map((user) => <User key={user.id} user={user} />)}
    </div>
  );
};

export default AllUsers;
