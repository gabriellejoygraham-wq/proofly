import './globals.css'

export const metadata = {
  title: 'Proofly - Credibility Analysis',
  description: 'Instant credibility check for any claim',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}