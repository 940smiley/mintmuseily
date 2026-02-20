// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

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
            inputs: [{ name: 'amount', type: 'uint256' }],
            outputs: [],
            stateMutability: 'nonpayable',
          },
        ],
        functionName: 'mint',
        args: [BigInt(1)],
      });
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
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition active:scale-95 disabled:opacity-50"
    >
      {isLoading ? 'Minting...' : 'Mint NFT'}
    </button>
  );
}
