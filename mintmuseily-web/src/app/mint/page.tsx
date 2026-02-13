"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount } from 'wagmi';
import { sepolia } from 'wagmi/chains';
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
] as const;

export default function MintPage() {
  const { address: walletAddress } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);

  const { writeContract, error, isPending } = useWriteContract();

  const handleMint = () => {
    // Security: Client-side validation for mint amount
    if (mintAmount <= 0 || mintAmount > 10) {
      alert("Please enter a valid amount (1-10)");
      return;
    }

    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
      account: walletAddress,
      chain: sepolia,
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
            max={10}
            onChange={(e) => setMintAmount(Number(e.target.value))}
            disabled={isPending}
          />
          <button onClick={handleMint} disabled={isPending}>
            {isPending ? 'Minting...' : 'Mint'}
          </button>
          {/* Security: Sanitize error message to avoid information leakage */}
          {error && (
            <p style={{ color: 'red' }}>
              Error: {(error as any).shortMessage || 'An error occurred during minting.'}
            </p>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to mint.</p>
      )}
    </div>
  );
}