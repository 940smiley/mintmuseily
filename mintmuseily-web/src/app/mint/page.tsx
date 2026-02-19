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
    if (mintAmount < 1 || mintAmount > 10) {
      alert('Please enter an amount between 1 and 10');
      return;
    }
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Mint Museily</h1>
      <div className="mb-6">
        <ConnectButton />
      </div>
      {walletAddress ? (
        <div className="space-y-4">
          <input
            type="number"
            value={mintAmount}
            min={1}
            max={10}
            onChange={(e) => setMintAmount(Number(e.target.value))}
            disabled={isPending}
            className="border p-2 mr-2 rounded text-black"
          />
          <button
            onClick={handleMint}
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isPending ? 'Minting...' : 'Mint'}
          </button>
          {error && (
            <p style={{ color: 'red' }} className="mt-2" role="alert">
              Error: {(error as any).shortMessage || error.message}
            </p>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to mint.</p>
      )}
    </div>
  );
}