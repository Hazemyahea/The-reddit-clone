import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { GetUserPostsInProfile } from "../../api";
import { useGetuserPofile } from "../../QueryAndMutate";
import Loader from "../../components/iu/Loader";
const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPost] = useState([]);
  const [userdata, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    data: userProfile,
    error,
    isLoading,
  } = useGetuserPofile(user?.user.id);
  useEffect(() => {
    async function GetUserPosts() {
      setLoading(true);
      const data = await GetUserPostsInProfile(user?.user.id);
      setPost(data);
      setLoading(false);
    }
    GetUserPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col md:w-3/4 container mx-auto w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full mx-4 md:w-3/4">
      <div className=" flex justify-between border-b border-[#3C4345]">
        <div className="p-5 flex gap-3 items-center">
          <img
            src={
              user?.user.user_metadata.avatar
                ? user?.user.user_metadata.avatar
                : "/images/profile.png"
            }
            alt="profile picture"
            width={80}
            className=" bg-slate-500 rounded-lg shadow-lg shadow-black"
          />
          <div>
            <div className=" flex gap-2 items-center">
              <h3 className="text-2xl font-bold">{userProfile[0]?.fullname}</h3>
              <p>
                {userProfile[0]?.status ? (
                  <div className=" w-3 h-3 bg-green-500 rounded-full"></div>
                ) : (
                  <div className=" w-3 h-3 bg-slate-400 rounded-full"></div>
                )}
              </p>
            </div>
            <p className="font-semibold text-slate-400">
              {`u/${userProfile && userProfile[0]?.fullname}123`}{" "}
            </p>
            <p className=" font-mono mt-2">
              {userProfile && userProfile[0]?.About}
            </p>
          </div>
        </div>
        {userProfile && user?.user.id === userProfile[0]?.id && (
          <Link
            to="/updateProfile"
            className=" flex flex-col justify-center items-center gap-1"
          >
            <span className="material-symbols-outlined">edit</span>
            <p>Edit</p>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        {posts.map((post) => {
          return (
            <Link to={`/post/${post.id}`}>
              <div
                className="flex flex-col gap-2 border-b border-[#3C4345] p-3"
                key={post.id}
              >
                <h3 className=" text-2xl font-semibold">{post.title}</h3>
                <p className=" font-thin">{post.content}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyProfile;
