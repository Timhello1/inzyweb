import React, {useState, useMemo, useEffect} from 'react';
import "../../../Styles/TrailMakingTest.css";
import {Link} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";

/**
 * Komponent odpowiadający za test Reitana
 * @returns {JSX.Element}
 * @constructor
 */
const ReitanTrail = () => {
    const [currentNumber, setCurrentNumber] = useState(1); // Numer bieżącego kroku
    const [completedNumbers, setCompletedNumbers] = useState([]); // Tablica kroków ukończonych
    const [startTime, setStartTime] = useState(null); // Czas rozpoczęcia testu
    const [endTime, setEndTime] = useState(null); // Czas zakończenia testu
    const [testCompleted, setTestCompleted] = useState(false);

    const circlePositions = useMemo(() => generateRandomPositions(), []); // Obliczanie pozycji kółek tylko raz przy pierwszym renderowaniu komponentu

    /**
     * Funkcja generująca losowe pozycje punktów
     * @returns {*[]}
     */
    function generateRandomPositions() {
        const positions = []; // Inicjalizacja pustej tablicy na pozycje kółek
        const maxX = window.innerWidth - 60; // Maksymalna szerokość ekranu minus rozmiar kółka
        const maxY = window.innerHeight - 60; // Maksymalna wysokość ekranu minus rozmiar kółka

        for (let i = 0; i < 25; i++) { // Pętla generująca pozycje dla 25 kółek
            let randomX, randomY; // Inicjalizacja zmiennych na losowe pozycje kółka
            do {
                randomX = Math.floor(Math.random() * maxX); // Losowanie pozycji X
                randomY = Math.floor(Math.random() * (maxY - 100) + 100); // Losowanie pozycji Y z minimalnym odstępem od górnej krawędzi
            } while (positions.some(pos => Math.abs(pos.left - randomX) < 60 && Math.abs(pos.top - randomY) < 60)); // Sprawdzanie, czy nowa pozycja nie koliduje z istniejącymi

            positions.push({ left: randomX, top: randomY }); // Dodanie wygenerowanej pozycji do tablicy
        }

        return positions; // Zwracanie tablicy z pozycjami dla kółek
    }
    
    /**
     * Funkcja obsługująca kliknięcie punktu
     * @param number - numer klikniętego punktu
     */
    const handleCircleClick = (number) => {
        if (number === currentNumber) {
            if (currentNumber === 1) {
                setStartTime(new Date()); //ustawienie czasu rozpoczęcia testu
            }

            if (currentNumber === 25) {
                setEndTime(new Date()); //utawienie czasu zakończenia testu
                setTestCompleted(true);
            }

            setCurrentNumber(currentNumber + 1); // Zwiększenie numeru bieżącego kroku
            setCompletedNumbers([...completedNumbers, number]); // Dodanie kroku do ukończonych kroków
        }
    };
    /**
     * Generowanie kółek
     * @returns {*[]}
     */
    const renderCircles = () => {
        const circles = []; // Inicjalizacja pustej tablicy na komponenty kółek
        for (let i = 1; i <= 25; i++) { // Pętla generująca komponenty dla 25 kółek
            const isCompleted = completedNumbers.includes(i); // Sprawdzenie, czy krok jest ukończony
            const circleColor = testCompleted ? 'rgba(255, 255, 255, 0)' : isCompleted ? 'green' : 'blue'; // Ustalenie koloru kółka na podstawie stanu ukończenia
            const isVisible = currentNumber >= i; // Sprawdzenie, czy kółko jest widoczne w zależności od numeru bieżącego kroku

            circles.push( // Dodawanie komponentu kółka do tablicy
                <div
                    key={i} // Unikalny klucz dla komponentu
                    className={`circle ${isVisible ? 'visible' : 'hidden'}`} // Dodawanie klasy CSS w zależności od widoczności
                    style={{
                        ...circlePositions[i - 1], // Ustawienie pozycji kółka na podstawie wcześniej wygenerowanych pozycji
                        backgroundColor: circleColor, // Ustawienie koloru tła kółka
                        position: 'absolute', // Ustawienie pozycji absolutnej
                    }}
                    onClick={() => handleCircleClick(i)} // Obsługa kliknięcia w kółko
                >
                    {i}
                </div> // Wyświetlenie numeru kółka
            );
        }
        return circles; // Zwracanie tablicy komponentów kółek
    };

    /**
     * Funkcja zapisująca punktację
     */
    const savescore = () => {
        const user = getAuth().currentUser; //pozyskanie aktualnie zalogowanego użytkownika

        if(user){ //jeśli użytkownik jest zalogowany
            const userEmail = user.email; //pozyskanie maila zalogowanego użytkownika
            const firestore = getFirestore(); //referencja firestore
            const scoreTest = collection(firestore,'ReitanTest'); //nazwa kolekcji

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
     * Funkcja obliczająca zabrany czas
     * @returns {string} - ilość sekund
     */
    const calculateElapsedTime = () => {
        if (startTime && endTime) {
            const elapsedMilliseconds = endTime - startTime;
            return `${(elapsedMilliseconds / 1000).toFixed(2)} sekund`;

        }
        return 'N/A';
    };

    /**
     * Wywołanie funkcji savescore() przy zmianie endTime i startTime
     */
    useEffect(() => {
        if (endTime && startTime) {
            savescore();
        }
    }, [endTime, startTime]);

    const wordStyle = {
        fontSize: "100px", // Adjust the size as needed
    };

    const buttonStyle = {
        fontSize: "40px", // Adjust the size as needed
        padding: "10px 20px", // Adjust the padding as needed
        margin: "5px", // Adjust the margin as needed
    };

    const correctCountStyle = {
        fontSize: "20px", // Adjust the size as needed
        fontWeight: "bold", // Adjust other styles as needed
    };

    return (
        <div>
            <div className="circles-container">{renderCircles()}</div>
            {endTime && (
                <div className="result">
                    <p style={correctCountStyle}>Reitan Test zakończony w: {calculateElapsedTime()}</p>
                    <Link to="/ReitanTestWelcome">
                        <button type="button" style={buttonStyle}>
                            Spróbuj jeszcze raz
                        </button>
                    </Link>
                    <Link to="/">
                        <button type="button" style={buttonStyle}>
                            Wróć do menu głównego
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ReitanTrail;
