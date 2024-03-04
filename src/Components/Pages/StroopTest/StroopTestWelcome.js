import { PureComponent } from "react";
import { Link } from "react-router-dom";

class StroopTestWelcome extends PureComponent {
    render() {
        const textStyle = {
            fontSize: "30px", // Adjust the size as needed
        };

        const buttonStyle = {
            fontSize: "30px", // Adjust the size as needed
            padding: "10px 20px", // Adjust the padding as needed
        };

        return (
            <div>
                <p style={textStyle}>
                    Test polega na stwierdzeniu, czy kolor napisu zgadza się z jego zawartością.
                </p>
                <p style={textStyle}>
                    Punktacja opiera się na liczbie poprawnych odpowiedzi.
                </p>
                <Link to="/StroopTest">
                    <button type="button" style={buttonStyle}>
                        Zagraj
                    </button>
                </Link>
            </div>
        );
    }
}

export default StroopTestWelcome;
