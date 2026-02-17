"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import SuccessModal from '@/components/SuccessModal';

const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!contractAddress && process.env.NODE_ENV === 'production') {
  throw new Error('Contract address is not defined in environment variables.');
}

const contractAbi = [{
  name: 'mint', type: 'function', stateMutability: 'nonpayable', outputs: [],
  inputs: [{ name: 'amount', type: 'uint256' }],
}];

export default function MintPage() {
  const { address: walletAddress } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { writeContract, error, isPending, isSuccess } = useWriteContract();

  useEffect(() => { if (isSuccess) setShowSuccess(true); }, [isSuccess]);

  const handleMint = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractAbi,
      functionName: 'mint',
      args: [BigInt(mintAmount)],
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Mint Museily</h1>
        <div className="flex justify-center mb-8"><ConnectButton /></div>

        {walletAddress ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="mint-amount" className="text-sm font-semibold text-gray-700">Number of NFTs to Mint</label>
              <input id="mint-amount" type="number" value={mintAmount} min={1} disabled={isPending}
                onChange={(e) => setMintAmount(Math.max(1, Number(e.target.value)))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
            </div>
            <button onClick={handleMint} disabled={isPending} aria-label="Mint NFT"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg disabled:opacity-50 transition-all">
              {isPending ? 'Minting...' : 'Mint Now'}
            </button>
            {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border-l-4 border-red-500" role="alert">
              Error: {error.message.split('\n')[0]}
            </div>}
          </div>
        ) : <p className="text-center text-gray-500 bg-gray-50 p-4 rounded-xl">Connect wallet to start minting.</p>}
      </div>
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </main>
  );
}
