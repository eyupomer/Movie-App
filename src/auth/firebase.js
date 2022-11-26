import "firebase/auth";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';


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
    } catch (err) {
        console.log(err)
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
        console.log(userCredential);
    } catch (err) {
        console.log(err)
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
    signOut(auth)
};

//? Google ile giriş için kullanılan firebase metodu
export const signUpProvider = (navigate) => {
    const provider = new GoogleAuthProvider();

//? yeni açılan pop-up ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
  .then((result) => {
    navigate("/main");
    console.log(result)
  }).catch((error) => {
    console.log(error);
  });
};