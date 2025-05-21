import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET_NAME as string,
  });
}

export const db = getFirestore();
export const bucket = getStorage().bucket();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(globalThis as any)._firestoreSettingsApplied) {
  // This fixes hot reload error
  db.settings({ ignoreUndefinedProperties: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any)._firestoreSettingsApplied = true;
}
