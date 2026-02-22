"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount } from 'wagmi';
import { useState } from 'react';
import SuccessModal from '@/components/SuccessModal';

// Dynamically load the ConnectButton component from RainbowKit
const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

// Replace with your actual contract address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!contractAddress) {
  // In a real app, we might want a more graceful error
}

// Replace with your actual contract ABI
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
];

export default function MintPage() {
  const { address: walletAddress } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);

  const { writeContract, error, isPending, isSuccess, reset } = useWriteContract();

  const handleMint = () => {
    if (!contractAddress) return;
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    });
  };

  const handleCloseModal = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Mint Museily
          </h1>
          <p className="text-gray-300">Collect your unique Museily NFT today.</p>
        </header>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
          <div className="flex justify-center mb-8">
            <ConnectButton />
          </div>

          {walletAddress ? (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="mint-amount"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Number of NFTs to mint
                </label>
                <input
                  id="mint-amount"
                  type="number"
                  value={mintAmount}
                  min={1}
                  max={10}
                  onChange={(e) => setMintAmount(Math.max(1, Number(e.target.value)))}
                  disabled={isPending}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                />
                <p className="text-xs text-gray-400 mt-2">Max 10 per transaction</p>
              </div>

              <button
                onClick={handleMint}
                disabled={isPending || !contractAddress}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Minting...
                  </span>
                ) : (
                  'Mint NFT'
                )}
              </button>

              {error && (
                <div
                  role="alert"
                  className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-sm text-red-200 animate-in fade-in slide-in-from-top-2"
                >
                  <strong>Error:</strong> { (error as any).shortMessage || error.message }
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-300">Please connect your wallet to start minting.</p>
            </div>
          )}
        </div>
      </div>

      <SuccessModal isOpen={isSuccess} onClose={handleCloseModal} />
    </div>
  );
}
