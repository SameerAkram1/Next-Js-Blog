import dbConnect from "../../../../../../lib/mongoose";
import Post from "../../../../../../lib/models/Post";
import Comment from "../../../../../../lib/models/Comment";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await dbConnect();
    const { id: postId } = await params;
    const { body, authorId } = await req.json();

    if (!body) {
      return NextResponse.json({ error: "Body is required" }, { status: 400 });
    }

    // Create new comment document
    const commentData = { body, post: postId };
    if (authorId) commentData.author = authorId;
    
    const newComment = await Comment.create(commentData);
    
    // Add comment reference to post
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("POST /api/post/[id]/comments error:", error);
    return NextResponse.json({ error: "Failed to create comment", details: error.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id: postId } = await params;
    
    const comments = await Comment.find({ post: postId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/post/[id]/comments error:", error);
    return NextResponse.json({ error: "Failed to fetch comments", details: error.message }, { status: 500 });
  }
}