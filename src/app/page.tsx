"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setCaption(null);
    }
  };

  const handleGenerateCaption = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    // Upload to Cloudinary
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploaded = await uploadRes.json();
    const imageUrl = uploaded.secure_url;

    // Generate caption via Hugging Face
    const res = await fetch("/api/generate-caption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await res.json();
    setCaption(data.caption);

    // Save to DB
    await fetch("/api/save-caption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl, caption: data.caption }),
    });

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">
          🧠 AI Image Caption Generator
        </h1>
        <p className="text-gray-500 mb-4">
          Generate smart captions for your images using free AI
        </p>
        

  

        <div className="mb-4">
          <label
            htmlFor="image-upload"
            className="cursor-pointer inline-block bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50"
          >
            📁 Choose Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {image && <p className="text-sm text-gray-500 mt-1">{image.name}</p>}
        </div>

        

        {imageUrl && (
          <Image
          width={2000}
          height={2000}
            src={imageUrl}
            alt="Preview"
            className="mx-auto mb-4 rounded-lg border shadow max-h-80 object-contain"
          />
        )}

        <button
          onClick={handleGenerateCaption}
          disabled={!image || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Caption"}
        </button>
        
        <div className="flex items-center justify-center gap-2 w-full">

        {caption && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4 border text-left">
            <p className="text-sm text-gray-600 mb-1 font-semibold">Caption:</p>
            <p className="text-base text-gray-800">{caption}</p>
          </div>
        )}

        <Link
          href="/gallery"
          className="mt-6 inline-block text-sm text-blue-600 hover:underline"
        >
          View Caption Gallery →
        </Link>

        </div>


      </div>
    </main>
  );
}
