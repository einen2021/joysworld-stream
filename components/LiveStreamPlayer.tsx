'use client';

import { useState } from 'react';
import YouTube from 'react-youtube';
import { Stream } from '@/lib/types';
import { Video, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiveStreamPlayerProps {
  stream: Stream | null;
  loading?: boolean;
}

export function LiveStreamPlayer({ stream, loading }: LiveStreamPlayerProps) {
  const [playerReady, setPlayerReady] = useState(false);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
    },
  };

  if (loading) {
    return (
      <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Loading stream...</p>
        </div>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md">
          <Video className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            No Active Streams
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back soon for our next live travel adventure!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Stream Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {stream.title}
          </h2>
          {stream.isActive && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">
              LIVE
            </span>
          )}
        </div>
        {stream.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {stream.description}
          </p>
        )}
      </div>

      {/* Video Player */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        {!playerReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}
        <div className="w-full h-full">
          <YouTube
            videoId={stream.videoId}
            opts={opts}
            className="w-full h-full"
            iframeClassName="w-full h-full"
            onReady={() => setPlayerReady(true)}
            onError={() => setPlayerReady(true)}
          />
        </div>
      </div>
    </div>
  );
}

