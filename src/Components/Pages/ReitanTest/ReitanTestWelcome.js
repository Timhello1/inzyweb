import {PureComponent} from "react";
import {Link} from "react-router-dom";

class ReitanTestWelcome extends PureComponent{
    render() {
        const textStyle = {
            fontSize: "30px", // Adjust the size as needed
        };

        const buttonStyle = {
            fontSize: "30px", // Adjust the size as needed
            padding: "10px 20px", // Adjust the padding as needed
        };
        return (
            <div className="explanation">
                <p style={textStyle}>Test polega na kliknięciu kolejnych punktów tworząc trasę od 1 do 25.</p>
                <p style={textStyle}>Punktacja polega na czasie rozwiązania.</p>
                <Link to="/ReitanTest">
                    <button type="button" style={buttonStyle}>
                        Zagraj
                    </button>
                </Link>
            </div>
        );
    }
}
export default ReitanTestWelcome;