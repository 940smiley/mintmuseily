"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount } from 'wagmi';
import { useState } from 'react';

// Dynamically load the ConnectButton component from RainbowKit
const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

// Replace with your actual contract address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!contractAddress) {
  throw new Error('Contract address is not defined in environment variables.');
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

  const { writeContract, error, isPending } = useWriteContract();

  const handleMint = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [mintAmount],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-pink-500 text-white p-10">
      <div className="max-w-md w-full flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold text-center mb-4">Mint Museily</h1>
        <div className="mb-4">
          <ConnectButton />
        </div>
        {walletAddress ? (
        <div className="flex flex-col items-center gap-4 bg-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-xl">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="mintAmount" className="text-sm font-medium text-gray-200">
              Amount to Mint
            </label>
            <input
              id="mintAmount"
              type="number"
              value={mintAmount}
              min={1}
              onChange={(e) => setMintAmount(Number(e.target.value))}
              disabled={isPending}
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>
          <button
            onClick={handleMint}
            disabled={isPending}
            aria-label={isPending ? 'Minting in progress' : 'Mint NFTs'}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Minting...</span>
              </>
            ) : (
              'Mint'
            )}
          </button>
          {error && (
            <p role="alert" className="text-red-400 text-sm mt-2 bg-red-900/20 p-3 rounded-lg border border-red-500/30 w-full">
              Error: {(error as { shortMessage?: string }).shortMessage || error.message}
            </p>
          )}
        </div>
      ) : (
        <p className="text-xl text-gray-200 animate-pulse">Please connect your wallet to mint.</p>
      )}
      </div>
    </main>
  );
}