import * as firebase from 'firebase/app';
require('firebase/auth');
require('firebase/storage');

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID 
};

firebase.initializeApp(config);

const collectionPhotosRef = firebase.storage().ref(`collection-photos/`);
const profilePhotosRef = firebase.storage().ref('profile-photos/');

export { firebase, collectionPhotosRef, profilePhotosRef };