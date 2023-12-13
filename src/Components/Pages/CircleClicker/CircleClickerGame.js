import React, { Component } from 'react';

class CircleClickerGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            circlePosition: this.getRandomPosition(),
            score: 0,
            startTime: null,
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

    handleCircleClick = () => {
        this.circleClicked = true;
        this.setState(
            (prevState) => ({
                circlePosition: this.getRandomPosition(),
                score: prevState.score + 1,
            }),
            () => {
                if (this.state.score >= 10) {
                    clearInterval(this.timerInterval); // Stop the timer
                    alert(`Congratulations! You completed the game in ${this.calculateElapsedTime()} seconds.`);
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
        const { circlePosition } = this.state;

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
                <p>Score: {this.state.score}</p>
                <p>Time: {this.calculateElapsedTime()} seconds</p>
            </div>
        );
    }
}

export default CircleClickerGame;
