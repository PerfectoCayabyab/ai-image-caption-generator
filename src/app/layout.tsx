// src/app/layout.tsx
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'AI Image Caption Generator',
  description: 'Generate smart image captions using AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-blue-600">
              🧠 AI Captioner
            </Link>
            <div className="space-x-4 text-sm">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-blue-600 transition">
                Gallery
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        <footer className="bg-white shadow-inner py-4 text-center text-sm text-gray-500">
          Made with ❤️ by <span className="font-medium text-gray-700">Perfecto II Cayabyab</span>
        </footer>
      </body>
    </html>
  )
}
