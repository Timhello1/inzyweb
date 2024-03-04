import {PureComponent} from "react";
import {Link} from "react-router-dom";

class MemoryScanWelcome extends PureComponent{
    render() {
        return(
            <div>
                <p>Test polega na zobaczeniu sekwencji następnie na wyświetlaniu elementów i stwierdzeniu czy wystąpiły one w sekwencji</p>
                <p>Punktacja opiera się na poprawności odpowiedzi</p>
                <Link to="/MemoryScan4">
                    <button type="button">
                        Łatwy
                    </button>
                </Link>
                <Link to="/MemoryScan6">
                    <button type="button">
                        Średni
                    </button>
                </Link>
                <Link to="/MemoryScan10">
                    <button type="button">
                        Trudny
                    </button>
                </Link>
            </div>
        )
    }
}
export default MemoryScanWelcome;