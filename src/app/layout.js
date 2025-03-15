import './globals.css'
import './responsive.css'

export const metadata = {
  title: '박물관 AI 비콘 시스템',
  description: '비콘 기반 개인화된 박물관 관람 경험',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
