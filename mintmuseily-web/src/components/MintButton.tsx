// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';

const contractAbi = [
  {
    name: 'mint',
    type: 'function',
    inputs: [{ name: 'receiver', type: 'address' }],
    outputs: [],
    stateMutability: 'payable',
  },
] as const;

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
  }, [isSuccess]);

  const handleMint = async () => {
    setIsLoading(true);
    try {
      await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: 'mint',
        args: [address as `0x${string}`],
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
      disabled={isLoading}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {isLoading ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
    </button>
  );
}
