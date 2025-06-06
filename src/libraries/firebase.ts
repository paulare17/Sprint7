import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCrxYaWTVZizCoJAtnZAZYQceQH9oNAXDY',
  authDomain: 'sprint7-580bb.firebaseapp.com',
  projectId: 'sprint7-580bb',
  storageBucket: 'sprint7-580bb.appspot.com',
  messagingSenderId: '862284021863',
  appId: '1:862284021863:web',
};

export const app = initializeApp(firebaseConfig);