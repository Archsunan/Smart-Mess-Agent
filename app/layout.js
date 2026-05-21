import './globals.css'

export const metadata = {
  title: 'MessMate AI - Smart Mess Decision Agent',
  description: 'AI-powered mess recommendation system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
