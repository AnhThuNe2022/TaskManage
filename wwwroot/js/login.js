import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb81GrkZnxhHTMBFpfLDaeSpJw9aL_3RI",
    authDomain: "task-manager-login-9eca8.firebaseapp.com",
    projectId: "task-manager-login-9eca8",
    storageBucket: "task-manager-login-9eca8.appspot.com",
    messagingSenderId: "177777557725",
    appId: "1:177777557725:web:194439253a981f94505b34",
    measurementId: "G-0FYD8KT6EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

$("#google-login").click(function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const idToken = result.user.getIdToken();
            idToken.then((token) => {
                CallAjax("/Account/LoginExternal", { typeExternal: "Google", idToken: token }, function (data) {
                    window.location.href = '/';
                });
            });
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}); 
