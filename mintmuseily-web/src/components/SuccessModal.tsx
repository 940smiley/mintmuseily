import { useEffect, useRef } from 'react';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-zinc-200 dark:border-zinc-800 transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 id="modal-title" className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
          Mint Successful!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Your NFT has been minted and added to your collection.
        </p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}
