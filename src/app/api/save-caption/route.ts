// src/app/api/save-caption/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Caption from "@/models/Caption";

export async function POST(req: Request) {
  await connectDB();
  const { imageUrl, caption } = await req.json();
  const newCaption = await Caption.create({ imageUrl, caption });
  return NextResponse.json(newCaption);
}
