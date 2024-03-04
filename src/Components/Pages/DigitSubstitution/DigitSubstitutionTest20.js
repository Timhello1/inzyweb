import React, { useState, useEffect } from 'react';
import "../../../Styles/DigitalSubstitutionTest.css"
import {getAuth} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {Link} from "react-router-dom";

const symbols = ['a', 'd', 's', 'f', 'h', 'g', 'l', 'j', 'k', 'x']; //definiowanie symboli użytych w teście
const totalSymbols = 20; //ilość symboli w sekwencji
/**
 * Komponent obsługujący test digit symbol substitution
 * @returns {JSX.Element}
 * @constructor
 */
const DigitSubstitutionTest20 = () => {
    const [randomNumberArray, setRandomNumberArray] = useState([]); //tablica do przechowywania losowych liczb
    const [userInputArray, setUserInputArray] = useState(Array(totalSymbols).fill('')); //tablica przechowywująca odpowiedź użytkownika
    const [score, setScore] = useState(0); //wynik użytkownika
    const [startTime, setStartTime] = useState(null); //czas startu użytkownika
    const [elapsedTime, setElapsedTime] = useState(0); //zaokrąglony czas testu
    const [testCompleted, setTestCompleted] = useState(false); // Sprawdzenie czy test jest skończony
    const [inputCorrectness, setInputCorrectness] = useState(Array(totalSymbols).fill(true));

    let timerInterval; // zmienna na interwał czsu

    useEffect(() => {
        //hook generujące losowe liczby i włączający timer
        generateRandomNumberArray(); //generacja losowych numerów
        setStartTime(new Date().getTime()); //zapis czasu początkowego
    }, []);

    useEffect(() => {
        //hook sprawdzający czy test został zakończony i zapisujący wynik
        if (score === totalSymbols) {
            // Sprawdzenie czy wszystkie cyfry zostały prawidłowo przetłumaczone
            clearInterval(timerInterval); //wyczyszczenie timera
            setTestCompleted(true); //sygnał o zakończonym tescie

            const user = getAuth().currentUser; //pozyskanie zalogowanego użytkownika

            if (user){ //jeśli jest zalogowany
                const userEmail = user.email; //pozyskanie emaila
                saveScore(elapsedTime, userEmail) //zapis wyniku
            }

        }
    }, [score]);
    /**
     * Funkcja zapisująca wynik
     * @param time
     * @param email
     */
    const saveScore = (time, email) => {
        const firestore = getFirestore(); //pobranie połączenia z firestorem
        const scoreTest = collection(firestore,'DigitalSub20'); //definicja kolekcji

        addDoc(scoreTest, { //dodanie dokumentu z poniższymi polami
            time: time,
            userEmail: email,
            timestamp: new Date().toString(),
        })
            .then((docRef) => {
                console.log('Score saved with ID: ', docRef.id); //wiadomość konsolowa o poprawnym dodaniu
            })
            .catch((error) => {
                console.error('Error saving score: ', error); //wiadomość konsolowa o błędzie
            });
    };

    useEffect(() => {
        // Zwiększanie czasu co sekunde
        const timerInterval = setInterval(() => {
            if (startTime && !testCompleted) {
                const currentTime = new Date().getTime();
                const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
                setElapsedTime(elapsedSeconds);
            }
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [startTime, testCompleted]);


    /**
     * funkcja generująca nową sekwencję numerów i resetująca test
     */
    const generateRandomNumberArray = () => {
        const newArray = [];
        for (let i = 0; i < totalSymbols; i++) {
            newArray.push(Math.floor(Math.random() * 10)); // Generacja losowego numeru od 0 do 9
        }
        setRandomNumberArray(newArray); //zaktualizowanie tablicy z sekwencją
        setUserInputArray(Array(totalSymbols).fill('')); //reset odpowiedzi użytkownika
        setScore(0); // Reset wyniku
        setStartTime(new Date().getTime()); // Restart timera
        setElapsedTime(0); // Reset zaokrąglonego czasu
        setTestCompleted(false); // Reset flagi kończącej test
    };
    /**
     * funkcja zajmująca się zmianą odpowiedzi użytkownika
     * @param event
     * @param index
     */
    const handleInputChange = (event, index) => {
        const value = event.target.value;
        const updatedInputArray = [...userInputArray];
        updatedInputArray[index] = value;
        setUserInputArray(updatedInputArray);
    };
    /**
     * Funkcja sprawdzająca odpowiedzi użytkownika i aktualizująca wynik
     */
    const checkAnswers = () => {
        let currentScore = 0;
        const updatedCorrectnessArray = Array(totalSymbols).fill(true);

        for (let i = 0; i < totalSymbols; i++) {
            if (symbols[randomNumberArray[i]] === userInputArray[i]) {
                currentScore++;
            }else{
                updatedCorrectnessArray[i] = false
            }
        }
        setInputCorrectness(updatedCorrectnessArray);
        setScore(currentScore);
    };
    /**
     * część renderująca
     */
    return (
        <div>
            <h1>Digit Symbol Substitution Test</h1>

            {testCompleted ? (
                <div>
                    <p>Test Zakończony</p>
                    <p>Czas: {elapsedTime} sekund</p>
                    <Link to="/DigitSubWelcome">
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
                <div>
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
                                    style={{ border: inputCorrectness[index] ? '1px solid #ccc' : '2px solid red',
                                        width: '50px', // Adjust the width as needed
                                    }}
                                    value={input}
                                    onChange={(event) => handleInputChange(event, index)}
                                    maxLength={1}
                                />
                            ))}
                        </div>

                        <button onClick={checkAnswers}>Sprawdź</button>

                        <p>Punktacja: {score}</p>
                        <p>Czas: {elapsedTime} sekund</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DigitSubstitutionTest20;
