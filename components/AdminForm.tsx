'use client';

import { useState, useEffect } from 'react';
import { Stream, StreamFormData } from '@/lib/types';
import { extractYouTubeVideoId, isValidYouTubeVideoId } from '@/lib/utils';
import { Plus, Edit, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminFormProps {
  onSubmit: (data: StreamFormData) => Promise<{ success: boolean; error?: string }>;
  editingStream?: Stream | null;
  onCancel: () => void;
}

export function AdminForm({ onSubmit, editingStream, onCancel }: AdminFormProps) {
  const [formData, setFormData] = useState<StreamFormData>({
    videoId: '',
    title: '',
    description: '',
    isActive: true,
  });
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingStream) {
      setFormData({
        videoId: editingStream.videoId,
        title: editingStream.title,
        description: editingStream.description,
        isActive: editingStream.isActive,
      });
      setInputValue(editingStream.videoId);
    } else {
      resetForm();
    }
  }, [editingStream]);

  const resetForm = () => {
    setFormData({
      videoId: '',
      title: '',
      description: '',
      isActive: true,
    });
    setInputValue('');
    setError(null);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setError(null);
    
    // Try to extract video ID
    const extractedId = extractYouTubeVideoId(value);
    if (extractedId) {
      setFormData(prev => ({ ...prev, videoId: extractedId }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate video ID
    if (!formData.videoId || !isValidYouTubeVideoId(formData.videoId)) {
      setError('Please enter a valid YouTube video ID or embed code');
      setLoading(false);
      return;
    }

    // Validate title
    if (!formData.title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    try {
      const result = await onSubmit(formData);
      if (result.success) {
        if (!editingStream) {
          resetForm();
        }
      } else {
        setError(result.error || 'Failed to save stream');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {editingStream ? 'Edit Stream' : 'Add New Stream'}
          </h3>
          {editingStream && (
            <button
              type="button"
              onClick={onCancel}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Video ID Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              YouTube Video ID or Embed Code
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Paste YouTube URL, video ID, or iframe embed code"
              className={cn(
                'w-full px-4 py-2 rounded-lg border',
                'bg-white dark:bg-gray-700',
                'border-gray-300 dark:border-gray-600',
                'text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'text-sm'
              )}
            />
            {formData.videoId && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Extracted Video ID: <span className="font-mono">{formData.videoId}</span>
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter stream title"
              required
              className={cn(
                'w-full px-4 py-2 rounded-lg border',
                'bg-white dark:bg-gray-700',
                'border-gray-300 dark:border-gray-600',
                'text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'text-sm'
              )}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter stream description"
              rows={3}
              className={cn(
                'w-full px-4 py-2 rounded-lg border',
                'bg-white dark:bg-gray-700',
                'border-gray-300 dark:border-gray-600',
                'text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'text-sm resize-none'
              )}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Mark as active stream
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg',
                'hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors duration-200',
                'flex items-center justify-center space-x-2'
              )}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : editingStream ? (
                <>
                  <Edit className="w-4 h-4" />
                  <span>Update Stream</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Stream</span>
                </>
              )}
            </button>
            {editingStream && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

