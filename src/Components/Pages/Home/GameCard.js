import "../../../Styles/homeStyle.css"

const GameCard = ({imageURL, heading, text}) => {
    return (
        <div className="gamecard">
            <img src={imageURL} alt={heading}></img>
            <h2>{heading}</h2>
            <p>{text}</p>
        </div>
    );
};

export default GameCard