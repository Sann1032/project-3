import React, { useRef } from 'react';
import { UserStrategy } from '../../types/strategy';
import { FileText, Upload, Trash2, Download } from 'lucide-react';

interface StrategyDocumentsProps {
  strategy: UserStrategy;
  onUpdateStrategy: (id: string, updates: Partial<UserStrategy>) => void;
}

export const StrategyDocuments: React.FC<StrategyDocumentsProps> = ({
  strategy,
  onUpdateStrategy,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you'd handle file uploads to a server
    // For now, we'll just show the UI
    console.log('File upload functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
        </div>

        <div className="space-y-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
            onClick={() => fileInput.current?.click()}
          >
            <input
              type="file"
              ref={fileInput}
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-2">
              PDF, DOC, DOCX, XLS, XLSX up to 10MB
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Uploaded Documents</h4>
            <p className="text-sm text-gray-500 text-center py-4">
              No documents uploaded yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};