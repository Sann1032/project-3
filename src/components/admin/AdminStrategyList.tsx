import React, { useState } from 'react';
import { TaxStrategy } from '../../types/strategy';
import { Edit2, Trash2 } from 'lucide-react';
import { EditStrategyForm } from './EditStrategyForm';
import { convertTimestampToDate } from '../../utils/firestoreConverters';

interface AdminStrategyListProps {
  strategies: TaxStrategy[];
  onUpdate: (id: string, strategy: Partial<TaxStrategy>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const AdminStrategyList: React.FC<AdminStrategyListProps> = ({
  strategies,
  onUpdate,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (strategy: TaxStrategy) => {
    setEditingId(strategy.id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = async (id: string, updatedStrategy: Partial<TaxStrategy>) => {
    await onUpdate(id, updatedStrategy);
    setEditingId(null);
  };

  const formatDate = (date: any) => {
    const convertedDate = convertTimestampToDate(date);
    return convertedDate.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {strategies.map((strategy) => (
        <div key={strategy.id} className="bg-white rounded-lg shadow p-6">
          {editingId === strategy.id ? (
            <EditStrategyForm
              strategy={strategy}
              onSave={(updates) => handleSave(strategy.id, updates)}
              onCancel={handleCancel}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{strategy.name}</h3>
                  <p className="text-sm text-gray-600">{strategy.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(strategy)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(strategy.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Savings</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${strategy.estimatedSavings.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Modified</p>
                  <p className="text-sm text-gray-900">
                    {formatDate(strategy.lastModified)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};