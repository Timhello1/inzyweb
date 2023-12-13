import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {getAuth} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";

Modal.setAppElement('#root'); // Set the root element for accessibility

/**
 * Komponent odpowiadaj
 * @returns {JSX.Element}
 * @constructor
 */
const SternbergMemoryScan = () => {
    const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L'];
    const [sequence, setSequence] = useState([]);
    const [showSequence, setShowSequence] = useState(true);
    const [currentElementIndex, setCurrentElementIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const [rightCount, setRightCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [shuffledItems, setShuffledItems] = useState([]);

    useEffect(() => {
        generateRandomSequence();
        shuffleItems();
    }, []);

    const generateRandomSequence = () => {
        const uniqueRandomIndexes = [];
        while (uniqueRandomIndexes.length < 4) {
            const randomIndex = Math.floor(Math.random() * items.length);
            if (!uniqueRandomIndexes.includes(randomIndex)) {
                uniqueRandomIndexes.push(randomIndex);
            }
        }
        const randomElements = uniqueRandomIndexes.map((index) => items[index]);
        setSequence(randomElements);
        setShowSequence(true);
        setUserResponses([]);
        setCurrentElementIndex(0);
    };

    const shuffleItems = () => {
        // Fisher-Yates shuffle algorithm
        const array = [...items];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        setShuffledItems(array);
    };

    const handleUnderstood = () => {
        setShowSequence(false);
    };

    const handleResponse = (isInSequence) => {
        const updatedResponses = [...userResponses, isInSequence];
        setCurrentElementIndex(currentElementIndex + 1);

        if (currentElementIndex + 1 >= items.length) {
            const rightResponses = updatedResponses.reduce((count, response, index) => {
                const itemWasInSequence = sequence.includes(shuffledItems[index]);
                return count + (response === itemWasInSequence);
            }, 0);

            setRightCount(rightResponses);
            setWrongCount(items.length - rightResponses);
            setModalIsOpen(true);
        }

        setUserResponses(updatedResponses);
    };

    const savescore = () => {
        const user = getAuth().currentUser;

        if(user){
            const userEmail = user.email;
            const firestore = getFirestore();
            const scoreTest = collection(firestore, 'MemoryScan4');

            addDoc(scoreTest,{
                right: rightCount,
                wrong: wrongCount,
                userEmail: userEmail,
                timestamp: new Date(),
            })
                .then((docRef) => {
                    console.log('Score saved with ID: ', docRef.id);
                })
                .catch((error) => {
                    console.error('Error saving score: ', error); //konsolowy komunikat o błędzie
                });

        }
    }


    const closeModal = () => {
        setModalIsOpen(false);
        generateRandomSequence();
        shuffleItems();
        savescore();
    };

    return (
        <div>
            <h2>Sternberg Memory Scanning Task</h2>
            {showSequence ? (
                <div>
                    <p>Sequence: {sequence.join(', ')}</p>
                    <button onClick={handleUnderstood}>Understood</button>
                </div>
            ) : (
                <div>
                    {currentElementIndex < items.length ? (
                        <div>
                            <p>Was the element "{shuffledItems[currentElementIndex]}" in the sequence?</p>
                            <button onClick={() => handleResponse(true)}>Yes</button>
                            <button onClick={() => handleResponse(false)}>No</button>
                        </div>
                    ) : (
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Results"
                        >
                            <h2>Results</h2>
                            {rightCount === items.length ? (
                                <p>Well done! You correctly identified all elements in the sequence.</p>
                            ) : (
                                <div>
                                    <p>Right responses: {rightCount}</p>
                                    <p>Wrong responses: {wrongCount}</p>
                                </div>
                            )}
                            <button onClick={closeModal}>Close</button>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    );
};

export default SternbergMemoryScan;
