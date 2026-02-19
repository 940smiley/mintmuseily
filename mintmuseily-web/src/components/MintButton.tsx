// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';

const contractAbi = [
  {
    name: 'mint',
    type: 'function',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isConnected } = useAccount();
  const { writeContract, error } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleMint = async () => {
    if (!isConnected) {
        alert('Please connect your wallet');
        return;
    }
    setIsLoading(true);
    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: 'mint',
        args: [BigInt(1)],
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={handleMint}
        disabled={isLoading}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {isLoading ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-1" role="alert">
          Error: {(error as any).shortMessage || error.message}
        </p>
      )}
    </div>
  );
}
