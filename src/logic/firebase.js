import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

function refreshPage() {
  window.location.reload(false);
}
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('profilePic', profilePic);
      refreshPage();
    })
    .catch((error) => {
      console.log(error);
    });
};

export async function authenticateUser(email, password, isLogin) {
  try {
    const user = isLogin
      ? await signInWithEmailAndPassword(auth, email, password)
      : await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('name', user.user.displayName);
    localStorage.setItem('email', user.user.email);
    localStorage.setItem('profilePic', user.user.photoURL);
    refreshPage();
  } catch (err) {
    console.log(err);
  }
}
export async function LOGINPLS(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem('email', user.email);
      localStorage.setItem('isLoggedIn', true);
      refreshPage();

      // ...
    })
    .catch((error) => {
      alert(error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function logoutUser() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('profilePic');
    auth.signOut();
    refreshPage();
  } else {
    console.log('You are not logged in');
  }
}

// I will need to implement this function in the future
export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      localStorage.setItem(
        'isLoggedIn',
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case 'LOGOUT': {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};
