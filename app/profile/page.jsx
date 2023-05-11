"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Profile } from "@components";

function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  function editHandler(post) {
    // console.log("Edit");
    // console.log(post);
    router.push(`/update-prompt?id=${post._id}`);
  }

  async function deleteHandler(post) {
    // console.log("delete");
    // console.log(post._id);
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const deleteResponse = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        console.log(deleteResponse);

        const filteredPosts = posts.filter((p) => {
          return p._id !== post._id;
        });

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
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
