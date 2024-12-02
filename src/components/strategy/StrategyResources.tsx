import React from 'react';
import { UserStrategy } from '../../types/strategy';
import { PlayCircle, FileText, BookOpen, Link as LinkIcon } from 'lucide-react';
import { VideoPlayer } from '../video/VideoPlayer';

interface StrategyResourcesProps {
  strategy: UserStrategy;
}

export const StrategyResources: React.FC<StrategyResourcesProps> = ({ strategy }) => {
  const trainingResources = strategy.trainingResources || {
    videos: [],
    documents: [],
    articles: []
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Learning Resources</h3>

        <div className="space-y-8">
          {/* Video Training Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PlayCircle className="w-5 h-5 text-red-600" />
              <h4 className="text-md font-medium text-gray-800">Video Training</h4>
            </div>
            <div className="space-y-6">
              {trainingResources.videos?.map((video, index) => (
                <div key={index} className="space-y-2">
                  <VideoPlayer
                    url={video.url}
                    title={video.title}
                  />
                  {video.description && (
                    <p className="text-sm text-gray-600 mt-2">{video.description}</p>
                  )}
                  {video.duration && (
                    <p className="text-xs text-gray-500">Duration: {video.duration}</p>
                  )}
                </div>
              ))}
              {trainingResources.videos?.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No video resources available yet.
                </p>
              )}
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h4 className="text-md font-medium text-gray-800">Documents & Guides</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingResources.documents?.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">{doc.title}</span>
                    {doc.description && (
                      <span className="text-xs text-gray-500">{doc.description}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Articles Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h4 className="text-md font-medium text-gray-800">Articles & References</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingResources.articles?.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LinkIcon className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">{article.title}</span>
                    {article.author && (
                      <span className="text-xs text-gray-500">By {article.author}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};