import React, { useState, useEffect } from 'react';
import "../../../Styles/DigitalSubstitutionTest.css"

const symbols = ['$', '#', '@', '%', '&', '*', '+', '-', '?', '!'];


const DigitSubstitutionTest = ({totalSymbols}) => {
    const [randomNumberArray, setRandomNumberArray] = useState([]);
    const [userInputArray, setUserInputArray] = useState(Array(totalSymbols).fill(''));
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    let timerInterval; // Declare timerInterval variable her

    useEffect(() => {
        generateRandomNumberArray();
        setStartTime(new Date().getTime());
    }, []);

    useEffect(() => {
        if (score === totalSymbols) {
            // All symbols have been correctly matched, stop the timer
            clearInterval(timerInterval);
        }
    }, [score]);

    useEffect(() => {
        // Update elapsed time every second
        const timerInterval = setInterval(() => {
            if (startTime) {
                const currentTime = new Date().getTime();
                const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
                setElapsedTime(elapsedSeconds);
            }
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [startTime]);

    const generateRandomNumberArray = () => {
        const newArray = [];
        for (let i = 0; i < totalSymbols; i++) {
            newArray.push(Math.floor(Math.random() * 10)); // Generate a random number between 0 and 9
        }
        setRandomNumberArray(newArray);
        setUserInputArray(Array(totalSymbols).fill(''));
        setScore(0); // Reset the score when a new set of symbols is generated
        setStartTime(new Date().getTime()); // Restart the timer
        setElapsedTime(0); // Reset the elapsed time
    };

    const handleInputChange = (event, index) => {
        const value = event.target.value;
        const updatedInputArray = [...userInputArray];
        updatedInputArray[index] = value;
        setUserInputArray(updatedInputArray);
    };

    const checkAnswers = () => {
        let currentScore = 0;
        for (let i = 0; i < totalSymbols; i++) {
            if (symbols[randomNumberArray[i]] === userInputArray[i]) {
                currentScore++;
            }
        }
        setScore(currentScore);
    };

    return (
        <div>
            <h1>Digit Symbol Substitution Test</h1>

            <div className="symbol-bar">
                {symbols.map((symbol, index) => (
                    <div key={index} className="symbol-bar-item">
                        <span className="symbol">{symbol}</span>
                        <span className="digit">{index}</span>
                    </div>
                ))}
            </div>

            <div className="game-container">
                <div className="random-array">
                    {randomNumberArray.map((number, index) => (
                        <span key={index} className="random-number">
                            {number}
                        </span>
                    ))}
                </div>

                <div className="user-input-array">
                    {userInputArray.map((input, index) => (
                        <input
                            key={index}
                            type="text"
                            className="input-field"
                            value={input}
                            onChange={(event) => handleInputChange(event, index)}
                            maxLength={1}
                        />
                    ))}
                </div>

                <button onClick={checkAnswers}>Check Answers</button>

                <p>Score: {score}</p>
                <p>Elapsed Time: {elapsedTime} seconds</p>
            </div>
        </div>
    );
};

export default DigitSubstitutionTest;
