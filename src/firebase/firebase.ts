// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD0swxWtYTjVQH33wzr0YMeewl6j_Omppc',
  authDomain: 'term-project-371.firebaseapp.com',
  projectId: 'term-project-371',
  storageBucket: 'term-project-371.appspot.com',
  messagingSenderId: '986762358488',
  appId: '1:986762358488:web:49486344fd130afd8eb1ad',
  measurementId: 'G-2B4LVY46VX'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export { app, analytics, auth, db, storage }
