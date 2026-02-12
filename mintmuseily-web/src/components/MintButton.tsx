// src/components/MintButton.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';
import { parseEther } from 'viem';

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleMint = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      await writeContract({
        address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0') as `0x${string}`,
        abi: [], functionName: 'mint', args: [address], value: parseEther('0.1'),
      });
      setIsSuccess(true);
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  };

  return (
    <button onClick={handleMint} disabled={isLoading || !address}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">
      {isLoading ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
    </button>
  );
}
