import React from 'react';
import { TaxStrategy } from '../../types/strategy';
import { PlayCircle, Clock, BookOpen } from 'lucide-react';

interface CourseCardProps {
  strategy: TaxStrategy;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ strategy, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <PlayCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {strategy.name}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {strategy.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>2-3 hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>5 lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
};