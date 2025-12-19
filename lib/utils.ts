import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Extract YouTube video ID from various formats
export function extractYouTubeVideoId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;

  // Remove whitespace
  input = input.trim();

  // Check if it's already just a video ID (11 characters, alphanumeric, hyphens, underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  // Extract from iframe embed code
  const iframeMatch = input.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (iframeMatch) {
    return iframeMatch[1];
  }

  // Extract from various YouTube URL formats
  const urlPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of urlPatterns) {
    const match = input.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

// Validate YouTube video ID format
export function isValidYouTubeVideoId(videoId: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
}

