import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface EditTierDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentTier: string;
  onTierChange: (tier: string) => void;
}

const EditTierDialog: React.FC<EditTierDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentTier,
  onTierChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
      <div className="bg-white rounded-lg p-6 max-w-[400px] w-full shadow-xl">
        {/* Header with icon and close button */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col items-start gap-3">
            <div className="bg-[#FFEBD6] p-3 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-[#F79009]" />
            </div>
            <h3 className="text-lg font-semibold">Edit Ambassador Tier</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-left">
          Update the ambassador&apos;s tier to adjust their commission structure and benefits. These changes will apply immediately.
        </p>

        {/* Tier Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Tier
          </label>
          <select
            value={currentTier}
            onChange={(e) => onTierChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#1570EF] hover:bg-[#175CD3] rounded-lg transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTierDialog; 