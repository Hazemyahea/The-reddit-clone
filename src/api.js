import { comment } from "postcss";
import { supabase } from "./config/supabasConfig";
import { createContext, useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { data } from "autoprefixer";

export async function getData() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
  *,
  profiles ( id,fullname,avatar,status )
  ,
  comments (id)
`,
        { count: "exact" }
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function InserPosts({ title, content, image, user_id }) {
  const imageName = `${Math.random()}${image.name}`.replaceAll("/", "");
  const imagePath = `${
    import.meta.env.VITE_API_URL
  }/storage/v1/object/public/posts/${imageName}`;
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, image: imagePath, user_id }])
    .select();

  if (error) {
    throw new Error("Cant Add post");
  }

  const { error: storageError } = await supabase.storage
    .from("posts")
    .upload(imageName, image);

  if (storageError) {
    await supabase.from("posts").delete().eq("id", data.id);
    throw new Error("post can not be created");
    console.log(storageError);
  }
  return data;
}

/// sing In

export async function UserLogIn({ email, password }) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data) {
      const { data: user, error } = await supabase
        .from("profiles")
        .update({ status: true })
        .eq("id", data.user.id)
        .select("*");
      const { data: updatedAuth, error: AuthErro } =
        await supabase.auth.updateUser({
          data: { status: true },
        });
    }
    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error();
  }
}

// Current User

export async function CurrentUserApi() {
  try {
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();
    if (!session.session) {
      return null;
    }
    const { data: user, error } = await supabase.auth.getUser();
    if (error) {
      throw error; // Re-throw the error for proper handling
    }
    return user; // Directly return the user object
  } catch (error) {
    console.error("Error fetching current user:", error);
    // Handle the error appropriately, e.g., return a default user object or throw a custom error
  }
}

export async function logout({ user_id }) {
  try {
    const { data: user } = await supabase
      .from("profiles")
      .update({ status: false })
      .eq("id", user_id)
      .select("*");

    const { data: updatedAuth, error: AuthErro } =
      await supabase.auth.updateUser({
        data: { status: false },
      });

    let { error, data } = await supabase.auth.signOut();
  } catch (error) {
    console.error("Error fetching current user:", error);
    // Handle the error appropriately, e.g., return a default user object or throw a custom error
  }
}

export async function signup({ email, password, fullname }) {
  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullname,
          avatar: "/images/profile.png",
          status: true,
          About: "",
        },
      },
    });

    if (data) {
      const { data: user, error: usererror } = await supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id,
            fullname: data.user.user_metadata.fullname,
            status: true,
          },
        ])
        .select();
      if (usererror) {
        console.log(usererror);
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    // Handle the error appropriately, e.g., return a default user object or throw a custom error
  }
}

export async function GetSinglePost(id) {
  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select(
        `
  *, 
  comments ( id, content )
`
      )
      .eq("id", id);

    console.log(post);

    if (post) {
      let { data: profiles, error: usererr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", post[0].user_id);
      return { post, profiles }; // Return the first post matching the ID
    }

    if (error) {
      throw new Error("Error fetching post: " + error.message); // Provide informative error handling
    }
    return post;
  } catch (error) {
    console.error("Error fetching post:", error); // Log errors for debugging
    throw error; // Re-throw the error for proper handling in useGetPost
  }
}

export async function getUserProfile(id) {
  try {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select(`*, posts (id,title,content)`)
      .eq("id", id);
    console.log(profiles);
    if (error) {
      console.log(error);
    }
    return profiles;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function GetUserPostsInProfile(id) {
  try {
    let { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", id)
      .range(0, 3);

    if (error) {
      throw new Error("Error fetching posts: " + error.message); // Provide informative error handling
    }

    return data; // Return the first post matching the ID
  } catch (error) {
    throw error; // Re-throw the error for proper handling in useGetPost
  }
}

export async function UpdateLikes({ post_id, likes }) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ likes })
      .eq("id", post_id)
      .select("*");

    if (error) {
      throw new Error("Error fetching posts: " + error.message); // Provide informative error handling
      console.log(error);
    }

    return data; // Return the first post matching the ID
  } catch (error) {
    throw error; // Re-throw the error for proper handling in useGetPost
  }
}

export async function updateOnlineStatus({ user_id, status }) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ status: status })
      .eq("id", user_id)
      .select("*");

    const { data: updatedAuth, error: AuthErro } =
      await supabase.auth.updateUser({
        data: { status: status },
      });

    if (AuthErro) {
      throw new Error("Error fetching posts: " + AuthErro.message); // Provide informative error handling
      console.log(AuthErro);
    }
  } catch (error) {
    throw new Error("Error fetching posts: " + AuthErro.message); // Provide informative error handling
  }
}

export async function updateProfile({ user_id, thedata }) {
  console.log(thedata.fullname);
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(thedata)
      .eq("id", user_id)
      .select("*");

    const { data: updatedAuth, error: AuthErro } =
      await supabase.auth.updateUser({
        data: {
          fullname: thedata.fullname,
          avatar: thedata.avatar,
          About: thedata.About,
        },
      });

    if (AuthErro) {
      throw new Error("Error fetching posts: " + AuthErro.message); // Provide informative error handling
      console.log(AuthErro);
    }

    return data; // Return the first post matching the ID
  } catch (error) {
    throw error; // Re-throw the error for proper handling in useGetPost
  }
}

export async function getuserbyID(id) {
  try {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id);
    return profiles;
  } catch (error) {
    console.log(error);
  }
}

export async function inserComments({ content, user_id, post_id }) {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ content, user_id, post_id }])
      .select();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function GetComments(id) {
  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select(
        `
  *,
  profiles ( fullname ,avatar )
`
      )
      .eq("post_id", id)
      .order("created_at", { ascending: false });

    console.log(comments);
    return comments;
  } catch (error) {
    console.log(error);
  }
}

export async function GetAllUsers() {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(`*,posts(likes)`)
      .order("created_at", { ascending: false });

    if (error) {
      return;
    }
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
