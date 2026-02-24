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
  const { writeContract, error, isPending, isSuccess, reset } = useWriteContract();

  const handleMint = () => {
    writeContract({
      address: contractAddress as `0x${string}`, abi: contractAbi,
      functionName: 'mint', args: [BigInt(mintAmount)],
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mint Museily</h1>
      <ConnectButton />
      {walletAddress ? (
        <div className="mt-4">
          <label htmlFor="amt" className="block text-sm mb-1">Amount</label>
          <input id="amt" type="number" value={mintAmount} min={1} disabled={isPending}
            onChange={(e) => setMintAmount(Number(e.target.value))} className="border rounded p-1 mr-2" />
          <button onClick={handleMint} disabled={isPending} className="bg-blue-600 text-white px-3 py-1 rounded">
            {isPending ? 'Minting...' : 'Mint'}
          </button>
          {error && <p role="alert" style={{ color: 'red' }}>Error: {(error as any).shortMessage || error.message}</p>}
        </div>
      ) : (
        <p className="mt-4">Please connect your wallet to mint.</p>
      )}
      <SuccessModal isOpen={isSuccess} onClose={() => reset()} />
    </div>
  );
}