import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyDBxeDRTbIEW_B14lN7L76AhIOhD_N4GM0",
    authDomain: "mobiledeveksamen.firebaseapp.com",
    projectId: "mobiledeveksamen",
    storageBucket: "mobiledeveksamen.firebasestorage.app",
    messagingSenderId: "1016903516186",
    appId: "1:1016903516186:web:f16fccbf5dcd99657711a3"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(firebaseApp);
let firebaseAuth
if(Platform.OS === 'web') {
    firebaseAuth = getAuth(firebaseApp)
} else {
    firebaseAuth = initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    })
}
export { firebaseApp, firebaseAuth, firebaseDB }

