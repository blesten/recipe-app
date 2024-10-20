import { FB_API_KEY, FB_APP_ID, FB_AUTH_DOMAIN, FB_MESSAGING_SENDER_ID, FB_PROJECT_ID, FB_STORAGE_BUCKET } from '@/utils/constant';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)