import {PureComponent} from "react";
import {Link} from "react-router-dom";

class CircleClickerWelcome extends PureComponent{
    render() {
        return(
            <div className="Explanation">
                <p>Gra polega na kliknięciu punktu na ekranie. Punkt należy kliknąć 10 razy aby ukończyć test. Każde nietrafienie w punkt skutkuje minusowymi punktami</p>
                <p>Punktacja za test oparta jest na prędkości wykonania</p>
                <Link to="/ClickTest">
                    <button type="button">
                        Zagraj
                    </button>
                </Link>
            </div>
        )
    }
}
export default CircleClickerWelcome;