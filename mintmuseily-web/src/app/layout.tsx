import '@/styles/globals.css'

export const metadata = {
  title: 'MintMuseily',
  description: 'Mint your Museily NFTs',
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
