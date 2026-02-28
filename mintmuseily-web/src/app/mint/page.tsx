"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';
import SuccessModal from '@/components/SuccessModal';

// Dynamically load the ConnectButton component from RainbowKit
const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!contractAddress) {
  throw new Error('Contract address is not defined in environment variables.');
}

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

export default function MintPage() {
  const { address: walletAddress } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: hash, writeContract, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      setIsModalOpen(true);
    }
  }, [isConfirmed]);

  const handleMint = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Mint Museily</h1>
      <ConnectButton />
      {walletAddress ? (
        <div className="mt-8 flex flex-col items-center gap-4 bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm w-full max-w-md">
          <div className="w-full">
            <label htmlFor="mintAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Number of NFTs to Mint
            </label>
            <input
              id="mintAmount"
              type="number"
              value={mintAmount}
              min={1}
              onChange={(e) => setMintAmount(Number(e.target.value))}
              disabled={isPending || isConfirming}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 outline-none transition"
              aria-describedby={error ? "mint-error" : undefined}
            />
          </div>
          <button
            onClick={handleMint}
            disabled={isPending || isConfirming}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending || isConfirming ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                {isPending ? 'Requesting Approval...' : 'Confirming Transaction...'}
              </>
            ) : (
              'Mint'
            )}
          </button>
          {error && (
            <p id="mint-error" role="alert" className="text-red-500 text-sm mt-2">
              Error: {(error as any).shortMessage || 'An unexpected error occurred.'}
            </p>
          )}
        </div>
      ) : (
        <p className="mt-8 text-gray-600">Please connect your wallet to mint.</p>
      )}

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
