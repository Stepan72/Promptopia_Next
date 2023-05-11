"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [showPost, setShowPosts] = useState([]);

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  function tagHandlerFun(tag) {
    // console.log(tag);
    setSearchText(tag);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setShowPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filteredPosts = posts.filter((post) => {
      return (
        post.userName.includes(searchText) ||
        post.prompt.includes(searchText) ||
        post.tag.includes(searchText)
      );
    });
    // console.log(filteredPosts);

    if (searchText.length > 0) {
      setShowPosts(filteredPosts);
    } else {
      setShowPosts(posts);
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={showPost} handleTagClick={tagHandlerFun} />
      {!showPost.length && <p>No Posts Found!</p>}
    </section>
  );
};

export default Feed;
