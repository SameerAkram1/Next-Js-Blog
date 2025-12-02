"use client";

import { useState, useEffect } from "react";
import { useGetPostByIdQuery, useEditPostMutation } from "../../../../../redux/apiSlice";
import { useRouter } from "next/navigation";

export default function EditPost({ postId }) {
  const router = useRouter();

  const { data: post, isLoading } = useGetPostByIdQuery(postId, { skip: !postId });
  const [editPost] = useEditPostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  if (!postId || isLoading) return <p>Loading...</p>;

  const handleEdit = async () => {
    await editPost({ id: postId, title, body });
    router.push(`/posts/${postId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2 mb-4"
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border rounded p-2 mb-4 min-h-[120px]"
        placeholder="Body"
      />
      <button
        onClick={handleEdit}
        className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
      >
        Save Changes
      </button>
    </div>
  );
}
