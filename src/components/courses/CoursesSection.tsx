import React, { useState } from 'react';
import { GraduationCap, Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { useStrategies } from '../../hooks/useStrategies';
import { CourseCard } from './CourseCard';
import { CourseDetails } from './CourseDetails';
import { CourseForm } from './CourseForm';
import { useAuth } from '../../hooks/useAuth';
import { TaxStrategy } from '../../types/strategy';

export const CoursesSection: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<TaxStrategy | null>(null);
  const { strategies, updateStrategy, deleteStrategy } = useStrategies();
  const { user } = useAuth();

  const isAdmin = user?.email === 'jacob.sannon@worldclasscfos.com';

  const filteredStrategies = strategies.filter((strategy) =>
    strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    strategy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCourse = (course: TaxStrategy) => {
    setEditingCourse(course);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteStrategy(courseId);
        if (selectedCourse === courseId) {
          setSelectedCourse(null);
        }
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Tax Strategy Training</h1>
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsAddingCourse(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <span>Add Course</span>
          </button>
        )}
      </div>

      {isAddingCourse || editingCourse ? (
        <CourseForm
          course={editingCourse}
          onSubmit={async (courseData) => {
            try {
              if (editingCourse) {
                await updateStrategy(editingCourse.id, courseData);
              } else {
                await updateStrategy('new', courseData);
              }
              setIsAddingCourse(false);
              setEditingCourse(null);
            } catch (error) {
              console.error('Error saving course:', error);
            }
          }}
          onCancel={() => {
            setIsAddingCourse(false);
            setEditingCourse(null);
          }}
        />
      ) : selectedCourse ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedCourse(null)}
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
          >
            <span>← Back to Courses</span>
          </button>
          <CourseDetails
            strategy={strategies.find(s => s.id === selectedCourse)!}
          />
        </div>
      ) : (
        <>
          <div className="relative max-w-xl mb-8">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tax strategy courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStrategies.map((strategy) => (
              <div key={strategy.id} className="relative">
                <CourseCard
                  strategy={strategy}
                  onClick={() => setSelectedCourse(strategy.id)}
                />
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCourse(strategy);
                      }}
                      className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCourse(strategy.id);
                      }}
                      className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};