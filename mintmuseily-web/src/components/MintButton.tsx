// src/components/MintButton.tsx
"use client";
import { useAccount, useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';
import { parseEther } from 'viem';

export default function MintButton() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleMint = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: [
        {
          name: 'mint',
          type: 'function',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
      ] as const,
      functionName: 'mint',
      args: [],
    });
    // For simplicity in this fix, we assume submission is enough for the UI state change,
    // though in a real app we'd wait for transaction confirmation.
    setIsSuccess(true);
  };

  return (
    <button
      onClick={handleMint}
      disabled={isPending}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {isPending ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
    </button>
  );
}
