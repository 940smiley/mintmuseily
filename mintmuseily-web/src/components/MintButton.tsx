// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setIsSuccess(false), 3000)
    }
  }, [isSuccess])

  const handleMint = async () => {
    setIsLoading(true);
    try {
      // Fetch the current mint price
      // const mintPrice = await getMintPrice();
      const mintPrice = parseEther('0.1'); // Placeholder for dynamic price

      await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: [], // Your contract ABI
        functionName: 'mint',
        args: [address],
        value: mintPrice,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={isLoading}
      aria-label={isLoading ? 'Minting in progress' : isSuccess ? 'Minting successful' : 'Mint NFT'}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 py-2 rounded-lg transition transform active:scale-95 disabled:opacity-50 flex items-center gap-2"
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {isLoading ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
    </button>
  );
}
