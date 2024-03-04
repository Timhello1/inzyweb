import React, { Component} from 'react';
import {auth} from "../../firebase";
import {createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {toast} from "react-toastify";
import {collection, getFirestore, addDoc} from "firebase/firestore";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            notification: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signUpWithFacebook = this.signUpWithFacebook.bind(this);
        this.signUpWithGoogle = this.signUpWithGoogle.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    signUp(e){
        e.preventDefault();
        const {email, password} = this.state;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Logged in: ", userCredential.user);
                this.showNotification('Account created successfully!');
                this.addUserToFirestore(email, userCredential.user.uid);
            })
            .catch((error) => {
                console.error("Log in error", error);
                this.showNotification('Error creating account');
            });
    }

    signUpWithFacebook() {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                console.log('Logged in with Facebook: ', userCredential.user);
                this.showNotification('signedUp in with Facebook');
                const email = userCredential.user.email;
                const userId = userCredential.user.uid;
                this.addUserToFirestore(email, userId);
            })
            .catch((error) => {
                console.error('Facebook login error', error);
                this.showNotification('Error logging in with Facebook');
            });
    }

    signUpWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                console.log('Logged in with Google: ', userCredential.user);
                this.showNotification('SignedUp with Google');
                const email = userCredential.user.email;
                const userId = userCredential.user.uid;
                this.addUserToFirestore(email, userId);
            })
            .catch((error) => {
                console.error('Google login error', error);
                this.showNotification('Error logging in with Google');
            });
    }


    showNotification(message) {
        toast.success(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
        });
    }

    async addUserToFirestore(email, userId) {
        try {
            const firestore = getFirestore();
            const usersCollection = collection(firestore, 'users');

            const newDocRef = await addDoc(usersCollection, {
                userEmail: email,
                userInfo: '',
                userType: 'default',
                isAdmin: false,
            });

            console.log('User document added to Firestore with ID: ', newDocRef.id);
        } catch (error) {
            console.error('Error adding new user to Firestore', error);
        }
    }


    render() {
        return (
            <div className='sign-in-container'>
                <form onSubmit={this.signUp}>
                    <h1>Stwórz konto</h1>
                    <input
                        type="email"
                        placeholder='wprowadź swój email'
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <input
                        type="password"
                        placeholder='wprowadź swoje konto'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <button type="submit">zarejestruj się</button>
                </form>
                <button onClick={this.signUpWithGoogle}>Zarejestruj się za pomocą konta google</button>
                {this.state.notification && (
                    <div className='notification'>
                        Account created successfully!
                    </div>
                )}
            </div>
        );
    }
}

export default SignUp;
