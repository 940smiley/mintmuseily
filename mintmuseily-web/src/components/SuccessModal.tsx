// src/components/SuccessModal.tsx
"use client";
import { useEffect, useRef } from 'react';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
        <h2 id="modal-title" className="text-2xl font-bold mb-2 text-gray-900">
          🎉 Success!
        </h2>
        <p className="text-gray-600 mb-6">
          Your NFT has been minted successfully and is on its way to your wallet.
        </p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-4 py-3 rounded-xl hover:opacity-90 transition-opacity focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 outline-none"
          aria-label="Close success message"
        >
          Great, thanks!
        </button>
      </div>
    </div>
  );
}
