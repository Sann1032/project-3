import React, { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';

interface AutoSaveProps {
  onSave: () => Promise<void>;
  saveInterval?: number;
}

export const AutoSave: React.FC<AutoSaveProps> = ({ onSave, saveInterval = 30000 }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(handleAutoSave, saveInterval);
    return () => clearInterval(interval);
  }, [saveInterval]);

  const handleAutoSave = async () => {
    try {
      setIsSaving(true);
      await onSave();
      setLastSaved(new Date());
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2">
      {lastSaved && (
        <span className="text-sm text-gray-500">
          Last saved: {lastSaved.toLocaleTimeString()}
        </span>
      )}
      <button
        onClick={handleAutoSave}
        disabled={isSaving}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
          showSuccess
            ? 'bg-green-500 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {showSuccess ? (
          <>
            <Check className="w-4 h-4" />
            <span>Saved</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </>
        )}
      </button>
    </div>
  );
};