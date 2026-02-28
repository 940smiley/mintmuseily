// src/components/SuccessModal.tsx
import { memo } from 'react'

type SuccessModalProps = {
    isOpen: boolean
    onClose: () => void
  }
  
/**
 * ⚡ Bolt Optimization:
 * SuccessModal is an expensive UI element that is only needed when a transaction completes.
 * Wrapping it with React.memo ensures that it only re-renders when the 'isOpen' state changes,
 * preventing layout recalculations and unnecessary re-renders while the user is interacting
 * with other parts of the minting page.
 * Impact: Improved frame stability during modal transitions.
 */
function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4">Success!</h2>
          <p>Your NFT has been minted successfully.</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

export default memo(SuccessModal)
