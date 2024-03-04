import React, { Component} from 'react';
import { auth } from "../../firebase";
import {
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    getAuth
} from "firebase/auth";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            notification: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signInWithFacebook = this.signInWithFacebook.bind(this);  // Bind the method
        this.signInWithGoogle = this.signInWithGoogle.bind(this);      // Bind the method
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }



    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    signIn(e){
        e.preventDefault();
        const {email, password} = this.state;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Logged in: ", userCredential.user);
                this.showNotification('success', 'Zalogowany!');
            })
            .catch((error) => {
                console.error("Log in error", error);
                this.showNotification('error', 'Login failed. Please check your credentials.');
            });
    }

    // Function to handle Facebook login
    signInWithFacebook = () => {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                this.showNotification('success', 'zalogowany');

            })
            .catch((error) => {
                console.error('Facebook login error', error);
                this.showNotification('error', 'Login failed. Please check your credentials.');
            });
    }

    signInWithGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log('Logged in with Google:', user);
                this.showNotification('success', 'zalogowany!');

            })
            .catch((error) => {
                console.error('Google login error', error);
                this.showNotification('error', 'Login failed. Please check your credentials.');
            });
    }

    showNotification(type, message) {
        // Use toast.success for success notification and toast.error for error notification
        toast[type](message, {
            position: 'top-right',
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    render() {
        return (
            <div className='sign-in-container'>
                <form onSubmit={this.signIn}>
                    <h1>Zaloguj się</h1>
                    <input
                        type="email"
                        placeholder='Podaj email'
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <input
                        type="password"
                        placeholder='Podaj hasło'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <button type="submit">Zaloguj</button>
                </form>

                <button onClick={this.signInWithGoogle}>Zaloguj się za pomocą konta Google</button>
                <Link to="/SignUp">Nie masz konta? Kliknij tutaj</Link>
                {this.state.notification && (
                    <div className='notification'>
                        Logged In!
                    </div>
                )}
            </div>
        );
    }
}

export default Login;
