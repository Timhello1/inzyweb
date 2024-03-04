import {PureComponent} from "react";
import {Link} from "react-router-dom";

class DigitSubstitutionWelcome extends PureComponent{

    render() {
        return(
            <div>
                <p>Gra polega na prawidłowym zastąpieniu sekwencji znaków na przedstawione numery</p>
                <p>Punktacja polega na szybkości rozwiązania</p>
                <Link to="/DigitSubstitution10">
                    <button type="button">
                        Łatwy
                    </button>
                </Link>
                <Link to="/DigitSubstitution20">
                    <button type="button">
                        Średni
                    </button>
                </Link>
                <Link to="/DigitSubstitution30">
                    <button type="button">
                        Trudny
                    </button>
                </Link>
            </div>
        )
    }
}
export default DigitSubstitutionWelcome;