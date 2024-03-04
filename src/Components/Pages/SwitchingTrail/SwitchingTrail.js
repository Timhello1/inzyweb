import React, { useState, useEffect } from 'react';
import "../../../Styles/TrailMakingTest.css";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {Link} from "react-router-dom";

/**
 * Komponent obsługujący test Switch trail
 * @returns {JSX.Element}
 * @constructor
 */
const SwitchingTrail = () => {
    const [currentNumber, setCurrentNumber] = useState(1); //stan aktualnego numeru
    const [completedNumbers, setCompletedNumbers] = useState([]); //stan zakończonych numerów
    const [startTime, setStartTime] = useState(null); //stan czasu początku
    const [endTime, setEndTime] = useState(null); //stan czasu zakończenia
    const [circlePositions, setCirclePositions] = useState([]); //stan pozycji punktów

    /**
     * Hook generujący początkowe pozycje punktów
     */
    useEffect(() => {
        const initialCirclePositions = [];
        for (let i = 1; i <= 25; i++) {
            initialCirclePositions.push(getRandomPosition(initialCirclePositions));
        }
        setCirclePositions(initialCirclePositions);
    }, []);

    /**
     * Funkcja obsługująca kliknięcie punktu w teście
     * @param number
     */
    const handleCircleClick = (number) => {
        if (number === currentNumber) {
            if (currentNumber === 1) {
                setStartTime(new Date()); //jeśli punkt jest pierwszy rozpocznij timer testu
            }

            if (currentNumber === 25) {
                setEndTime(new Date()); //jeśli punkt jest ostatni (w tym przypadku 25) zakończ timer testu
            }

            setCurrentNumber(currentNumber + 1); //inkrementacja aktualnego numeru
            setCompletedNumbers([...completedNumbers, number]); //aktualizacja numerów klikniętych

            // Aktualizuje pozycje wszystkich kółek po poprawnym kliknięciu
            const updatedPositions = [];
            for (let i = 1; i <= 25; i++) {
                updatedPositions.push(getRandomPosition(updatedPositions));
            }
            setCirclePositions(updatedPositions);
        }
    };
    /**
     * Funkcja generująca losową pozycję punktu z założoną kolizją
     * @param positions - (Array) aktualne pozycje kółek
     * @returns {{top: number, left: number}}
     */
    const getRandomPosition = (positions) => {
        const maxX = window.innerWidth - 60; // Maksymalna szerokość ekranu - dostosowana na podstawie wielkości kółka
        const maxY = window.innerHeight - 60; // Maksymalna wysokość ekranu - dostosowana na podstawie wielkości kółka


        while (true) {
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * (maxY - 100)) + 100;
            const newPosition = { left: randomX, top: randomY };

            // Sprawdza, czy nowa pozycja nie nakłada się na istniejące
            let overlap = false;
            for (const existingPosition of positions) {
                if (
                    Math.abs(newPosition.left - existingPosition.left) < 60 &&
                    Math.abs(newPosition.top - existingPosition.top) < 60
                ) {
                    overlap = true;
                    break;
                }
            }

            if (!overlap) {
                return newPosition;
            }
        }
    };

    /**
     * Funkcja zapisująca punktację
     */
    const savescore = () => {
        const user = getAuth().currentUser; //pozyskanie aktualnie zalogowanego użytkownika

        if(user){ //jeśli użytkownik jest zalogowany
            const userEmail = user.email; //pozyskanie maila zalogowanego użytkownika
            const firestore = getFirestore(); //referencja firestore
            const scoreTest = collection(firestore,'SwitchTrailTest'); //nazwa kolekcji

            addDoc(scoreTest,{ //dodanie dokumentu z podanymi polami
                time: (endTime - startTime) / 1000,
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

    /**
     * Wywołanie funkcji savescore() przy zmianie endTime i startTime
     */
    useEffect(() => {
        if (endTime && startTime) {
            savescore();
        }
    }, [endTime, startTime]);

    /**
     * Funkcja renderująca punkty
     * @returns {*[]}
     */
    const renderCircles = () => {
        const circles = [];
        for (let i = 1; i <= 25; i++) {
            const isCompleted = completedNumbers.includes(i);
            const circleColor = isCompleted ? 'blue' : 'blue';
            const isVisible = currentNumber >= i;
            const circleStyle = isVisible ? circlePositions[i - 1] : {};

            circles.push(
                <div
                    key={i}
                    className={`circle ${isVisible ? 'visible' : 'hidden'}`}
                    style={{
                        ...circleStyle,
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

    /**
     * Funkcja obliczająca zabrany czas i formatująca go na tekst
     * @returns {string}
     */
    const calculateElapsedTime = () => {
        if (startTime && endTime) {
            const elapsedMilliseconds = endTime - startTime;
            return `${(elapsedMilliseconds / 1000).toFixed(2)} sekund`;
        }
        return 'N/A';
    };

    return (
        <div>
            <div className="circles-container">{renderCircles()}</div>
            {endTime && (
                <div className="result">
                    <p>Test ścieżki ukończony: {calculateElapsedTime()}</p>
                    <Link to="/SwitchTrailWelcome">
                        <button type="button">
                            Spróbuj jeszcze raz
                        </button>
                    </Link>
                    <Link to="/">
                        <button type="button">
                            Wróć do menu głównego
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SwitchingTrail;
