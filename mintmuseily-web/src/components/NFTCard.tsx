// src/components/NFTCard.tsx
import Image from 'next/image'
import React from 'react'

type NFTCardProps = {
  image: string
  title: string
}

function NFTCard({ image, title }: NFTCardProps) {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg shadow-md">
      <Image src={image} alt={title} width={200} height={200} className="rounded-lg" />
      <h2 className="text-white mt-2 text-center">{title}</h2>
    </div>
  )
}

/**
 * Memoize the NFTCard component to prevent unnecessary re-renders.
 */
export default React.memo(NFTCard)
