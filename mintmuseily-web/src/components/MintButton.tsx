// src/components/MintButton.tsx
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect } from 'react';
import { parseEther } from 'viem';

// This is a placeholder ABI for the MintMuseily contract.
const contractAbi = [
  {
    name: 'mint',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
] as const;

export default function MintButton() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!address) return;

    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      value: parseEther('0.1'),
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleMint}
        disabled={isPending || isConfirming || !address}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {isPending ? 'Confirming in Wallet...' : isConfirming ? 'Minting...' : isSuccess ? 'Minted!' : 'Mint NFT (0.1 ETH)'}
      </button>
      {error && <p className="text-red-500 text-sm">{(error as any).shortMessage || error.message}</p>}
    </div>
  );
}
