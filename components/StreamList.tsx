'use client';

import { useState } from 'react';
import { Stream } from '@/lib/types';
import { Edit, Trash2, Video, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface StreamListProps {
  streams: Stream[];
  onEdit: (stream: Stream) => void;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

export function StreamList({ streams, onEdit, onDelete, loading }: StreamListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await onDelete(id);
      toast.success('Stream deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete stream');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">No streams yet. Add your first stream above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        All Streams ({streams.length})
      </h3>
      {streams.map((stream) => (
        <div
          key={stream.id}
          className={cn(
            'bg-white dark:bg-gray-800 rounded-lg border',
            'border-gray-200 dark:border-gray-700',
            'p-4 sm:p-6 hover:shadow-md transition-shadow'
          )}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {stream.thumbnail ? (
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <Video className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {stream.title}
                    </h4>
                    {stream.isActive ? (
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                  </div>
                  {stream.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {stream.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <span className="font-mono">ID: {stream.videoId}</span>
                    <span>
                      Created: {new Date(stream.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 sm:flex-col">
              <button
                onClick={() => onEdit(stream)}
                className={cn(
                  'px-3 py-2 rounded-lg border',
                  'border-gray-300 dark:border-gray-600',
                  'text-gray-700 dark:text-gray-300',
                  'hover:bg-gray-50 dark:hover:bg-gray-700',
                  'transition-colors flex items-center gap-2',
                  'text-sm'
                )}
              >
                <Edit className="w-4 h-4" />
                <span className="sm:hidden">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(stream.id!, stream.title)}
                disabled={deletingId === stream.id}
                className={cn(
                  'px-3 py-2 rounded-lg border',
                  'border-red-300 dark:border-red-600',
                  'text-red-700 dark:text-red-400',
                  'hover:bg-red-50 dark:hover:bg-red-900/20',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-colors flex items-center gap-2',
                  'text-sm'
                )}
              >
                <Trash2 className="w-4 h-4" />
                <span className="sm:hidden">Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

