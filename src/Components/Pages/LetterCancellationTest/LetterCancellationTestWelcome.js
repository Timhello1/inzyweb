import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class LetterCancellationTestWelcome extends PureComponent {
    render() {
        return (
            <div>
                <p>
                    Test polega na zaznaczeniu każdego miejsca, gdzie pojawia się podana litera.
                </p>
                <p>Punktacja oparta jest na szybkości rozwiązania.</p>

                {/* Buttons for different difficulty levels */}
                <div>
                    <Link to="/easy">
                        <button type="button">Łatwy</button>
                    </Link>
                    <Link to="/medium">
                        <button type="button">Średni</button>
                    </Link>
                    <Link to="/difficult">
                        <button type="button">Trudny</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LetterCancellationTestWelcome;
