"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Profile } from "@components";

function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  async function editHandler(post) {
    console.log("Edit");
    console.log(post);
    const editPostResponse = await fetch(`/api/prompt/${post._id}/`, {
      method: "PATCH",
      body: JSON.stringify({
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag,
        userImg: session?.user.image,
        userName: session?.user.name,
        email: session?.user.email,
      }),
    });
    console.log(editPostResponse);
    const data = await editPostResponse.json();
    console.log(data);
  }

  async function deleteHandler() {
    console.log("delete");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      //   console.log(session?.user);
      /// Это учебный запрос, а я заменил на юзернейм
      //   const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const response = await fetch(`/api/users/${session?.user.name}/posts`);
      const data = await response.json();
      console.log(data);
      if (session?.user.name) {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={editHandler}
      handleDelete={deleteHandler}
    />
  );
}

export default MyProfile;
