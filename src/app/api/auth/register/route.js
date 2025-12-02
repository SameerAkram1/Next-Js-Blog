import dbConnect from "../../../../../lib/mongoose";
import User from "../../../../../lib/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) return new Response("User already exists", { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  return new Response(JSON.stringify({ message: "User registered", userId: user._id }), { status: 201 });
}
