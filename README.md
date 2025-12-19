# Joy's World - Live Travel Platform

A modern, mobile-first Next.js travel platform that allows admins to manage live YouTube stream videos. The app displays live travel content with a beautiful travel-themed UI.

## Features

- 🎥 **Live Stream Management**: Admin dashboard to add, edit, and delete YouTube live streams
- 📱 **Mobile-First Design**: Responsive design optimized for mobile devices
- 🌓 **Dark/Light Mode**: System preference-based theme with manual toggle
- 🔐 **Secure Authentication**: Firebase Auth for admin access
- 🎨 **Modern UI**: Travel-themed design with Lucide React icons
- ⚡ **Real-time Updates**: Firebase Realtime Database for instant stream updates
- 🎯 **Join Next Trip CTA**: Email subscription form for trip notifications

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Video Player**: react-youtube
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project with Realtime Database enabled
- Firebase Authentication enabled (Email/Password)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd joysworld-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Fill in your Firebase configuration in `.env.local`:
   - Go to Firebase Console → Project Settings
   - Copy your Firebase config values
   - Paste them into `.env.local`

5. Set up Firebase Realtime Database:
   - Go to Firebase Console → Realtime Database
   - Create a database (start in test mode for development)
   - Update your database URL in `.env.local`

6. Set up Firebase Authentication:
   - Go to Firebase Console → Authentication
   - Enable Email/Password sign-in method
   - Create an admin user account

7. Run the development server:
```bash
npm run dev
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Security Rules

For production, update your Firebase Realtime Database rules:

```json
{
  "rules": {
    "streams": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

This allows:
- Anyone to read streams (public access)
- Only authenticated users to write streams (admin only)

## Project Structure

```
joysworld-web/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Public live stream page
│   ├── admin/
│   │   ├── layout.tsx      # Admin layout with auth protection
│   │   ├── page.tsx        # Admin dashboard
│   │   └── login/
│   │       └── page.tsx    # Admin login page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── HeroBanner.tsx      # Hero section
│   ├── LiveStreamPlayer.tsx # YouTube player component
│   ├── JoinTripCTA.tsx     # Call-to-action section
│   ├── AdminForm.tsx       # Stream form (add/edit)
│   ├── StreamList.tsx      # List of all streams
│   └── ThemeToggle.tsx     # Dark/light mode toggle
├── hooks/
│   ├── useAuth.ts          # Authentication hook
│   └── useStreams.ts       # Streams data hook
├── lib/
│   ├── firebase.ts         # Firebase configuration
│   ├── auth.ts             # Auth utilities
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Usage

### Admin Dashboard

1. Navigate to `/admin/login`
2. Sign in with your Firebase admin credentials
3. Add a new stream by:
   - Pasting a YouTube URL, video ID, or iframe embed code
   - Entering a title (required)
   - Adding a description (optional)
   - Toggling the "Active" status
4. Edit existing streams by clicking the "Edit" button
5. Delete streams by clicking the "Delete" button (with confirmation)

### Public Page

- View the active live stream on the homepage
- Browse stream information
- Subscribe to email notifications for the next trip

## YouTube Video ID Formats Supported

The app automatically extracts video IDs from:
- YouTube URLs: `https://www.youtube.com/watch?v=VIDEO_ID`
- Short URLs: `https://youtu.be/VIDEO_ID`
- Embed codes: `<iframe src="https://www.youtube.com/embed/VIDEO_ID">`
- Direct video IDs: `VIDEO_ID`

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## Environment Variables

Required environment variables (see `.env.local.example`):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
