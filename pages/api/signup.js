import { connectToDB } from "lib/mongodb";
import User from "models/UserModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  console.log("Enter api/user");
  try {
    await connectToDB().catch((err) => res.json(err));
    const { name, email, password } = req.body;
    console.log("REQ data", name, email, password);

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "Name, email, and password are required fields.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User with this email already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      return NextResponse.json({
        success: true,
        message: "User registered successfully.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to register the user. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}
