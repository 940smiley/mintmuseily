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

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

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

  const isMinting = isPending || isConfirming;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mint Museily</h1>

        <div className="flex justify-center mb-8">
          <ConnectButton />
        </div>

        {walletAddress ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="mint-amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Mint
              </label>
              <input
                id="mint-amount"
                type="number"
                value={mintAmount}
                min={1}
                onChange={(e) => setMintAmount(Math.max(1, Number(e.target.value)))}
                disabled={isMinting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            <button
              onClick={handleMint}
              disabled={isMinting || !contractAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? 'Requesting...' : isConfirming ? 'Confirming...' : 'Mint'}
            </button>

            {error && (
              <div role="alert" className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm text-red-600">
                  {(error as { shortMessage?: string }).shortMessage || 'An unexpected error occurred.'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 bg-gray-50 py-4 rounded-lg border border-dashed border-gray-200">
            Please connect your wallet to mint.
          </p>
        )}
      </div>

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
