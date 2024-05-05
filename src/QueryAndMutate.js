import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  CurrentUserApi,
  InserPosts,
  UserLogIn,
  getData,
  logout,
  signup,
  GetSinglePost,
  UpdateLikes,
  getuserbyID,
  inserComments,
  GetComments,
  getUserProfile,
  updateProfile,
  GetAllUsers,
  updateOnlineStatus,
} from "./api";
import { useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getData(),
    gcTime: 0,
  });

  // return useInfiniteQuery({
  //   queryKey: ["posts"],
  //   queryFn: getData,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, allPages) => {
  //     console.log(lastPage);
  //     // Check if there are no items in the last page
  //     if (lastPage.length == undefined) {
  //       return undefined; // Stop fetching if last page is empty
  //     }

  //     // Calculate next page param based on your pagination logic
  //     const nextPage = allPages.length * 5;
  //     return nextPage;
  //   },
  // });
}

export function useInsertPost(title, content, image) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content, image, user_id }) =>
      InserPosts({ title, content, image, user_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdateLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ post_id, likes }) => UpdateLikes({ post_id, likes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user_id, thedata }) => updateProfile({ user_id, thedata }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user_id, status }) =>
      updateOnlineStatus({ user_id, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUserLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ email, password }) => UserLogIn({ email, password }),
    onSuccess: (data) => {
      navigate("/");
    },
  });
}

export function useGetCurrentUser() {
  const {
    isLoading,
    data: user,
    fetchStatus,
  } = useQuery({
    queryFn: CurrentUserApi,
    queryKey: ["user"],
  });

  return {
    isLoading,
    user,
    isAuth: user?.user.role === "authenticated",
    fetchStatus,
  };
}

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user_id }) => logout({ user_id }),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login");
    },
  });
}

export function useSignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password, fullname }) =>
      signup({ email, password, fullname }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      navigate("/");
    },
  });
}

export function useGetPost(id) {
  return useQuery({
    queryKey: ["post"],
    queryFn: () => GetSinglePost(id),
    gcTime: 0,
  });
}

export function useGetuserbId(id) {
  //////////////
  /// Gc Time //////////////////////
  // I used Gc Time here Due to a very annoying software problem,
  // which is that the post details page redirects the saved cache,
  // which makes the last post you visited appear,
  //and seconds later the new post appears.
  //////////////////////////////////////////////////
  return useQuery({
    queryFn: () => getuserbyID(id),
    gcTime: 0,
    queryKey: ["singleUser"],
  });
}

export function userInserComments() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ content, user_id, post_id }) =>
      inserComments({ content, user_id, post_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}

export function useGetComment(id) {
  return useQuery({
    queryFn: () => GetComments(id),
    gcTime: 0,
    queryKey: ["comments"],
  });
}

export function useGetuserPofile(id) {
  return useQuery({
    queryFn: () => getUserProfile(id),
    gcTime: 0,
    queryKey: ["userProfile"],
  });
}

export function useGetAllUsers() {
  return useQuery({
    queryFn: GetAllUsers,
    queryKey: ["users"],
  });
}
