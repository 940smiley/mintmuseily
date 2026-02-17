"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount } from 'wagmi';
import { useState } from 'react';

// Dynamically load the ConnectButton component from RainbowKit
const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

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
] as const;

export default function MintPage() {
  const { address: walletAddress } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);

  const { writeContract, error, isPending } = useWriteContract();

  if (!contractAddress) {
    return (
      <div className="p-10 text-red-500">
        <h1>Configuration Error</h1>
        <p>Contract address is not defined in environment variables.</p>
      </div>
    );
  }

  const handleMint = () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    });
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Mint Museily</h1>
      <ConnectButton />
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        {walletAddress ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="mintAmount" className="text-sm text-gray-400">Amount to mint</label>
              <input
                id="mintAmount"
                type="number"
                value={mintAmount}
                min={1}
                onChange={(e) => setMintAmount(Math.max(1, Number(e.target.value)))}
                disabled={isPending}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleMint}
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              {isPending ? 'Minting...' : 'Mint NFT'}
            </button>
            {error && (
              <p role="alert" className="text-red-400 text-sm mt-2 max-w-xs">
                Error: {error.message}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-400 italic">Please connect your wallet to mint.</p>
        )}
      </div>
    </div>
  );
}
