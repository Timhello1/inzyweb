import React, { Component } from 'react';

class ShapeDrawingGame extends Component {
    state = {
        drawing: false,
        path: [],
        startTime: null,
        endTime: null,
        score: 0,
    };

    idealShape = [
        { x: 50, y: 100 },
        { x: 150, y: 100 },
        { x: 100, y: 200 },
        { x: 0, y: 200 },
    ];

    handleMouseDown = () => {
        this.setState({ drawing: true, path: [], startTime: Date.now(), score: 0 });
    };

    handleMouseMove = (event) => {
        if (this.state.drawing) {
            const { clientX, clientY } = event;
            this.setState((prevState) => ({
                path: [...prevState.path, { x: clientX, y: clientY }],
            }));
        }
    };

    handleMouseUp = () => {
        if (this.state.drawing) {
            this.setState({ drawing: false, endTime: Date.now() }, () => {
                this.evaluateShape();
            });
        }
    };

    evaluateShape = () => {
        const { path, startTime, endTime } = this.state;

        if (!endTime) {
            return; // Drawing was interrupted before completion
        }

        const totalPoints = this.idealShape.length;

        // Ensure the path has the same number of points as the ideal shape
        if (path.length !== totalPoints) {
            this.setState({ score: 0 });
            return;
        }

        // Calculate accuracy
        const matchingPoints = path.filter((point, index) => {
            const idealPoint = this.idealShape[index];
            if (!idealPoint) {
                return false; // Handle cases where idealPoint is undefined
            }
            const distance = Math.sqrt(
                (point.x - idealPoint.x) ** 2 + (point.y - idealPoint.y) ** 2
            );
            return distance < 10; // Define a tolerance for accuracy
        }).length;

        const accuracy = matchingPoints / totalPoints;

        // Calculate time taken in seconds
        const timeTaken = (endTime - startTime) / 1000;

        // Calculate speed (number of points per second)
        const speed = totalPoints / timeTaken;

        // Calculate the score based on accuracy and speed
        const score = accuracy * speed;

        this.setState({ score });
    };


    render() {
        const { path, drawing, score } = this.state;

        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    background: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '300px',
                        height: '300px',
                        border: '1px solid #000',
                        position: 'relative',
                    }}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                >
                    {drawing && (
                        <svg
                            width="100%"
                            height="100%"
                            style={{ position: 'absolute', top: 0, left: 0 }}
                        >
                            {path.map((point, index) => (
                                <circle
                                    key={index}
                                    cx={point.x}
                                    cy={point.y}
                                    r="3"
                                    fill="blue"
                                />
                            ))}
                        </svg>
                    )}
                </div>
                <div style={{ marginTop: '20px' }}>
                    {score > 0 && <p>Your score: {score.toFixed(2)}</p>}
                </div>
            </div>
        );
    }
}

export default ShapeDrawingGame;
