import React, { Component } from 'react';
import {getAuth} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {Link} from "react-router-dom";

class CircleClickerGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            circlePosition: this.getRandomPosition(),
            score: 0,
            startTime: null,
            gameCompleted: false,
        };
        this.circleClicked = false; // Flag to track circle click
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        this.setState({ startTime: new Date() });

        // Update the timer every second
        this.timerInterval = setInterval(() => {
            this.forceUpdate();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    calculateElapsedTime() {
        const { startTime } = this.state;
        if (startTime) {
            const currentTime = new Date();
            const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
            return elapsedTime.toFixed(2); // Show time with 2 decimal places
        }
        return '0.00';
    }

    getRandomPosition() {
        const maxWidth = window.innerWidth - 100; // Adjust for circle size
        const maxHeight = window.innerHeight - 100;
        const x = Math.floor(Math.random() * maxWidth);
        const y = Math.floor(Math.random() * maxHeight);
        return { x, y };
    }

    savescore = () => {
        const user = getAuth().currentUser;

        if(user){
            const userEmail = user.email;
            const firestore = getFirestore();
            const scoreTest = collection(firestore, 'CircleClickerTest');

            addDoc(scoreTest,{
                time: this.calculateElapsedTime(),
                userEmail: userEmail,
                timestamp: new Date().toString(),
            })
                .then((docRef) => {
                    console.log('Score saved with ID: ', docRef.id); //wiadomość w konsoli o dodaniu dokumentu
                })
                .catch((error) => {
                    console.error('Error saving score: ', error); //konsolowy komunikat o błędzie
                });
        }
    }

    handleCircleClick = () => {
        this.circleClicked = true;
        this.setState(
            (prevState) => ({
                circlePosition: this.getRandomPosition(),
                score: prevState.score + 1,
            }),
            () => {
                if (this.state.score >= 10) {
                    this.savescore();
                    clearInterval(this.timerInterval); // Stop the timer
                    this.setState({ gameCompleted: true });
                }
                this.circleClicked = false;
            }
        );
    };



    handleGameAreaClick = (event) => {
        const { clientX, clientY } = event;
        const { circlePosition, score } = this.state;
        const circleX = circlePosition.x;
        const circleY = circlePosition.y;
        const distance = Math.sqrt(
            (clientX - circleX) ** 2 + (clientY - circleY) ** 2
        );

        if (distance <= 50) {
            this.handleCircleClick();
        } else if (score > 0) {
            if (!this.circleClicked) {
                this.setState((prevState) => ({
                    score: prevState.score - 1,
                }));
            }
        }
    };

    render() {
        const { circlePosition, gameCompleted } = this.state;

        if (gameCompleted) {
            return (
                <div>
                    <p>Gratulacje! Ukończono test w  {this.calculateElapsedTime()} sekund.</p>
                    <Link to="/ClickTestWelcome">
                        <button type="button">
                            Spróbuj jeszcze raz
                        </button>
                    </Link>
                    <Link to="/">
                        <button type="button">
                            Wróć do Menu głównego
                        </button>
                    </Link>
                </div>
            );
        }

        const circleStyle = {
            position: 'absolute',
            top: circlePosition.y,
            left: circlePosition.x,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'blue',
            cursor: 'pointer',
        };

        const gameContainerStyle = {
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
        };

        return (
            <div
                style={gameContainerStyle}
                onClick={this.handleGameAreaClick}
            >
                <div style={circleStyle} onClick={this.handleCircleClick}></div>
                <p>Punkty: {this.state.score}</p>
                <p>Czas: {this.calculateElapsedTime()} sekund</p>
            </div>
        );
    }
}

export default CircleClickerGame;
