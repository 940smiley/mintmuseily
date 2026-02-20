// src/components/SuccessModal.tsx
import { useEffect, useRef } from 'react'

type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Focus the close button when the modal opens for better keyboard accessibility
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-500"
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
          <h2 id="modal-title" className="text-2xl font-bold mb-2 text-gray-900">
            Successfully Minted!
          </h2>
          <p className="text-gray-600 mb-8">
            Your unique Museily NFT has been created and added to your wallet.
          </p>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity active:scale-95 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  )
}
