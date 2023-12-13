import React, { useState, useMemo } from 'react';
import "../../Styles/TrailMakingTest.css";

const ReitanTrail = () => {
    const [currentNumber, setCurrentNumber] = useState(1);
    const [completedNumbers, setCompletedNumbers] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const circlePositions = useMemo(() => generateRandomPositions(), []); // Generate positions only once

    function generateRandomPositions() {
        const positions = [];
        const maxX = window.innerWidth - 60; // Adjust this value based on circle size
        const maxY = window.innerHeight - 60; // Adjust this value based on circle size

        for (let i = 0; i < 25; i++) {
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * (maxY- 100)+100);
            positions.push({ left: randomX, top: randomY });
        }

        return positions;
    }

    const handleCircleClick = (number) => {
        if (number === currentNumber) {
            if (currentNumber === 1) {
                setStartTime(new Date());
            }

            if (currentNumber === 25) {
                setEndTime(new Date());
            }

            setCurrentNumber(currentNumber + 1);
            setCompletedNumbers([...completedNumbers, number]);
        }
    };

    const renderCircles = () => {
        const circles = [];
        for (let i = 1; i <= 25; i++) {
            const isCompleted = completedNumbers.includes(i);
            const circleColor = isCompleted ? 'green' : 'blue';
            const isVisible = currentNumber >= i;

            circles.push(
                <div
                    key={i}
                    className={`circle ${isVisible ? 'visible' : 'hidden'}`}
                    style={{
                        ...circlePositions[i - 1],
                        backgroundColor: circleColor,
                        position: 'absolute',
                    }}
                    onClick={() => handleCircleClick(i)}
                >
                    {i}
                </div>
            );
        }
        return circles;
    };

    const calculateElapsedTime = () => {
        if (startTime && endTime) {
            const elapsedMilliseconds = endTime - startTime;
            return `${(elapsedMilliseconds / 1000).toFixed(2)} seconds`;
        }
        return 'N/A';
    };

    return (
        <div>
            <div className="circles-container">{renderCircles()}</div>
            {endTime && (
                <div className="result">
                    <p>Trail Making Test completed in: {calculateElapsedTime()}</p>
                </div>
            )}
        </div>
    );
};

export default ReitanTrail;
