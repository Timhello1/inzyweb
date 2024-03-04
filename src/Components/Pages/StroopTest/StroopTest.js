import React, {Component} from 'react';
import "../../../Styles/StroopTest.css";
import {collection,addDoc} from "firebase/firestore"
import {getFirestore} from "firebase/firestore";
import {auth} from "../../firebase";
import {Link} from "react-router-dom";

/**
 * Klasa komponentu odpowiadającego za działanie testu Stroop'a
 */
class StroopTest extends Component{
    /**
     * Konstruktor inicjializujący test, podane kolory i słowa
     * @param props
     */
    constructor(props) {
        super();
        this.state = {
            words: ['Czerwony', 'Niebieski', 'Zielony'], //tablica słów
            colours: ['red','blue','green'], //tablica kolorów
            currentIndex: 0, //indeks danego zapytania
            userResponses: [], //tablica z odpowiedziami użytkownika
            correctCount: 0, //stan poprawnych odpowiedzi
            incorrectCount: 0, //stan niepoprawnych odpowiedzi
            gameFinished: false, //zmienna stanu skończonej gry
            timerActive: false, // zmienna stanu timera
            timer: null, // zmienna przechowywania timera
        };
    }

    polishToEnglishMap = {
        'Czerwony': 'Red',
        'Niebieski': 'Blue',
        'Zielony': 'Green',

    };

    /**
     * Funkcja mieszająca tablice
     */
    shuffleArrays = () => {
        const {words, colours } = this.state; //destrukturyzacja tablic
        const shuffledWords = [...words].sort(() => Math.random() - 0.5); //mieszanie tablicy słów
        const shuffledColours = [...colours].sort(() => Math.random() - 0.5); //mieszanie tablicy kolorów
        this.setState({
            words: shuffledWords,
            colours: shuffledColours,
        }); //przypisanie pomieszanych tablic do używanych zmiennych
    };
    /**
     * funkcja obsługująca poprawną odpowiedź
     */
    handleCorrect = () => {
        const {words, colours, currentIndex} = this.state;
        const currentWordPolish = this.state.words[currentIndex];
        const currentWordEnglish = this.polishToEnglishMap[currentWordPolish];
        const isCorrect = colours[currentIndex] === currentWordEnglish.toLowerCase();
        this.recordResponse(isCorrect);
        this.clearTimer();
        this.moveToNext();
    };
    /**
     * funkcja obsługująca niepoprawną odpowiedź
     */
    handleIncorrect = () => {
        const {words, colours, currentIndex} = this.state;
        const currentWordPolish = this.state.words[currentIndex];
        const currentWordEnglish = this.polishToEnglishMap[currentWordPolish];
        const isCorrect = colours[currentIndex] !== currentWordEnglish.toLowerCase();
        this.recordResponse(isCorrect);
        this.clearTimer();
        this.moveToNext();
    };
    /**
     * Funkcja zapisywania odpowiedzi
     * @param isCorrect: parametr boolean mówiący na temat czy odpowiedź jest poprawna czy nie
     */
    recordResponse = (isCorrect) => {
        const {words, colours, currentIndex, userResponses, correctCount, incorrectCount} = this.state; //destrukturyzacja
        const diffrence = correctCount - incorrectCount + 1;
        const response = {
            word: words[currentIndex],
            colour: colours[currentIndex],
            isCorrect: isCorrect,
        }; //zapisanie odpowiedzi jako słowo, kolor i prawidłowość
        this.setState({
            userResponses: [...userResponses, response],
        },
            () => {
            if(isCorrect){
                this.setState((prevState) => ({
                    correctCount: prevState.correctCount + 1,
                })); //inkrement punktacji jeśli prawidłowy

                if (this.state.correctCount + 1 === 10) {
                    this.clearTimer();
                    this.setState({gameFinished: true});
                    this.saveScore(diffrence);
                } //jeśli punktów 10 to timer jest czyszczony, stan gry ustawiony jest na zakończony oraz zapisywany jest wynik
            }else {
                this.setState((prevState) => ({
                    incorrectCount: prevState.incorrectCount + 1
                })); //dekrementacja punktacji jeśli odpowiedź była nieprawidłowa
            }
            }
            ); //zapisanie odpowiedzi w tablicy
    };

    /**
     * Rozpoczęcie timera
     */
    startTimer = () => {
        const timer = setTimeout(() => {
            this.setState((prevState) => ({
                incorrectCount: prevState.incorrectCount + 1,
            }));
            this.moveToNext();
        }, 2000); // 2000 milliseconds (2 seconds)

        this.setState({ timer }); // Ustawienie timera w stanie
    };

    /**
     * Czyszczenie timera
     */
    clearTimer = () => {
        const { timer } = this.state;
        if (timer) {
            clearTimeout(timer); // Czyszczenie timera jeśli istnieje
        }
        this.setState({ timerActive: false });
    };



    /**
     * funkcja odpowiadająca za przejście do kolejnego elementu
     */
    moveToNext = () => {
        const { currentIndex } = this.state; //destrukturyzacja zmiennej indeksu
        this.clearTimer();
        this.shuffleArrays();
        if (currentIndex < this.state.words.length - 1) {
            this.setState({
                currentIndex: currentIndex + 1,
            }); //jeśli indkes jest mniejszy niż długość tablicy można przejść do następnego elementu
        } else {
            this.setState({
                currentIndex: 0,
            }); //przejście do początku tablicy
        }
        this.startTimer();
    };

    /**
     * Funkcja zapisująca wynik w bazie firestore
     * @param score int - różnica prawidłowych i nieprawidłowych odpowiedzi
     * @returns {Promise<void>}
     */
    saveScore = async (score) => {
        const {correctCount, incorrectCount} = this.state; //destrukturyzacja stanów prawidłowych i nieprawidłowych odpowiedzi
        const firestore = getFirestore(); //pozyskanie referencji do firestore
        const scoresCollection = collection(firestore, "scoresStroopTest"); //defnicja kolekcji
        const  user = auth.currentUser; //pozyskanie zalogowanego użytkownika
        const userEmail = user ? user.email : 'unknown'; //ustawienie użytkownika na nieznanego jeśli jest niezalogowany
        try{
            const newScoreRef = await addDoc(scoresCollection, {
                userEmail: userEmail,
                score: score,
                correct: correctCount + 1,
                incorrect: incorrectCount,
                timestamp: new Date().toString(),
            }); //dodanie dokumentu
            console.log("Score saved with ID: ", newScoreRef.id); //wiadomość do konsoli o udanym dodaniu
        }catch (error){
            console.error("Error saving score: ", error); //wiadomość do konsoli o błędzie
        }
    };

    /**
     * render komponentu
     * @returns {JSX.Element}
     */
    render() {
        const { words, colours, currentIndex, gameFinished, correctCount, incorrectCount } = this.state;
        const currentWordPolish = words[currentIndex];

        const currentWordEnglish = this.polishToEnglishMap[currentWordPolish];

        // Define inline styles for the word and buttons
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
            <div className={"stroop-test"}>
                {gameFinished ? (
                    <div className={"game-finished-toast"}>
                        <p style={correctCountStyle}>Test skończony!</p>
                        <p style={correctCountStyle}>Punkty: {correctCount - incorrectCount}</p>
                        <Link to="/StroopTestWelcome">
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
                ) : (
                    <>
                        <h1 style={{ color: colours[currentIndex], ...wordStyle }}>{currentWordPolish}</h1>
                        <button onClick={() => {
                            this.handleCorrect();
                        }} style={buttonStyle}>Zgadza się</button>
                        <button onClick={() => {
                            this.handleIncorrect();
                        }} style={buttonStyle}>Nie zgadza się</button>
                        <p style={correctCountStyle}>Liczba prawidłowych odpowiedzi: {correctCount}</p>
                    </>
                )}
            </div>
        );
    }
}
export default StroopTest