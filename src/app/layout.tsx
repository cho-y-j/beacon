import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import './responsive.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: '박물관 비콘 앱',
  description: '박물관 방문객 및 관리자를 위한 비콘 기반 앱'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} antialiased h-full bg-gray-50`}>
        {children}
      </body>
    </html>
  )
}
