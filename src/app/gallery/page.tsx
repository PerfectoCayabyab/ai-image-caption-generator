import { connectDB } from '@/lib/mongodb'
import Caption from '@/models/Caption'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

type CaptionType = {
    _id: string
    imageUrl: string
    caption: string
    createdAt: string
  }

export default async function GalleryPage() {
  await connectDB()
  const captions = await Caption.find().sort({ createdAt: -1 })

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">🖼️ Caption Gallery</h1>

        {captions.length === 0 ? (
          <p className="text-center text-gray-500">No captions saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(captions as CaptionType[]).map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition"
              >
                <Image
                width={2000}
                height={2000}
                  src={item.imageUrl}
                  alt="Captioned"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-gray-900">Caption:</span>{' '}
                    {item.caption}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
