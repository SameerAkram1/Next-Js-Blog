"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGetPostsQuery, useDeletePostMutation } from "../../redux/apiSlice";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // WAIT for session to load

    if (!session) {
      router.replace("/login");
    }
  }, [session, status, router]);

  const { data: posts, isLoading: postsLoading } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (postId) => {
    console.log("Deleting post with ID:", postId);
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
    }
  };

  if (postsLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <Link
          href="/createpost"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Post
        </Link>
      </div>

      <div className="space-y-4">
        {posts?.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg border p-4 border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <Link
                  href={`/posts/${post._id}`}
                  className="text-xl font-semibold text-gray-800 hover:text-blue-600"
                >
                  {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  By: {post.author?.name || "Unknown"}
                </p>
              </div>

              {session?.user?.id === post.author?._id && (
                <div className="flex">
                  <Link
                    href={`/posts/edit/${post._id}`}
                    className="bg-yellow-400 text-white px-3 py-1 mx-2 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </Link>

                  <div>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 text-white px-3 py-1 mx-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-gray-700 mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
