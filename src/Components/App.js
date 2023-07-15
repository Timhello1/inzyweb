import Navbar from "./Navbar";
import '../Styles/App.css';
import Login from "./Pages/Login";
import About from "./Pages/About";
import Home from "./Pages/Home";
import {Route, Routes} from "react-router-dom"


function App() {


  return (
    <div className="App">
        <Navbar></Navbar>
        <div className="container">
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/about" element={<About></About>}></Route>
            </Routes>
        </div>
    </div>
  );
}

export default App;
