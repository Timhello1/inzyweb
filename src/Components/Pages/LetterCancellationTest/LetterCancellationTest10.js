import React, { useState, useEffect } from 'react';
import '../../../Styles/LetterCancellationTest.css';
import log from "eslint-plugin-react/lib/util/log";

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //litery zawarte w tescie
/**
 * Komponent reprezentujący test
 * @returns {JSX.Element}
 * @constructor
 */
const LetterCancellationTest = ({numTargets}) => {
    //zmienne stanów
    const [targetLetter, setTargetLetter] = useState(''); //szukana litera
    const [lettersToCross, setLettersToCross] = useState([]); //tablica liter pokazywana na ekranie
    const [score, setScore] = useState(0); //punktacja użytkownika
    const [time, setTime] = useState(0); //zaokrąglony czas
    const [isActive, setIsActive] = useState(false); //aktywność testu
    const [clickedIndexes, setClickedIndexes] = useState([]); //indeksy klikniętych liter
    const [remainingLetters, setRemainingLetters] = useState(0); //litery pozostałe do kliknięcia
    /**
     * Hook zajmujący się odmierzaniem czasu
     */
    useEffect(() => {
        if (isActive) {
            //zacznij timer jeśli gra jest aktywna
            const timer = setInterval(() => {
                setTime(prevTime => prevTime + 1); //inkrementacja czasu o jedną sekundę
            }, 1000); //interwał 1000 ms
            return () => clearInterval(timer); //zerowanie timera
        }
    }, [isActive]);

    /**
     * Hook szykujący plansze testu
     */
    useEffect(() => {
        // Generowanie nowej tablicy liter
        const randomArray = [];
        const targetCount = numTargets;
        const otherCount = 96 - targetCount;
        const randomIndex = Math.floor(Math.random() * letters.length);
        const target = letters[randomIndex];

        setTargetLetter(target);

        for (let i = 0; i < targetCount; i++){
            randomArray.push(target);
        }

        for (let i = 0; i < otherCount; i++){
            const randomIndex = Math.floor(Math.random() * letters.length);
            randomArray.push(letters[randomIndex]);
        }

        for(let i = randomArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [randomArray[i],randomArray[j]] = [randomArray[j], randomArray[i]];
        }

        setLettersToCross(randomArray); //ustawienie liter

        console.log(randomArray)

        // Ustawienie pozostałych liter jako liczba szukanych liter
        setRemainingLetters(targetCount);

        // Reset
        setScore(0);
        setTime(0);
        setIsActive(true); //Start gry
        setClickedIndexes([]);

        // Po 60 sekundach skończ grę
        const timeout = setTimeout(() => {
            setIsActive(false);
        }, 60000);

        return () => clearTimeout(timeout);
    }, [numTargets]);

    /**
     * kliknięcie litery
     * @param letter
     * @param index
     */
    const handleLetterClick = (letter, index) => {
        if (letter === targetLetter && !clickedIndexes.includes(index)) {
            //jeśli litera jest szukana oraz nie znajduje się w klikniętych indeksach
            setClickedIndexes(prevIndexes => [...prevIndexes, index]); //dodanie indeksu do klikniętych indeksów
            setRemainingLetters(prevRemaining => prevRemaining - 1); //dekrementacja pozostałych liter
            setScore(prevScore => prevScore + 1); //inkrementacja punktacji

            if (remainingLetters === 1) {
                setIsActive(false);
            }
        }
    };
    /**
     * render komponentu
     */
    return (
        <div className="letter-cancellation-container">
            <div className="grid-container">
                {/* mapowanie przez tablice liter */}
                {lettersToCross.map((letter, index) => (
                    <div
                        key={index} //unikalny klucz dla każdej komórki
                        className={`grid-cell ${
                            letter === targetLetter ? 'target-letter' : '' //dodaj klasę targetletter 
                        } ${clickedIndexes.includes(index) ? 'clicked' : ''}`} //dodaj klasę clicked
                        onClick={() => {
                            if (letter === targetLetter) {
                                handleLetterClick(letter, index); //event kliknięcia
                            }
                        }}
                    >
                        {letter} {/* wyświetlenie litery w komórce */}
                    </div>
                ))}
            </div>
            <div className="info-container">
                {isActive ? (
                    <div>
                        <p>Target Letter: {targetLetter}</p>
                        <p>array: {lettersToCross}</p>
                        <p>array: {}</p>
                        <p>Score: {score}</p>
                        <p>Time: {time} seconds</p>
                    </div>
                ) : (
                    <div className="finish-screen">
                        <p>Test Completed!</p>
                        <p>Final Score: {score}</p>
                        <p>Time Taken: {time} seconds</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LetterCancellationTest;
