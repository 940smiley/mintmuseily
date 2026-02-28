// src/components/NFTCard.tsx
import Image from 'next/image'
import { memo } from 'react'

type NFTCardProps = {
  image: string
  title: string
}

/**
 * ⚡ Bolt Optimization:
 * NFTCard is a pure component that displays static data (image, title).
 * Wrapping it with React.memo prevents unnecessary re-renders when the
 * parent component (e.g., a list of NFTs) updates its state or re-renders
 * for reasons unrelated to this card's props.
 * Impact: Reduces total re-renders for large NFT lists, improving UI responsiveness.
 */
function NFTCard({ image, title }: NFTCardProps) {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg shadow-md">
      <Image src={image} alt={title} width={200} height={200} className="rounded-lg" />
      <h2 className="text-white mt-2 text-center">{title}</h2>
    </div>
  )
}

export default memo(NFTCard)
