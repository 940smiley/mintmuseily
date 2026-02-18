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
    <div>
      <h1>Mint Museily</h1>
      <ConnectButton />
      {walletAddress ? (
        <div className="mt-4 flex flex-col gap-4 max-w-xs">
          <div className="flex flex-col gap-2">
            <label htmlFor="mintAmount" className="text-sm font-medium">
              Amount to Mint
            </label>
            <input
              id="mintAmount"
              type="number"
              value={mintAmount}
              min={1}
              onChange={(e) => setMintAmount(Number(e.target.value))}
              disabled={isPending}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>
          <button
            onClick={handleMint}
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
            aria-label={isPending ? "Minting NFT" : "Mint NFT"}
          >
            {isPending ? 'Minting...' : 'Mint'}
          </button>
          {error && (
            <p role="alert" className="text-red-500 text-sm font-medium">
              Error: {error.message}
            </p>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to mint.</p>
      )}
    </div>
  );
}