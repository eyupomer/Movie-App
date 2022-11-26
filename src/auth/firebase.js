import "firebase/auth";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


//? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
export const createUser = async (email, password, navigate, displayName) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(userCredential);

//? kullanıcı profilini güncellemek için kullanılan firebase metodu
        await updateProfile(auth.currentUser, {
            displayName: displayName,
          });
        navigate("/");
        toastSuccessNotify("Registered successfully!")
    } catch (err) {
        toastErrorNotify(err.message)
    }
};


//? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
export const singIn = async (email, password, navigate) => {
    try {
        let userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        navigate("/");
        toastSuccessNotify("Logged in successfully!")
        console.log(userCredential);
    } catch (err) {
        toastErrorNotify(err.message)
    };
};

//? kullanıcının giriş yapıp yapmadığını kontrol eden firebase metodu
export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(false);
        }
    });
};

//? kullanıcının çıkış yaptığını takip eden firebase metodu
export const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully!")
};

//? Google ile giriş için kullanılan firebase metodu
export const signUpProvider = (navigate) => {
    const provider = new GoogleAuthProvider();

//? yeni açılan pop-up ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
  .then((result) => {
    navigate("/");
    toastSuccessNotify("Logged in succesfully!")
    console.log(result)
  }).catch((err) => {
    toastErrorNotify(err.message);
  });
};