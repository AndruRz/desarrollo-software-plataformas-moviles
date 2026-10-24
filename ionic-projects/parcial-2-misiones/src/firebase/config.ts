import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAbeMCpcEP--CgDJiZjylF7ZYRQIr9rZGU',
  authDomain: 'desarrolloappmoviles-67724.firebaseapp.com',
  databaseURL: 'https://desarrolloappmoviles-67724-default-rtdb.firebaseio.com',
  projectId: 'desarrolloappmoviles-67724',
  storageBucket: 'desarrolloappmoviles-67724.firebasestorage.app',
  messagingSenderId: '419353777937',
  appId: '1:419353777937:web:27c57a54f64300b1bc1eb0',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const rtdb = getDatabase(app);
