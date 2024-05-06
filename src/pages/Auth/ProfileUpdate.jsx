import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import { useUpdateProfile } from "../../QueryAndMutate";
import { Bounce, ToastContainer, toast } from "react-toastify";

const ProfileUpdate = () => {
  const { user } = useContext(AuthContext);

  const { mutate: updateProfile, error, isSuccess } = useUpdateProfile();
  const [avatar, setAvatar] = useState(user?.user.user_metadata.avatar);
  let aa = "/images/profile3.png";
  const notify = () => {
    toast("🦄 the profile is updated!", {
      position: "top-left",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const notifyImage = () => {
    toast("it's Great Avatar ! ", {
      position: "top-left",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  function ChosseAvatar(number) {
    setAvatar(`/images/profile${number}.png`);
  }

  const onSubmit = (data) => {
    let thedata = {
      ...data,
      avatar: avatar,
    };
    updateProfile({ user_id: user.user.id, thedata });
    notify();
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-4 md:p-3 gap-5  md:mx-auto md:w-2/4 my-10 md:my-20 border-slate-100"
        >
          <div>
            <h2 className=" text-3xl font-bold">edite profile</h2>
          </div>
          <input
            defaultValue={user?.user.user_metadata.fullname}
            {...register("fullname", {
              required: "fullname Address is required",
            })}
            aria-invalid={errors.fullname ? "true" : "false"}
            type="text"
            className=" border-blue-400 border p-3 rounded-md text-black"
            placeholder="write new Fullname"
          />
          {errors.fullname && (
            <p
              className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
              role="alert"
            >
              {errors?.fullname.message}
            </p>
          )}
          <textarea
            {...register("About", {})}
            defaultValue={user?.user.user_metadata.About}
            type="text"
            className=" border-blue-400 border p-3 rounded-md text-black"
            placeholder="A brief description of yourself shown on your profile. (it's optional)"
          />

          <div>
            <label className=" text-xl">Choose Avatar</label>
            <ul className="flex gap-2 cursor-pointer mt-2">
              {[2, 3, 4, 5].map((number) => (
                <li>
                  <img
                    src={`/images/profile${number}.png`}
                    alt="profile2"
                    srcset=""
                    onClick={() => ChosseAvatar(number)}
                    className={` hover:scale-125 transition`}
                  />
                </li>
              ))}
            </ul>
            <input
              defaultValue={avatar}
              {...register("avatar", {})}
              type="text"
              className=" border-blue-400 border p-3 rounded-md text-black hidden"
            />
          </div>

          {/* <input
          {...register("email", {
            required: "Email Address is required",
          })}
          aria-invalid={errors.email ? "true" : "false"}
          type="email"
          className=" border-blue-400 border p-3 rounded-md text-black"
          placeholder="write your email"
        />
        {errors.email && (
          <p
            className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
            role="alert"
          >
            {errors.email.message}
          </p>
        )} */}

          {/* <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Please write password more than 6 char",
            },
          })}
          type="password"
          className=" border-blue-400  border p-3 rounded-md text-black"
          placeholder="write your password"
        />
        {errors.password && (
          <span
            className=" text-white p-3 rounded-md text-lg font-bold bg-red-600"
            role="alert"
          >
            {errors.password.message}
          </span>
        )} */}

          {/* <input
          {...register("file", {
            required: "file is required",
            minLength: {
              value: 6,
              message: "Please write password more than 6 char",
            },
          })}
          type="file"
          className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="write your file"
        />
        {errors.file && (
          <span
            className=" text-white p-3 rounded-md text-lg font-bold bg-red-600"
            role="alert"
          >
            {errors.file.message}
          </span>
        )} */}
          <input
            type="submit"
            className=" bg-orange-600 border-red-400 border p-3 cursor-pointer hover:bg-orange-700 text-lg font-semibold rounded-md"
          />
        </form>
      </div>
    </>
  );
};

export default ProfileUpdate;
