// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess])

  const handleMint = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'mint',
            type: 'function',
            stateMutability: 'payable',
            inputs: [{ name: 'to', type: 'address' }],
            outputs: [],
          },
        ],
        functionName: 'mint',
        args: [address],
        value: parseEther('0.1'),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={isLoading || !address}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={isLoading ? 'Minting NFT...' : 'Mint NFT'}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Minting...
        </span>
      ) : isSuccess ? 'Success!' : 'Mint NFT'}
    </button>
  );
}
