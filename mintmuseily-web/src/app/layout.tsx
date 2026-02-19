// src/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'MintMuseily',
  description: 'Unleash your creativity with MintMuseily',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
