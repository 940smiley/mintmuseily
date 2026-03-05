// src/components/MintButton.tsx
import { useWriteContract } from 'wagmi';
import { useEffect, useState, useCallback } from 'react';

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { writeContract } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleMint = useCallback(async () => {
    setIsLoading(true);
    try {
      await writeContract({
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
      setIsSuccess(true);
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [writeContract]);

  return (
    <button
      onClick={handleMint}
      disabled={isLoading}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {isLoading ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
    </button>
  );
}
