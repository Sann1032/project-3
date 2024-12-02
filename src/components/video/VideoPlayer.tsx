import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
  title?: string;
  onReady?: () => void;
  onProgress?: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  onReady,
  onProgress,
  onEnded
}) => {
  return (
    <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden bg-gray-900">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playsinline
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0
            }
          },
          vimeo: {
            playerOptions: {
              title: false,
              byline: false,
              portrait: false
            }
          }
        }}
        onReady={onReady}
        onProgress={onProgress}
        onEnded={onEnded}
      />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white text-sm font-medium">{title}</h3>
        </div>
      )}
    </div>
  );
};