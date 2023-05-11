"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Profile } from "@components";

function OtherProfile() {
  const [posts, setPosts] = useState([]);
  const pathName = usePathname();
  const postUserId = pathName.slice(9, pathName.length).replace("%20", " ");
  //   console.log(pathName);
  //   console.log(postUserId);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${postUserId}/posts`);
      //   console.log(response);
      const data = await response.json();
      //   console.log(data);

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Profile
      name="Other"
      desc="Welcome personalized profile page"
      data={posts}
    />
  );
}

export default OtherProfile;
