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

  const { writeContract, error, isPending, isSuccess } = useWriteContract();

  const handleMint = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [mintAmount],
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white font-sans">Mint Museily</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6 w-full max-w-md">
        <ConnectButton />
        {walletAddress ? (
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="mint-amount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of tokens to mint
              </label>
              <input
                id="mint-amount"
                type="number"
                value={mintAmount}
                min={1}
                max={10}
                onChange={(e) => setMintAmount(Number(e.target.value))}
                disabled={isPending}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all disabled:opacity-50"
              />
            </div>
            <button
              onClick={handleMint}
              disabled={isPending}
              aria-busy={isPending}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {isPending && <span className="animate-spin" aria-hidden="true">◌</span>}
              {isPending ? 'Minting...' : 'Mint'}
            </button>
            {isSuccess && <p className="text-green-500 text-sm mt-2 font-medium text-center" role="status">Successfully minted!</p>}
            {error && <p className="text-red-500 text-sm mt-2 text-center" role="alert">Error: {(error as { shortMessage?: string }).shortMessage || error.message}</p>}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">Please connect your wallet to start minting.</p>
        )}
      </div>
    </main>
  );
}