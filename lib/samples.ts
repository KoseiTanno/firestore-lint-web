/**
 * Sample rules shown in the UI so a first-time visitor can try the tool
 * without pasting their own file.
 */
export const SAMPLE_RULES = {
  vulnerable: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 1, 1);
    }
  }
}`,

  clean: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null
        && request.auth.uid == userId
        && request.resource.data.diff(resource.data).affectedKeys()
            .hasOnly(['displayName', 'photoURL']);
      allow delete: if false;
    }
  }
}`,
} as const

export type SampleKey = keyof typeof SAMPLE_RULES
