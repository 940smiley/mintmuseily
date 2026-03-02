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

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
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

  const sanitizeError = (err: unknown) => {
    return (err as { shortMessage?: string })?.shortMessage || 'An unexpected error occurred. Please try again.';
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Mint Museily
        </h1>

        <div className="flex flex-col items-center gap-6">
          <ConnectButton />

          {walletAddress ? (
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="mint-amount" className="text-sm font-semibold text-gray-700">
                  Number of NFTs to mint
                </label>
                <input
                  id="mint-amount"
                  type="number"
                  value={mintAmount}
                  min={1}
                  max={20}
                  onChange={(e) => setMintAmount(Math.max(1, Math.min(20, Number(e.target.value))))}
                  disabled={isPending || isConfirming}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                  aria-describedby="mint-hint"
                />
                <p id="mint-hint" className="text-xs text-gray-500">Max 20 per transaction</p>
              </div>

              <button
                onClick={handleMint}
                disabled={isPending || isConfirming}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:scale-100"
              >
                {isPending ? 'Requesting Approval...' : isConfirming ? 'Waiting for Confirmation...' : 'Mint Now'}
              </button>

              {error && (
                <p role="alert" className="text-red-500 text-sm font-medium mt-2 bg-red-50 p-3 rounded-lg border border-red-100">
                  {sanitizeError(error)}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 font-medium">Please connect your wallet to start minting.</p>
            </div>
          )}
        </div>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
