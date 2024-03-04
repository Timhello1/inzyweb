import React, { useState, useEffect } from 'react';
import '../../../Styles/LetterCancellationTest.css';
import { collection, addDoc } from "firebase/firestore"
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth';
import {Link} from "react-router-dom";

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //zmienna przechowywująca litery występujące w teście

/**
 * Komponent reprezentujący łatwą wersję testu Letter Cancellation
 * @returns {JSX.Element}
 * @constructor
 */
const LetterCancellationTest5 = () => {
    const [targetLetter, setTargetLetter] = useState(''); //stan szukanej litery
    const [lettersToCross, setLettersToCross] = useState([]); //lista liter do skreślenia
    const [score, setScore] = useState(0); //stan znalezionych liter
    const [time, setTime] = useState(0); //czas trwania testu
    const [isActive, setIsActive] = useState(true); //stan aktywności testu
    const [clickedIndexes, setClickedIndexes] = useState([]); //stan klikniętych liter
    const [remainingLetters, setRemainingLetters] = useState(0); //stan pozostałych do znalezienia liter
    const [showFinishScreen, setShowFinishScreen] = useState(false); //stan wyświetlenia końcowego ekranu


    useEffect(() => {
        //hook uruchamiający się przy aktywnym teście
        if (isActive) {
            //Przy aktywnym teście uruchamiany jest timer
            const timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000); //zwiększanie czasu o 1 co 1000 ms
            return () => clearInterval(timer); //czyszczenie timera przy wyłączaniu komponentu
        }
    }, [isActive]);

    useEffect(() => {
        const user = getAuth().currentUser;

        const saveScoreAndShowFinishScreen = () => {
            if (user) {
                const userEmail = user.email;
                if (score === 0) {
                    saveScore(score, userEmail, time);
                } else {
                    saveScore(score, userEmail, time);
                }
            }

            setShowFinishScreen(true);
        };

        if (!isActive) {
            saveScoreAndShowFinishScreen();
        }

    }, [isActive, score, time]);


    useEffect(() => {
        //hook uruchamiany przy inicjalizacji komponentu
        const randomArray = []; //pusta tablica na losowe litery
        const targetCount = 5; //liczba szukanych liter
        const otherCount = 96 - targetCount; //liczba pozostałych liter
        const randomIndex = Math.floor(Math.random() * letters.length); //losowany index szukanej litery z alfabetu
        const target = letters[randomIndex]; //wybierana losowa litera
        const modifiedLetters = letters.replace(new RegExp(target, 'g'), ''); //szukana litera usuwana jest z alfabetu

        setTargetLetter(target); //ustawienie szukanej litery w stanie

        for (let i = 0; i < targetCount; i++) {
            randomArray.push(target); //dodawanie szukanych liter do tablicy
        }

        for (let i = 0; i < otherCount; i++) {
            const randomIndex = Math.floor(Math.random() * modifiedLetters.length); //losowanie indeksu innej litery
            randomArray.push(modifiedLetters[randomIndex]); //dodanie jej do tablicy
        }

        for (let i = randomArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); //losowanie indeksu j
            [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]]; //zamiana miejscami liter w tablicy
        }

        setLettersToCross(randomArray); //ustawienie tablicy do stanu

        setRemainingLetters(targetCount); //ustawienie liczby pozostałych liter
        setScore(0); //początkowy licznik znalezionych liter
        setTime(0); //początkowy czas
        setIsActive(true); //uruchamiany test
        setClickedIndexes([]); //wyczyszczenie tablicy klikniętych indeksów

        const timeout = setTimeout(() => {
            setIsActive(false);
        }, 60000);




        return () => clearTimeout(timeout); //wyczyść timer
    }, []);
    /**
     * funkcja obsługująca kliknięcie litery
     * @param letter
     * @param index
     */
    const handleLetterClick = (letter, index) => {
        if (letter === targetLetter && !clickedIndexes.includes(index)) { //jeśli kniknięta jest właściwa litera i niekliknięto jej wcześniej
            setClickedIndexes(prevIndexes => [...prevIndexes, index]); //dodanie indeksu do tablicy klikniętych indeksów
            setRemainingLetters(prevRemaining => prevRemaining - 1);//zmniejszenie liczby pozostałych liter
            setScore(prevScore => prevScore + 1); //zwiększenie znalezionych liter

            if (remainingLetters === 1) { //jeśli jest to ostatnia litera do znalezienie
                setIsActive(false); //wyłącz test
            }
        }
    };
    /**
     * funkcja obsługująca zapis wyników
     * @param score
     * @param userEmail
     * @param time
     */
    const saveScore = (score, userEmail, time) => {
        const firestore = getFirestore(); //dostęp do firestore
        const scoreTest = collection(firestore, 'LetterCancel5Score'); //zdefiniowanie kolekcji wyników

        addDoc(scoreTest, { //dodanie wyniku w dokumencie z poniższymi polami
            score: score,
            time: time,
            userEmail: userEmail,
            timestamp: new Date().toString(),
        })
            .then((docRef) => {
                console.log('Score saved with ID: ', docRef.id); //konsolowy komunikat o zapisaniu wyniku
            })
            .catch((error) => {
                console.error('Error saving score: ', error); //konsolowy komunikat o błędzie
            });
    };
    /**
     * część renderująca
     */
    return (
        <div className="letter-cancellation-container">
            {showFinishScreen ? (
                <div className="finish-screen">
                    <p>Test Zakończony!</p>
                    <p>Znaleziono: {score}  /5</p>
                    <p>Czas: {time} sekund</p>
                    <Link to="/LetterCancellationTestWelcome">
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
            ) : (
                <>
                    <div className="grid-container">
                        {lettersToCross.map((letter, index) => (
                            <div
                                key={index}
                                className={`grid-cell ${
                                    letter === targetLetter ? 'target-letter' : ''
                                } ${clickedIndexes.includes(index) ? 'clicked' : ''}`}
                                onClick={() => {
                                    if (letter === targetLetter) {
                                        handleLetterClick(letter, index);
                                    }
                                }}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                    <div className="info-container">
                        <p>Szukana litera: {targetLetter}</p>
                        <p>Czas: {time} sekund</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default LetterCancellationTest5;
