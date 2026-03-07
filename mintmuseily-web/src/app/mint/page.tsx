"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { writeContract, error, isPending, data: hash } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      setIsModalOpen(true);
    }
  }, [isConfirmed]);

  const handleMint = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [mintAmount],
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mint Museily</h1>
      <ConnectButton />

      {walletAddress ? (
        <div className="mt-8 space-y-4 max-w-xs">
          <div className="flex flex-col space-y-2">
            <label htmlFor="mint-amount" className="font-medium">
              Mint Amount
            </label>
            <input
              id="mint-amount"
              type="number"
              value={mintAmount}
              min={1}
              onChange={(e) => setMintAmount(Number(e.target.value))}
              disabled={isPending || isConfirming}
              className="border rounded px-3 py-2 text-black"
            />
          </div>

          <button
            onClick={handleMint}
            disabled={isPending || isConfirming}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isPending ? 'Requesting...' : isConfirming ? 'Confirming...' : 'Mint'}
          </button>

          {error && (
            <p role="alert" className="text-red-500 text-sm mt-2">
              Error: {(error as { shortMessage?: string }).shortMessage || error.message}
            </p>
          )}
        </div>
      ) : (
        <p className="mt-8 text-gray-600">Please connect your wallet to mint.</p>
      )}

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
