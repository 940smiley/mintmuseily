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

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full transform transition-all">
        <h2 id="modal-title" className="text-2xl font-bold mb-2 text-gray-900">Success!</h2>
        <p className="text-gray-600">Your NFT has been minted successfully.</p>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2.5 rounded-lg mt-6 font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
        >
          Close
        </button>
      </div>
    </div>
  )
}
