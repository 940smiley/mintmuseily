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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { data: hash, writeContract, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      setIsSuccessModalOpen(true);
    } else {
      setIsSuccessModalOpen(false);
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 flex flex-col items-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Mint Museily</h1>
          <p className="text-indigo-200">Connect your wallet to start minting</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex justify-center mb-8">
            <ConnectButton />
          </div>

          {walletAddress ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="mint-amount"
                  className="block text-sm font-medium text-indigo-100 ml-1"
                >
                  Amount to Mint
                </label>
                <input
                  id="mint-amount"
                  type="number"
                  value={mintAmount}
                  min={1}
                onChange={(e) => setMintAmount(Math.max(1, Number(e.target.value)))}
                  disabled={isPending || isConfirming}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition outline-none disabled:opacity-50"
                  placeholder="Enter amount"
                />
              </div>

              <button
                onClick={handleMint}
                disabled={isPending || isConfirming}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-xl shadow-lg hover:from-pink-600 hover:to-rose-600 active:scale-95 transition transform disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                )}
                <span>
                  {isPending ? 'Requesting...' : isConfirming ? 'Confirming...' : 'Mint NFT'}
                </span>
              </button>

              {error && (
                <div role="alert" className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mt-4">
                  <p className="text-red-200 text-sm">
                    {(error as { shortMessage?: string }).shortMessage || 'An unexpected error occurred.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-indigo-200 italic font-medium">Please connect your wallet to access minting features.</p>
            </div>
          )}
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </main>
  );
}
