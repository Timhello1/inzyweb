import React, {Component} from 'react';
import "../../Styles/StroopTest.css";

class StroopTest extends Component{

    constructor(props) {
        super();
        this.state = {
            words: ['Red', 'Blue', 'Green', 'Yellow'],
            colours: ['red','blue','green','yellow'],
            currentIndex: 0,
            userResponses: [],
        };
    }

    shuffleArrays = () => {
        const {words, colours } = this.state;
        const shuffledWords = [...words].sort(() => Math.random() - 0.5);
        const shuffledColours = [...colours].sort(() => Math.random() - 0.5);
        this.setState({
            words: shuffledWords,
            colours: shuffledColours,
        });
    };

    handleCorrect = () => {
        this.recordResponse(true);
        this.moveToNext();
    };

    handleIncorrect = () => {
        this.recordResponse(false)
        this.moveToNext();
    };

    recordResponse = (isCorrect) => {
        const {words, colours, currentIndex, userResponses} = this.state;
        const response = {
            word: words[currentIndex],
            colour: colours[currentIndex],
            isCorrect: isCorrect,
        };
        this.setState({
            userResponses: [...userResponses, response],
        });
    };

    moveToNext = () => {
        const { currentIndex } = this.state;
        if (currentIndex < this.state.words.length - 1) {
            this.setState({
                currentIndex: currentIndex + 1,
            });
        } else {
            this.setState({
                currentIndex: 0,
            });
            this.shuffleArrays();
        }
    };

    render(){
        const { words, colours, currentIndex } = this.state;

        return(
            <div className={"stroop-test"}>
                <h1 style={{ color: colours[currentIndex] }}>{words[currentIndex]}</h1>
                <button onClick={this.handleCorrect}>Correct</button>
                <button onClick={this.handleIncorrect}>Incorrect</button>
            </div>
        )
    }
}
export default StroopTest