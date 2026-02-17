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
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 p-4">
      <h1 className="text-3xl font-bold text-blue-600">Mint Museily</h1>
      <ConnectButton />
      {walletAddress ? (
        <div className="flex flex-col gap-4 w-full max-w-xs p-6 border rounded-xl shadow-sm bg-white dark:bg-gray-800">
          <div className="flex flex-col gap-1">
            <label htmlFor="mintAmount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount to Mint (Max 10)
            </label>
            <input
              id="mintAmount"
              type="number"
              value={mintAmount}
              min={1}
              max={10}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMintAmount(Math.max(1, Math.min(10, value)));
              }}
              disabled={isPending}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            onClick={() => {
              if (mintAmount >= 1 && mintAmount <= 10 && Number.isInteger(mintAmount)) {
                handleMint();
              }
            }}
            disabled={isPending}
            aria-label={isPending ? "Minting in progress" : "Mint NFT"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isPending ? 'Minting...' : 'Mint Now'}
          </button>
{error && (
            <p className="text-red-500 text-xs mt-2 whitespace-pre-wrap" role="alert">
              Error: {error.message}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Please connect your wallet to mint.</p>
      )}
    </div>
  );
}