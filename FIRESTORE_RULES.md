# Firestore Security Rules

## Current Setup
Your app now uses **Firestore** instead of Realtime Database. You need to update your Firestore security rules.

## How to Fix

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **joysworld-c5ca7**
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Streams collection - public read, authenticated write
    match /streams/{streamId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

6. Click **Publish** to save the rules

## What These Rules Do

- **`allow read: if true`** - Allows anyone (including unauthenticated users) to read streams. This is needed for the public page to display live streams.
- **`allow create, update, delete: if request.auth != null`** - Only allows authenticated users (logged-in admins) to create, update, or delete streams.

## Alternative: More Restrictive Rules (Recommended for Production)

If you want more control and validation, you can use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /streams/{streamId} {
      allow read: if true;
      allow create: if request.auth != null 
        && request.resource.data.keys().hasAll(['videoId', 'title', 'description', 'isActive', 'createdAt', 'updatedAt', 'thumbnail'])
        && request.resource.data.videoId is string
        && request.resource.data.videoId.size() == 11
        && request.resource.data.title is string
        && request.resource.data.title.size() > 0
        && request.resource.data.title.size() <= 200
        && request.resource.data.description is string
        && request.resource.data.description.size() <= 1000
        && request.resource.data.isActive is bool
        && request.resource.data.createdAt is timestamp
        && request.resource.data.updatedAt is timestamp;
      
      allow update: if request.auth != null
        && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['videoId', 'title', 'description', 'isActive', 'updatedAt', 'thumbnail'])
        && request.resource.data.videoId is string
        && request.resource.data.videoId.size() == 11
        && request.resource.data.title is string
        && request.resource.data.title.size() > 0
        && request.resource.data.title.size() <= 200
        && request.resource.data.description is string
        && request.resource.data.description.size() <= 1000
        && request.resource.data.isActive is bool;
      
      allow delete: if request.auth != null;
    }
  }
}
```

## Testing

After updating the rules:
1. Make sure you're logged in as an admin
2. Try adding a new stream
3. The error should be resolved

## Troubleshooting

If you still get permission errors:
- Verify you're logged in (check the admin dashboard shows your email)
- Check that the rules were published successfully
- Wait a few seconds for the rules to propagate
- Clear your browser cache and try again
- Make sure you're editing **Firestore Database** rules, not Realtime Database rules

## Migration Notes

- Your app has been migrated from Realtime Database to Firestore
- Data structure remains the same, but stored in Firestore documents instead
- All timestamps are now stored as Firestore Timestamp objects
- The `streams` collection in Firestore replaces the `streams` node in Realtime Database

