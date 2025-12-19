export interface Stream {
  id?: string;
  videoId: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt?: number;
  isActive: boolean;
  thumbnail?: string;
}

export interface StreamFormData {
  videoId: string;
  title: string;
  description: string;
  isActive: boolean;
}

