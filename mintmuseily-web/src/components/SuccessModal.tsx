// src/components/SuccessModal.tsx
import { useEffect, useRef } from 'react';

type SuccessModalProps = {
    isOpen: boolean
    onClose: () => void
  }
  
  export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (isOpen) {
        closeButtonRef.current?.focus();
      }
    }, [isOpen]);

    if (!isOpen) return null
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
          <h2 id="success-title" className="text-2xl mb-4 text-black">Success!</h2>
          <p className="text-gray-700">Your NFT has been minted successfully.</p>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    )
  }
