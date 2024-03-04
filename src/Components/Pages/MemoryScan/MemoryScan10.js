import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {getAuth} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {Link} from "react-router-dom";

Modal.setAppElement('#root'); // Ustawienie głównego elementu aplikacji dla Modala

/**
 * Komponent odpowiadający za test Stenberga Memory Scan
 * @returns {JSX.Element} - zwrot elementu renderowania
 * @constructor
 */
const SternbergMemoryScan = () => {
    const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4']; //zebranie liter występujących w tescie
    const [sequence, setSequence] = useState([]); //stan przechowywujący sekwencję
    const [showSequence, setShowSequence] = useState(true); //stan czy pokazać sekwencję
    const [currentElementIndex, setCurrentElementIndex] = useState(0); //stan przechowywujący indeks aktualnego elementu
    const [userResponses, setUserResponses] = useState([]); // Stan przechowujący odpowiedzi użytkownika
    const [rightCount, setRightCount] = useState(0); // Licznik prawidłowych odpowiedzi
    const [wrongCount, setWrongCount] = useState(0); // Licznik nieprawidłowych odpowiedzi
    const [modalIsOpen, setModalIsOpen] = useState(false); // Stan określający, czy modal jest otwarty
    const [shuffledItems, setShuffledItems] = useState([]); // Losowa permutacja elementów

    useEffect(() => {
        generateRandomSequence();
        shuffleItems();
    }, []);

    /**
     * Funkcja generująca sekwencję
     */
    const generateRandomSequence = () => {
        const uniqueRandomIndexes = []; //pusta tablica na unikalne indeksy
        while (uniqueRandomIndexes.length < 10) { //wykonywana aż nie uzbiera 10 indeksów
            const randomIndex = Math.floor(Math.random() * items.length); //losowanie indeksu
            if (!uniqueRandomIndexes.includes(randomIndex)) { //sprawdzanie czy już nie wykorzystany
                uniqueRandomIndexes.push(randomIndex); //dodanie indkesu do tablicy
            }
        }
        const randomElements = uniqueRandomIndexes.map((index) => items[index]); //tablica losowych elementów
        setSequence(randomElements); //ustawienie wygenerowanej sekwencji
        setShowSequence(true); //stan pokazawania sekwencji
        setUserResponses([]); //czyszczenie tablicy odpowiedzi
        setCurrentElementIndex(0); //aktuallny indeks 0
    };

    /**
     * Funkcja tasująca elementy w liście
     */
    const shuffleItems = () => {
        // tasujący algorytm Fisher-Yates
        const array = [...items];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        setShuffledItems(array); //ustawienie tablicy
    };

    /**
     * Funkcja chowająca sekwencję
     */
    const handleUnderstood = () => {
        setShowSequence(false); //ustawienie stanu na false
    };

    /**
     * Funkcja zapisująca wynik w bazie danych
     */
    const savescore = () => {
        const user = getAuth().currentUser; //pozyskanie aktualnie zalogowanego użytkownika

        if(user){ //jeśli użytkownik jest zalogowany
            const userEmail = user.email; //pozyskanie maila zalogowanego użytkownika
            const firestore = getFirestore(); //referencja firestore
            const scoreTest = collection(firestore, 'MemoryScan10'); //nazwa kolekcji

            addDoc(scoreTest,{ //dodanie dokumentu z podanymi polami
                score: rightCount - wrongCount,
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
     * Obsługa odpowiedzi użytkownika
     * @param isInSequence - boolean (czy dany element jest w sekwencji)
     */
    const handleResponse = (isInSequence) => {
        const updatedResponses = [...userResponses, isInSequence]; //dodanie odpowiedzi do zbioru
        setCurrentElementIndex(currentElementIndex + 1); //inkrement indeksu

        if (currentElementIndex + 1 >= items.length) { //Sprawdzenie czy wszystkie elementy zostały pokazane użytkownikowi
            const rightResponses = updatedResponses.reduce((count, response, index) => {
                const itemWasInSequence = sequence.includes(shuffledItems[index]); //sprawdzenie czy element był w sekwencji
                return count + (response === itemWasInSequence); //zwiększenie licznika prawidłowych odpowiedzi
            }, 0);

            setRightCount(rightResponses); //ustawienie liczby prawidłowych odpowiedzi
            setWrongCount(items.length - rightResponses); //ustawienie nieprawidłowych odpowiedzi
            setModalIsOpen(true); //otwarcie modala z wynikami
        }

        setUserResponses(updatedResponses); //ustawienie zaktualizowych odpowiedzi
    };

    /**
     * Funkcja obsługująca zamknięcie modalu
     */
    const closeModal = () => {
        setModalIsOpen(false);
        generateRandomSequence(); //Ponowna generacja sekwencji
        shuffleItems(); //Ponowne tasowanie elementów
        savescore(); //Zapisanie wyniku
    };

    const handleLinkClick = () => {
        closeModal(); // Call your closeModal function
    };

    return (
        <div>
            <h2>Zadanie skanowania pamięci według Sternberga</h2>
            {showSequence ? (
                <div>
                    <p>Sequence: {sequence.join(', ')}</p>
                    <button onClick={handleUnderstood}>Rozumiem</button>
                </div>
            ) : (
                <div>
                    {currentElementIndex < items.length ? (
                        <div>
                            <p>Czy element "{shuffledItems[currentElementIndex]}" był w sekwencji?</p>
                            <button onClick={() => handleResponse(true)}>Tak</button>
                            <button onClick={() => handleResponse(false)}>Nie</button>
                        </div>
                    ) : (
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Results"
                        >
                            <h2>Results</h2>
                            {rightCount === items.length ? (
                                <p>Brawo! Nie popełniłeś żadnych błędów.</p>
                            ) : (
                                <div>
                                    <p>Prawidłowe odpowiedzi: {rightCount}</p>
                                    <p>Nieprawidłowe odpowiedzi: {wrongCount}</p>
                                </div>
                            )}
                            <div onClick={handleLinkClick}>
                                <Link to="/MemoryScanWelcome">
                                    <button type="button">
                                        Spróbuj ponownie
                                    </button>
                                </Link>
                                <Link to="/">
                                    <button type="button">
                                        Wróć do menu głównego
                                    </button>
                                </Link>
                            </div>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    );
};

export default SternbergMemoryScan;
