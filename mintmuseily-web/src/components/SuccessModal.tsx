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
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-300">
        <h2
          id="modal-title"
          className="text-2xl font-bold mb-4 text-gray-900 text-center"
        >
          Success!
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Your NFT transaction has been sent successfully. Check your wallet for updates.
        </p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
