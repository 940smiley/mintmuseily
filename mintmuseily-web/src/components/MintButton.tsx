// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';
import { parseEther } from 'viem';

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const handleMint = async () => {
    setIsLoading(true);
    try {
      await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: [], // Your contract ABI
        functionName: 'mint',
        args: [address],
        value: parseEther('0.1'),
      });
    } catch (err) {
      console.error(err);
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
      {isLoading ? 'Minting...' : 'Mint'}
    </button>
  );
}
