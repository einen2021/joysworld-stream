'use client';

import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { LiveStreamPlayer } from '@/components/LiveStreamPlayer';
import { JoinTripCTA } from '@/components/JoinTripCTA';
import { useStreams } from '@/hooks/useStreams';

export default function Home() {
  const { getActiveStream, loading } = useStreams();
  const activeStream = getActiveStream();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <HeroBanner />
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <LiveStreamPlayer stream={activeStream} loading={loading} />
        </section>
        <JoinTripCTA />
      </main>
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Joy's World. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
