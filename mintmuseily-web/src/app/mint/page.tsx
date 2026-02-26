"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
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

  const { data: hash, writeContract, error, isPending, reset } = useWriteContract();
  const { isSuccess: isConfirmed, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const handleMint = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-20 bg-white rounded-2xl shadow-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center tracking-tight">Mint Museily</h1>
      <div className="flex justify-center mb-8">
        <ConnectButton />
      </div>

      <SuccessModal isOpen={isConfirmed} onClose={() => reset()} />

      {walletAddress ? (
        <div className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="mintAmount" className="text-sm font-semibold text-gray-700 mb-2">
              Number of NFTs to Mint (Max 10)
            </label>
            <input
              id="mintAmount"
              type="number"
              value={mintAmount}
              min={1}
              max={10}
              onChange={(e) => setMintAmount(Number(e.target.value))}
              disabled={isPending}
              className="w-full border-2 border-gray-100 bg-gray-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-lg font-medium"
            />
          </div>
          <button
            onClick={handleMint}
            disabled={isPending || isConfirming}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <span className="animate-pulse">Confirming in Wallet...</span>
              </span>
            ) : isConfirming ? (
              <span className="flex items-center justify-center">
                <span className="animate-pulse">Minting...</span>
              </span>
            ) : 'Mint Now'}
          </button>
          {error && (
            <p role="alert" className="text-red-500 text-sm font-medium mt-3 bg-red-50 p-3 rounded-lg border border-red-200">
              Error: {(error as any).shortMessage || error.message}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center font-medium">Please connect your wallet to mint.</p>
      )}
    </div>
  );
}
