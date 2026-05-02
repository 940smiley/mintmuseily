"use client";

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import SuccessModal from '@/components/SuccessModal';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!contractAddress && typeof window !== 'undefined') {
  console.warn('Contract address is not defined in environment variables.');
}

// Optimized ABI including both single and batch mint functions
const contractAbi = [
  {
    name: 'mint',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    name: 'mint',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export default function MintPage() {
  const { address: walletAddress } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      setIsModalOpen(true);
    }
  }, [isConfirmed]);

  const handleMint = () => {
    // Client-side validation
    if (mintAmount < 1 || mintAmount > 10 || !Number.isInteger(mintAmount)) {
      return;
    }

    if (mintAmount === 1) {
      // Use the hyper-optimized single mint fast-path
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: 'mint',
      });
    } else {
      // Use the batch mint function for multiple NFTs
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: 'mint',
        args: [BigInt(mintAmount)],
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Mint Museily</h1>
        <div className="mb-8 flex justify-center">
          <ConnectButton />
        </div>

        {walletAddress ? (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="mintAmount" className="text-sm font-medium text-gray-700 mb-1">
                Amount to Mint (1-10)
              </label>
              <input
                id="mintAmount"
                type="number"
                value={mintAmount}
                min={1}
                max={10}
                onChange={(e) => setMintAmount(Number(e.target.value))}
                disabled={isPending || isConfirming}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none disabled:bg-gray-100 text-gray-900"
              />
            </div>

            <button
              onClick={handleMint}
              disabled={isPending || isConfirming || mintAmount < 1 || mintAmount > 10 || !Number.isInteger(mintAmount)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? 'Requesting...' : isConfirming ? 'Confirming...' : 'Mint'}
            </button>

            {error && (
              <p className="text-red-600 text-sm mt-2" role="alert">
                Error: {(error as { shortMessage?: string }).shortMessage || 'An unexpected error occurred.'}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600 text-center">Please connect your wallet to mint.</p>
        )}
      </div>

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
