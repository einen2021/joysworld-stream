'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useStreams } from '@/hooks/useStreams';
import { AdminForm } from '@/components/AdminForm';
import { StreamList } from '@/components/StreamList';
import { Stream, StreamFormData } from '@/lib/types';
import { LogOut, Video } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { streams, loading, addStream, updateStream, deleteStream } = useStreams();
  const [editingStream, setEditingStream] = useState<Stream | null>(null);

  useEffect(() => {
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
        toast.success('Logged out successfully');
        router.push('/admin/login');
      }
    } catch (error: any) {
      toast.error('Logout failed');
    }
  };

  const handleSubmit = async (data: StreamFormData) => {
    if (editingStream) {
      const result = await updateStream(editingStream.id!, data);
      if (result.success) {
        toast.success('Stream updated successfully');
        setEditingStream(null);
      } else {
        toast.error(result.error || 'Failed to update stream');
      }
      return result;
    } else {
      const result = await addStream(data);
      if (result.success) {
        toast.success('Stream added successfully');
      } else {
        toast.error(result.error || 'Failed to add stream');
      }
      return result;
    }
  };

  const handleEdit = (stream: Stream) => {
    setEditingStream(stream);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const result = await deleteStream(id);
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete stream');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <AdminForm
            onSubmit={handleSubmit}
            editingStream={editingStream}
            onCancel={() => setEditingStream(null)}
          />

          <StreamList
            streams={streams}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

