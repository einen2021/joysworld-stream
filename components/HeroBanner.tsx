'use client';

import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroBanner() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800',
          'dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900'
        )}
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-gray-900/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Watch Live Travel Adventures
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
            Explore the World in Real-Time
          </p>
          <p className="text-sm sm:text-base text-white/80 drop-shadow-sm">
            Join us as we discover breathtaking destinations and create unforgettable memories
          </p>
        </div>
      </div>
    </section>
  );
}

