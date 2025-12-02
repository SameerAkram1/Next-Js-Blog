"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  useGetPostByIdQuery,
  useAddCommentMutation,
  useGetCommentsQuery,
} from "../../../../redux/apiSlice";
import AddComment from "@/app/_component/AddComment";
import ShowComments from "@/app/_component/ShowComments";

export default function PostDetails({ params }) {
  const { data: session } = useSession();
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  const { data: post, isLoading } = useGetPostByIdQuery(postId, {
    skip: !postId,
  });
  const { data: comments, isLoading: commentsLoading } = useGetCommentsQuery(
    postId,
    { skip: !postId }
  );

  const [showComments, setShowComments] = useState(false);
  const [commentBody, setCommentBody] = useState("");

  const [addComment] = useAddCommentMutation();

  if (!postId || isLoading) return <p>Loading...</p>;

  const handleAddComment = async () => {
    if (!commentBody) return alert("Please enter a comment");

    const commentData = { body: commentBody };
    if (session?.user?.id) commentData.authorId = session.user.id;

    await addComment({
      postId,
      comment: commentData,
    });

    setCommentBody("");
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ddd", marginTop: 20 }}>
      <h2 className="font-bold text-3xl mb-2">{post?.title}</h2>
      <p className="text-sm text-gray-500 mb-3">By: {post?.author?.name || 'Unknown'}</p>
      <p className="text-gray-600 text-lg leading-7">{post?.body}</p>

      {/* Show/Hide Comments Button */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="mt-3 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition duration-200"
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div style={{ marginTop: 20 }}>
          <h3 className="mt-3 px-4 py-2  bg-gray-100  text-black rounded-lg shadow hover:bg-gray-200">
            Add New Comments
          </h3>

          {showComments && (
            <div style={{ marginTop: 20 }}>
              <AddComment
                commentBody={commentBody}
                setCommentBody={setCommentBody}
                handleAddComment={handleAddComment}
              />

              <ShowComments comments={comments} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
