import dbConnect from "../../../../lib/mongoose";
import Post from "../../../../lib/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/post error:", error);
    return NextResponse.json({ error: "Failed to fetch posts", details: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { title, body, authorId } = await req.json();
    
    console.log('Received data:', { title, body, authorId }); // Debug received data

    if (!title || !body) {
      return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
    }

    const postData = { title, body };
    if (authorId) {
      postData.author = authorId;
      console.log('Setting author:', authorId);
    } else {
      console.log('No authorId provided');
    }
    
    console.log('Creating post with data:', postData);
    const newPost = await Post.create(postData);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("POST /api/post error:", error);
    return NextResponse.json({ error: "Failed to create post", details: error.message }, { status: 500 });
  }
}
