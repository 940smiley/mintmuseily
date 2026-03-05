"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount } from 'wagmi';
import { useState, useCallback } from 'react';

// Dynamically load the ConnectButton component from RainbowKit
const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

// Replace with your actual contract address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!contractAddress) {
  throw new Error('Contract address is not defined in environment variables.');
}

// Optimized contract ABI with both single and batch mint functions
const contractAbi = [
  {
    name: 'mint',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
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

  // Use useCallback to memoize handleMint and prevent unnecessary re-renders
  const handleMint = useCallback(() => {
    // Optimization: Use specialized single mint function if amount is 1,
    // otherwise use the batch mint function.
    if (mintAmount === 1) {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: 'mint',
        args: [],
      });
    } else {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: 'mint',
        args: [BigInt(mintAmount)],
      });
    }
  }, [writeContract, mintAmount]);

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
            onChange={(e) => setMintAmount(Number(e.target.value))}
            disabled={isPending}
          />
          <button onClick={handleMint} disabled={isPending}>
            {isPending ? 'Minting...' : 'Mint'}
          </button>
          {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
      ) : (
        <p>Please connect your wallet to mint.</p>
      )}
    </div>
  );
}