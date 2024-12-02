import React, { useState } from 'react';
import { TaxGoal } from '../../types/client';
import { Target, Plus } from 'lucide-react';

interface GoalsSectionProps {
  goals: TaxGoal[];
  onAddGoal: (goal: TaxGoal) => void;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ goals, onAddGoal }) => {
  const [newGoal, setNewGoal] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleAddGoal = () => {
    if (!newGoal.trim()) return;

    onAddGoal({
      id: Math.random().toString(36).substr(2, 9),
      description: newGoal,
      priority,
    });

    setNewGoal('');
    setPriority('Medium');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Tax Planning Goals</h2>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter your tax planning goal"
            className="flex-1 p-2 border rounded-md"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
            className="w-32 p-2 border rounded-md"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={handleAddGoal}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {goals.length > 0 && (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
              >
                <p className="text-gray-800">{goal.description}</p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    goal.priority === 'High'
                      ? 'bg-red-100 text-red-800'
                      : goal.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {goal.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};