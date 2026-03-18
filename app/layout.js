import './globals.css'

export const metadata = {
  title: 'Proofly - Stop Falling for Internet BS',
  description: 'Check influencer claims, health advice, and money gurus. Built for TikTok and Instagram.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Proofly'
  },
  themeColor: '#0f172a'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="overscroll-none">{children}</body>
    </html>
  )
}