'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Stream, StreamFormData } from '@/lib/types';

export function useStreams() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      setError('Database not initialized');
      return;
    }

    const streamsRef = collection(db, 'streams');
    const q = query(streamsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        try {
          const streamsArray: Stream[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              videoId: data.videoId,
              title: data.title,
              description: data.description,
              createdAt: data.createdAt?.toMillis?.() || data.createdAt || Date.now(),
              updatedAt: data.updatedAt?.toMillis?.() || data.updatedAt,
              isActive: data.isActive,
              thumbnail: data.thumbnail,
            };
          });
          setStreams(streamsArray);
          setLoading(false);
          setError(null);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addStream = async (stream: StreamFormData): Promise<{ success: boolean; error?: string }> => {
    if (!db) {
      return { success: false, error: 'Database not initialized' };
    }
    try {
      const streamsRef = collection(db, 'streams');
      const newStream = {
        ...stream,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        thumbnail: `https://img.youtube.com/vi/${stream.videoId}/maxresdefault.jpg`,
      };
      await addDoc(streamsRef, newStream);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateStream = async (id: string, updates: Partial<Stream>): Promise<{ success: boolean; error?: string }> => {
    if (!db) {
      return { success: false, error: 'Database not initialized' };
    }
    try {
      const streamRef = doc(db, 'streams', id);
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.now(),
      };
      // Remove id from updates if present
      delete updateData.id;
      await updateDoc(streamRef, updateData);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deleteStream = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!db) {
      return { success: false, error: 'Database not initialized' };
    }
    try {
      const streamRef = doc(db, 'streams', id);
      await deleteDoc(streamRef);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const getActiveStream = (): Stream | null => {
    return streams.find(s => s.isActive) || null;
  };

  return {
    streams,
    loading,
    error,
    addStream,
    updateStream,
    deleteStream,
    getActiveStream,
  };
}

