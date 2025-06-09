import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCrxYaWTVZizCoJAtnZAZYQceQH9oNAXDY',
  authDomain: 'sprint7-580bb.firebaseapp.com',
  projectId: 'sprint7-580bb',
  storageBucket: 'sprint7-580bb.appspot.com',
  messagingSenderId: '862284021863',
  appId: '1:862284021863:web',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

console.log('Firebase initialized with project:', firebaseConfig.projectId);
export const db = getFirestore(app);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });


