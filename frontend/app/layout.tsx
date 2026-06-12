import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'السوق المفتوح - Open Souk Marketplace',
  description: 'منصة شراء وبيع إلكترونية متكاملة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-arabic bg-gray-50">
        {children}
      </body>
    </html>
  )
}
