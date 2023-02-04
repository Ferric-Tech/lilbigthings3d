/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    auth = getAuth();

    get userID() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            return user.uid;
            } 
            return null
        });
        // User is signed out
        // ...
        return null
    } 

    signUpWithEmail(email: string, password: string) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            });
    }



}
