import React, { Component} from 'react';
import { auth } from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signIn = this.signIn.bind(this);
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
            })
            .catch((error) => {
                console.error("Log in error", error);
            });
    }

    render() {
        return (
            <div className='sign-in-container'>
                <form onSubmit={this.signIn}>
                    <h1>Log in</h1>
                    <input
                        type="email"
                        placeholder='enter your email'
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <input
                        type="password"
                        placeholder='enter your password'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <button type="submit">Log In</button>
                </form>

            </div>
        );
    }
}

export default Login;
