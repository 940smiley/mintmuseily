import { useEffect, useRef } from 'react';

export default function SuccessModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isOpen) {
      btnRef.current?.focus();
      const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', h);
      return () => window.removeEventListener('keydown', h);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-2">Success!</h2>
        <p>Your NFT has been minted successfully.</p>
        <button ref={btnRef} onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full" aria-label="Close modal">Close</button>
      </div>
    </div>
  );
}
