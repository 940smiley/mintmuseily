import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

export default function MintButton() {
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleMint = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: [], functionName: 'mint', args: [address], value: parseEther('0.1'),
    });
  };

  return (
    <button onClick={handleMint} disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">
      {isPending ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
    </button>
  );
}
