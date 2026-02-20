// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export default function MintButton() {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const handleMint = async () => {
    if (!address) return;
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: [
        {
          name: 'mint',
          type: 'function',
          inputs: [{ name: 'amount', type: 'uint256' }],
          outputs: [],
          stateMutability: 'nonpayable',
        },
      ],
      functionName: 'mint',
      args: [BigInt(1)],
    });
  };

  return (
    <button
      onClick={handleMint}
      disabled={isPending}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {isPending ? 'Minting...' : 'Mint'}
    </button>
  );
}
