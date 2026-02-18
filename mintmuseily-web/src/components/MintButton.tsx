// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';

const MINT_ABI = [
  {
    name: 'mint',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
    stateMutability: 'payable',
  },
] as const;

export default function MintButton() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { address, chain } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleMint = async () => {
    if (!address) return;

    try {
      await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: MINT_ABI,
        functionName: 'mint',
        args: [BigInt(1)],
        value: parseEther('0.1'),
        account: address,
        chain: chain,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={isPending || !address}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {isPending ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
    </button>
  );
}
