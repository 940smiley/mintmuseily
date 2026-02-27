// src/components/MintButton.tsx
import { useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { writeContract } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setIsSuccess(false), 3000)
    }
  }, [isSuccess])

  const handleMint = async () => {
    setIsLoading(true);
    try {
      await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: [{
          name: 'mint',
          type: 'function',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        }] as const,
        functionName: 'mint',
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Minting failed', error);
    } finally {
      setIsLoading(false);
    }
  };

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
