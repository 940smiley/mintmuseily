// src/app/mint/layout.tsx
import { Web3Provider } from '@/components/Web3Provider'

export default function MintLayout({ children }: { children: React.ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>
}
