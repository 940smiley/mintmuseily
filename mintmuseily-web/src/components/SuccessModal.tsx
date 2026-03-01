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
      closeButtonRef.current?.focus()

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 transform transition-all animate-in fade-in zoom-in duration-200">
        <h2 id="modal-title" className="text-2xl font-bold mb-4 text-gray-900">
          Success!
        </h2>
        <p className="text-gray-600">Your NFT has been minted successfully.</p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-4 py-2 rounded-lg mt-6 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  )
}
