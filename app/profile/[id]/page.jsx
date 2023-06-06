"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

export default function UserProfile({ params }) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/user/${params.id}/posts`);
      const data = await res.json();

      setPosts(data);
    }
    if (session?.user.id) fetchPost();
  }, []);

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }

  async function handleDelete(post) {
    const hasConfirmed = confirm("Sure wanna delete?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return <Profile name={username} desc="welcome to profile" data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />;
}
