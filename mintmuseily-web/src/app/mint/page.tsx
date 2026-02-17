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
    // Security: Client-side validation of input
    if (mintAmount < 1 || mintAmount > 20 || !Number.isInteger(mintAmount)) {
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
    <div>
      <h1>Mint Museily</h1>
      <ConnectButton />
      {walletAddress ? (
        <div>
          <input
            type="number"
            value={mintAmount}
            min={1}
            max={20}
            onChange={(e) => setMintAmount(Number(e.target.value))}
            disabled={isPending}
          />
          <button
            onClick={handleMint}
            disabled={isPending || mintAmount < 1 || mintAmount > 20 || !Number.isInteger(mintAmount)}
          >
            {isPending ? 'Minting...' : 'Mint'}
          </button>
          {error && (
            <p style={{ color: 'red' }}>
              Error: {(error as { shortMessage?: string }).shortMessage || 'An unexpected error occurred'}
            </p>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to mint.</p>
      )}
    </div>
  );
}