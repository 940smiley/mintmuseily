"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';
import SuccessModal from '@/components/SuccessModal';

const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const contractAbi = [
  {
    name: 'mint',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export default function MintPage() {
  const { address: walletAddress } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      setIsModalOpen(true);
    }
  }, [isConfirmed]);

  const handleMint = () => {
    if (!contractAddress) return;
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Mint Museily</h1>
        <div className="mb-8">
          <ConnectButton />
        </div>

        {walletAddress ? (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="mintAmount" className="text-sm font-medium text-gray-700 mb-1">
                Amount to Mint
              </label>
              <input
                id="mintAmount"
                type="number"
                value={mintAmount}
                min={1}
                onChange={(e) => setMintAmount(Number(e.target.value))}
                disabled={isPending || isConfirming}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none disabled:bg-gray-100"
              />
            </div>

            <button
              onClick={handleMint}
              disabled={isPending || isConfirming}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? 'Requesting...' : isConfirming ? 'Confirming...' : 'Mint'}
            </button>

            {error && (
              <p className="text-red-600 text-sm mt-2" role="alert">
                Error: {(error as { shortMessage?: string }).shortMessage || error.message}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">Please connect your wallet to mint.</p>
        )}
      </div>

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
