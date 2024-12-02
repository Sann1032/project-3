import React, { useRef } from 'react';
import { Document, DocumentType } from '../../types/client';
import { Upload, File } from 'lucide-react';

interface DocumentUploadProps {
  documents: Document[];
  onUpload: (document: Document) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ documents, onUpload }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you'd upload to a server here
    // For now, we'll create a local URL
    const document: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: getDocumentType(file.name),
      uploadDate: new Date(),
      size: file.size,
      url: URL.createObjectURL(file),
    };

    onUpload(document);
  };

  const getDocumentType = (filename: string): DocumentType => {
    if (filename.includes('W2')) return 'W2';
    if (filename.includes('1099')) return '1099';
    if (filename.includes('tax')) return 'Tax Return';
    if (filename.includes('investment')) return 'Investment Statement';
    return 'Other';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Upload className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Document Upload</h2>
      </div>

      <div className="space-y-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
          onClick={() => fileInput.current?.click()}
        >
          <input
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600">
            Click to upload or drag and drop your documents here
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, JPG, PNG, DOC
          </p>
        </div>

        {documents.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Uploaded Documents</h3>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(doc.uploadDate).toLocaleDateString()} ·{' '}
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {doc.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};