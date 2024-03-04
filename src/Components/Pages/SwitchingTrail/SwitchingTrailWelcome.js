import {PureComponent} from "react";
import {Link} from "react-router-dom";

class SwitchingTrailWelcome extends PureComponent{
    render() {
        return(
            <div>
                <p>Test polega na kliknięciu pojawiających się punktów w odpowiedniej kolejności. Ostatnia i następna do kliknięcia cyfra wyświetla się na ekranie.</p>
                <p>Punktacja opiera się na prędkości rozwiązania</p>
                <Link to="/SwitchingTrail">
                    <button type="button">
                        Zagraj
                    </button>
                </Link>
            </div>
        )
    }
}
export default SwitchingTrailWelcome;