"use client";
import dynamic from 'next/dynamic';
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';
import SuccessModal from '@/components/SuccessModal';

const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const contractAbi = [
  { name: 'mint', type: 'function', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
] as const;

export default function MintPage() {
  const { address: walletAddress } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => { if (isConfirmed) setIsSuccessModalOpen(true); }, [isConfirmed]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mint Museily</h1>
      <div className="mb-6 flex justify-center"><ConnectButton /></div>
      {walletAddress ? (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="mint-amount" className="text-sm font-medium text-gray-700">Amount to Mint</label>
            <input id="mint-amount" type="number" value={mintAmount} min={1} onChange={(e) => setMintAmount(Number(e.target.value))} disabled={isPending || isConfirming} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:bg-gray-100 transition-all" />
          </div>
          <button onClick={() => writeContract({ address: contractAddress as \`0x\${string}\`, abi: contractAbi, functionName: 'mint', args: [BigInt(mintAmount)] })} disabled={isPending || isConfirming} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50">
            {isPending ? 'Requesting...' : isConfirming ? 'Confirming...' : 'Mint'}
          </button>
          {error && <p role="alert" className="text-red-500 text-sm mt-2 font-medium">Error: {(error as { shortMessage?: string }).shortMessage || error.message}</p>}
        </div>
      ) : ( <p className="text-center text-gray-600 font-medium">Please connect your wallet to mint.</p> )}
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </div>
  );
}
