import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HomieHub - ファミリーハブシステム',
  description: '家族の情報を一元管理し、コミュニケーションを円滑にする統合プラットフォーム',
  keywords: 'family,hub,schedule,todo,health,家族,スケジュール,健康管理',
  authors: [{ name: 'HomieHub Team' }],
  openGraph: {
    title: 'HomieHub - ファミリーハブシステム',
    description: '家族の情報を一元管理し、コミュニケーションを円滑にする統合プラットフォーム',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-blue-600">HomieHub</h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                    ダッシュボード
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                    スケジュール
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                    ToDo
                  </a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                    メッセージ
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-gray-100 border-t border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-600">
                © 2024 HomieHub. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}