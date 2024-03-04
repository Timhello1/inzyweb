import {PureComponent} from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

class MemoryGameWelcome extends PureComponent{
    render() {
        return(
            <div className="explanation">
                <p>Gra polega na dopasowaniu dwóch takich samych kart. Karty odwracają się pojedyńczo i należy poczekać aż para się odwróci.</p>
                <p>Punktacja opiera się na ilości kliknięć oraz prędkości rozwiązania gry.</p>
                <Link to="/Memory">
                    <button type="button">
                        Zagraj
                    </button>
                </Link>
            </div>
        )
    }
}
export default MemoryGameWelcome;