"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
}

export default function Feed() {
  const [searchText, setSearchText] = useState("");

  const [post, setPost] = useState([]);

  function handleSearchChange(e) {}

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPost(data);
    }
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or user" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>
      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
}
