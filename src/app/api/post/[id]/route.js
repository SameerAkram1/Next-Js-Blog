import dbConnect from "../../../../../lib/mongoose";
import Post from "../../../../../lib/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; 

    const post = await Post.findById(id)
      .populate('author', 'name email')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name email'
        }
      });
      
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}







export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; 

    const { title, body } = await req.json();

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// ✅ DELETE POST
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; 

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}