import React from 'react';
import { Download } from 'lucide-react';
import { Entity } from '../../types/estate';
import { estateExportService } from '../../services/export/estateExportService';

interface ExportButtonProps {
  entities: Entity[];
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ entities, className }) => {
  const handleExport = async () => {
    try {
      await estateExportService.exportToPDF(entities);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };

  return (
    <button
      onClick={handleExport}
      className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${className}`}
    >
      <Download className="w-4 h-4" />
      <span>Export PDF</span>
    </button>
  );
};