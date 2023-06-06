"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

export default function EditPrompt() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    console.log("asd", promptId);
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  async function updatePrompt(e) {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt id not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push(`/`);
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  }

  return <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />;
}
