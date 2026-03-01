// src/components/SuccessModal.tsx
import React, { useEffect, useRef } from 'react'

type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Manage focus for accessibility and handle the Escape key for performance/usability
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Success!</h2>
        <p>Your NFT has been minted successfully.</p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Close
        </button>
      </div>
    </div>
  )
}

/**
 * Memoize the SuccessModal component to prevent unnecessary re-renders when the parent state changes.
 */
export default React.memo(SuccessModal)
