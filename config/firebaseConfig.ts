import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCHCvdM1hpmIUjysg_wid64UOu8gBgeZk8",
  authDomain: "cook-it-1ad0b.firebaseapp.com",
  projectId: "cook-it-1ad0b",
  storageBucket: "cook-it-1ad0b.appspot.com",
  messagingSenderId: "5466935336",
  appId: "1:5466935336:web:eb6154aa9a1873bd61651d"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)