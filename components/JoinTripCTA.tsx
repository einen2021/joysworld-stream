'use client';

import { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  Users, 
  CreditCard, 
  Star, 
  Bell,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const tripInfo = [
  {
    icon: Plane,
    label: 'Duration',
    value: '7-14 Days',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: MapPin,
    label: 'Destinations',
    value: '3-5 Unique Locations',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    icon: Users,
    label: 'Group Size',
    value: '15-30 Travelers',
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    icon: CreditCard,
    label: 'Cost',
    value: 'Affordable, All-Inclusive',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: Star,
    label: 'Experience Level',
    value: 'All skill levels welcome',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
];

export function JoinTripCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      if (!db) {
        toast.error('Database not initialized');
        setLoading(false);
        return;
      }

      // Save email to Firestore collection
      const subscriptionsRef = collection(db, 'tripSubscriptions');
      await addDoc(subscriptionsRef, {
        email: email.toLowerCase().trim(),
        createdAt: Timestamp.now(),
        status: 'active',
        source: 'website',
      });

      toast.success('Thanks! We\'ll notify you about our next adventure.');
      setEmail('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error: any) {
      console.error('Error saving email:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Next Adventure
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the world with a community of passionate travelers
            </p>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {tripInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    'p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700',
                    'bg-white dark:bg-gray-800',
                    'hover:shadow-lg transition-shadow duration-300',
                    'hover:border-blue-300 dark:hover:border-blue-600'
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      'p-2 rounded-lg bg-gray-100 dark:bg-gray-700',
                      'flex-shrink-0'
                    )}>
                      <Icon className={cn('w-5 h-5 sm:w-6 sm:h-6', info.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {info.label}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Join Next Trip Email Form */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6 sm:p-8 mb-8 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Join Our Next Trip
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your email to get notified when we announce our next adventure
              </p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={cn(
                      'w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600',
                      'bg-white dark:bg-gray-700',
                      'text-gray-900 dark:text-white',
                      'placeholder-gray-500 dark:placeholder-gray-400',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                      'text-sm sm:text-base'
                    )}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600',
                    'text-white font-semibold rounded-lg',
                    'hover:from-blue-700 hover:to-indigo-700',
                    'transform hover:scale-105 active:scale-95',
                    'transition-all duration-200 shadow-lg hover:shadow-xl',
                    'flex items-center justify-center space-x-2',
                    'text-sm sm:text-base whitespace-nowrap',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                  )}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Joining...</span>
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Joined!</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-5 h-5" />
                      <span>Join Trip</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-8">
            <button
              className={cn(
                'px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600',
                'text-white font-semibold rounded-lg',
                'hover:from-blue-700 hover:to-indigo-700',
                'transform hover:scale-105 active:scale-95',
                'transition-all duration-200 shadow-lg hover:shadow-xl',
                'text-base sm:text-lg'
              )}
            >
              Reserve Your Spot
            </button>
          </div>

          {/* Email Subscription */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Get Notified About Our Next Trip
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={cn(
                  'flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-700',
                  'text-gray-900 dark:text-white',
                  'placeholder-gray-500 dark:placeholder-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'text-sm sm:text-base'
                )}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg',
                  'hover:bg-blue-700 transition-colors duration-200',
                  'flex items-center justify-center space-x-2',
                  'text-sm sm:text-base',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

