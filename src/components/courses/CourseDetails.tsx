import React from 'react';
import { TaxStrategy } from '../../types/strategy';
import { PlayCircle, FileText, BookOpen, CheckCircle, Clock } from 'lucide-react';

interface CourseDetailsProps {
  strategy: TaxStrategy;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ strategy }) => {
  const steps = strategy?.steps || [];
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const renderVideoEmbed = (url: string) => {
    // Convert various video URLs to embed format
    let embedUrl = url;
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('/').pop()
        : url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }
    // Vimeo
    else if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      if (videoId) {
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return (
      <div className="relative w-full pt-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <PlayCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Course Content</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalSteps} Lessons
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Progress</h3>
          </div>
          <p className="mt-2 text-xl text-gray-900">
            {completedSteps} of {totalSteps} ({Math.round(progress)}%)
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Resources</h3>
          </div>
          <p className="mt-2 text-xl text-gray-900">
            {(strategy.trainingResources?.videos?.length || 0) +
              (strategy.trainingResources?.documents?.length || 0) +
              (strategy.trainingResources?.articles?.length || 0)} Total
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Course Overview</h3>
        <p className="text-gray-600 mb-6">{strategy.description}</p>

        {strategy.overview && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Summary</h4>
              <p className="text-gray-600">{strategy.overview.summary}</p>
            </div>

            {strategy.overview.benefits?.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Benefits</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {strategy.overview.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {strategy.overview.applicability?.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Applicability</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {strategy.overview.applicability.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Course Content</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
            >
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${step.completed ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
              >
                {step.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Lesson {index + 1}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {strategy.trainingResources && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resources</h3>
          
          {strategy.trainingResources.videos?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Videos</h4>
              <div className="space-y-6">
                {strategy.trainingResources.videos.map((video, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{video.title}</h5>
                      <span className="text-sm text-gray-500">{video.duration}</span>
                    </div>
                    {renderVideoEmbed(video.url)}
                    {video.description && (
                      <p className="text-sm text-gray-600 mt-2">{video.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {strategy.trainingResources.documents?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Documents</h4>
              <div className="space-y-3">
                {strategy.trainingResources.documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.title}</p>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};