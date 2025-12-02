"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCreatePostMutation } from "../../../redux/apiSlice";

export default function CreatePostForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // RTK Query mutation hook
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;

    try {
      console.log('Session:', session); // Debug session
      const postData = { title, body };
      if (session?.user?.id) {
        postData.authorId = session.user.id;
        console.log('Adding authorId:', session.user.id);
      } else {
        console.log('No user ID in session');
      }
      console.log('Sending postData:', postData);
      
      await createPost(postData).unwrap(); 
      setTitle("");
      setBody("");
      router.push("/"); 
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };



  return (
    <div className="max-w-2xl mx-auto my-10">
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <p><strong>Session Status:</strong> {session ? 'Logged In' : 'Not Logged In'}</p>
        {session && (
          <div>
            <p><strong>User:</strong> {session.user?.name}</p>
            <p><strong>Email:</strong> {session.user?.email}</p>
            <p><strong>User ID:</strong> {session.user?.id || 'No ID'}</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Creating..." : "Create Post"}
      </button>
      </form>
    </div>
  );
}
