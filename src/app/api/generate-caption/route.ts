import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { imageUrl } = await req.json()

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 })
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: imageUrl, // must be a direct image URL (e.g., from Cloudinary)
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`)
    }

    const result = await response.json()
    const caption = result?.[0]?.generated_text ?? "No caption generated"

    return NextResponse.json({ caption })
  } catch (error) {
    console.error("Caption generation failed:", error)
    return NextResponse.json({ error: "Failed to generate caption" }, { status: 500 })
  }
}
