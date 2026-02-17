// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';

export default function MintButton() {
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleMint = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: [
        {
          name: 'mint',
          type: 'function',
          inputs: [
            {
              name: 'to',
              type: 'address',
            },
          ],
          outputs: [],
          stateMutability: 'payable',
        },
      ], // Your contract ABI
      functionName: 'mint',
      args: [address],
      value: parseEther('0.1'),
    });
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