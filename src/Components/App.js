import Navbar from "../Components/Navigation/Navbar";
import '../Styles/App.css';
import Login from "./Pages/auth/Login";
import About from "./Pages/About";
import Home from "./Pages/Home/Home";
import MemoryGame from "./Pages/MemoryGame/MemoryGame"
import {Route, Routes} from "react-router-dom"
import StroopTest from "./Pages/StroopTest/StroopTest";
import SwitchingTrail from "./Pages/SwitchingTrail/SwitchingTrail";
import ReitanTest from "./Pages/ReitanTest/ReitanTest";
import LetterCancellationTest10 from "./Pages/LetterCancellationTest/LetterCancellationTest10";
import DigitSubstitutionTest10 from "./Pages/DigitSubstitution/DigitSubstitutionTest10";
import MemoryScan from "./Pages/MemoryScan/MemoryScan4";
import ShapeDrawingGame from "./Pages/DrawShapeGame";
import CircleClickerGame from "./Pages/CircleClicker/CircleClickerGame";
import SignUp from "./Pages/auth/SignUp";
import MemoryGameWelcome from "./Pages/MemoryGame/MemoryGameWelcome";
import CircleClickerWelcome from "./Pages/CircleClicker/CircleClickerWelcome";
import SwitchingTrailWelcome from "./Pages/SwitchingTrail/SwitchingTrailWelcome";
import StroopTestWelcome from "./Pages/StroopTest/StroopTestWelcome";
import ReitanTestWelcome from "./Pages/ReitanTest/ReitanTestWelcome";
import LetterCancellationTestWelcome from "./Pages/LetterCancellationTest/LetterCancellationTestWelcome";
import DigitSubstitutionWelcome from "./Pages/DigitSubstitution/DigitSubstitutionWelcome";
import MemoryScanWelcome from "./Pages/MemoryScan/MemoryScanWelcome";
import LetterCancellationTest8 from "./Pages/LetterCancellationTest/LetterCancellationTest8";
import LetterCancellationTest5 from "./Pages/LetterCancellationTest/LetterCacellationTest5";
import DigitSubstitutionTest30 from "./Pages/DigitSubstitution/DigitSubstitutionTest30";
import DigitSubstitutionTest20 from "./Pages/DigitSubstitution/DigitSubstitutionTest20";
import MemoryScan10 from "./Pages/MemoryScan/MemoryScan10";
import MemoryScan4 from "./Pages/MemoryScan/MemoryScan4";
import MemoryScan6 from "./Pages/MemoryScan/MemoryScan6";
import UserData from "./Pages/UserData/UserData";
import UserDataScores from "./Pages/UserData/UserDataScores";
import UserDataTimeScores from "./Pages/UserData/UserDataTimeScores";
import Admin from "./AdminPanelComponents/Admin";
import InquiryTable from "./AdminPanelComponents/inquiries/InquiryTable";
import UserTable from "./AdminPanelComponents/info/UserTable";
import ShowGraph from "./AdminPanelComponents/Results/Graph/ShowGraph";
import GraphForm from "./AdminPanelComponents/Results/Graph/GraphForm";
import TestForm from "./AdminPanelComponents/Results/Tests/TestForm";
import ShowTests from "./AdminPanelComponents/Results/Tests/ShowTests";
import ShowTestsS from "./AdminPanelComponents/Results/Tests/ShowTestsS";
import ShowTestsB from "./AdminPanelComponents/Results/Tests/ShowTestsB";
import ShowGraphS from "./AdminPanelComponents/Results/Graph/ShowGraphS";
import ShowGraphB from "./AdminPanelComponents/Results/Graph/ShowGraphB";
import StatsForm from "./AdminPanelComponents/Results/Statistics/StatsForm";
import SredniaT from "./AdminPanelComponents/Results/Statistics/Srednia/SredniaT";
import SredniaForm from "./AdminPanelComponents/Results/Statistics/Srednia/SredniaForm";
import SredniaS from "./AdminPanelComponents/Results/Statistics/Srednia/SredniaS";
import SredniaB from "./AdminPanelComponents/Results/Statistics/Srednia/SredniaB";
import ShapiroForm from "./AdminPanelComponents/Results/Statistics/Shapiro-Wilk/ShapiroForm";
import ShapiroT from "./AdminPanelComponents/Results/Statistics/Shapiro-Wilk/ShapiroT";





function App() {


  return (
    <div className="App">
        <Navbar></Navbar>
        <div className="container">
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/Memory" element={<MemoryGame></MemoryGame>}></Route>
                <Route path="/StroopTest" element={<StroopTest></StroopTest>}></Route>
                <Route path="/SwitchingTrail" element={<SwitchingTrail></SwitchingTrail>}></Route>
                <Route path="/ReitanTest" element={<ReitanTest></ReitanTest>}></Route>
                <Route path="/difficult" element={<LetterCancellationTest10></LetterCancellationTest10>}></Route>
                <Route path="/easy" element={<LetterCancellationTest5></LetterCancellationTest5>}></Route>
                <Route path="/medium" element={<LetterCancellationTest8></LetterCancellationTest8>}></Route>
                <Route path="/DigitSubstitution10" element={<DigitSubstitutionTest10></DigitSubstitutionTest10>}></Route>
                <Route path="/DigitSubstitution20" element={<DigitSubstitutionTest20></DigitSubstitutionTest20>}></Route>
                <Route path="/DigitSubstitution30" element={<DigitSubstitutionTest30></DigitSubstitutionTest30>}></Route>
                <Route path="/MemoryScan4" element={<MemoryScan4></MemoryScan4>}></Route>
                <Route path="/MemoryScan6" element={<MemoryScan6></MemoryScan6>}></Route>
                <Route path="/MemoryScan10" element={<MemoryScan10></MemoryScan10>}></Route>
                <Route path="/ShapeDraw" element={<ShapeDrawingGame></ShapeDrawingGame>}></Route>
                <Route path="/ClickTest" element={<CircleClickerGame></CircleClickerGame>}></Route>
                <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
                <Route path="/MemoryGameWelcome" element={<MemoryGameWelcome></MemoryGameWelcome>}></Route>
                <Route path="/ClickTestWelcome" element={<CircleClickerWelcome></CircleClickerWelcome>}></Route>
                <Route path="/SwitchTrailWelcome" element={<SwitchingTrailWelcome></SwitchingTrailWelcome>}></Route>
                <Route path="/StroopTestWelcome" element={<StroopTestWelcome></StroopTestWelcome>}></Route>
                <Route path="/ReitanTestWelcome" element={<ReitanTestWelcome></ReitanTestWelcome>}></Route>
                <Route path="/LetterCancellationTestWelcome" element={<LetterCancellationTestWelcome></LetterCancellationTestWelcome>}></Route>
                <Route path="/DigitSubWelcome" element={<DigitSubstitutionWelcome></DigitSubstitutionWelcome>}></Route>
                <Route path="/MemoryScanWelcome" element={<MemoryScanWelcome></MemoryScanWelcome>}></Route>
                <Route path="/ReitanTestResults" element={<UserData collectionName={"ReitanTest"}></UserData>}></Route>
                <Route path="/DigitSub10TestResults" element={<UserData collectionName={"DigitalSub10"}></UserData>}></Route>
                <Route path="/DigitSub20TestResults" element={<UserData collectionName={"DigitalSub20"}></UserData>}></Route>
                <Route path="/DigitSub30TestResults" element={<UserData collectionName={"DigitalSub30"}></UserData>}></Route>
                <Route path="/StroopTestResults" element={<UserDataScores collectionName={"scoresStroopTest"}></UserDataScores>}></Route>
                <Route path="/MemoryScan4Results" element={<UserDataScores collectionName={"MemoryScan4"}></UserDataScores>}></Route>
                <Route path="/MemoryScan6Results" element={<UserDataScores collectionName={"MemoryScan6"}></UserDataScores>}></Route>
                <Route path="/MemoryScan10Results" element={<UserDataScores collectionName={"MemoryScan10"}></UserDataScores>}></Route>
                <Route path="/ClickTestResults" element={<UserData collectionName={"CircleClickerTest"}></UserData>}></Route>
                <Route path="/SwitchTestResults" element={<UserData collectionName={"SwitchTrailTest"}></UserData>}></Route>
                <Route path="/LCETTestResults" element={<UserData collectionName={"LetterCancel5Score"}></UserData>}></Route>
                <Route path="/LCESTestResults" element={<UserDataScores collectionName={"LetterCancel5Score"}></UserDataScores>}></Route>
                <Route path="/LCETSTestResults" element={<UserDataTimeScores collectionName={"LetterCancel5Score"}></UserDataTimeScores>}></Route>
                <Route path="/LCMTTestResults" element={<UserData collectionName={"LetterCancel8Score"}></UserData>}></Route>
                <Route path="/LCMSTestResults" element={<UserDataScores collectionName={"LetterCancel8Score"}></UserDataScores>}></Route>
                <Route path="/LCMTSTestResults" element={<UserDataTimeScores collectionName={"LetterCancel8Score"}></UserDataTimeScores>}></Route>
                <Route path="/LCHTTestResults" element={<UserData collectionName={"LetterCancel10Score"}></UserData>}></Route>
                <Route path="/LCHSTestResults" element={<UserDataScores collectionName={"LetterCancel10Score"}></UserDataScores>}></Route>
                <Route path="/LCHTSTestResults" element={<UserDataTimeScores collectionName={"LetterCancel10Score"}></UserDataTimeScores>}></Route>
                <Route path="/Admin" element={<Admin></Admin>}></Route>
                <Route path="/admin/inquiries" element={<InquiryTable></InquiryTable>}></Route>
                <Route path="/admin/info" element={<UserTable></UserTable>}></Route>
                <Route path="/admin/grafForm" element={<GraphForm></GraphForm>}></Route>
                <Route path="/admin/TestForm" element={<TestForm></TestForm>}></Route>
                <Route path="/ReitanTestGraph" element={<ShowGraph collectionName={"ReitanTest"}></ShowGraph>}></Route>
                <Route path="/ReitanTestTests" element={<ShowTests collectionName={"ReitanTest"}></ShowTests>}></Route>
                <Route path="/ClickTestGraph" element={<ShowGraph collectionName={"CircleClickerTest"}></ShowGraph>}></Route>
                <Route path="/ClickTestTests" element={<ShowTests collectionName={"CircleClickerTest"}></ShowTests>}></Route>
                <Route path="/StroopTestGraph" element={<ShowGraphS collectionName={"scoresStroopTest"}></ShowGraphS>}></Route>
                <Route path="/StroopTestTests" element={<ShowTestsS collectionName={"scoresStroopTest"}></ShowTestsS>}></Route>
                <Route path="/SwitchTestGraph" element={<ShowGraph collectionName={"SwitchTrailTest"}></ShowGraph>}></Route>
                <Route path="/SwitchTestTests" element={<ShowTests collectionName={"SwitchTrailTest"}></ShowTests>}></Route>
                <Route path="/MS4Graph" element={<ShowGraphS collectionName={"MemoryScan4"}></ShowGraphS>}></Route>
                <Route path="/MS4Tests" element={<ShowTestsS collectionName={"MemoryScan4"}></ShowTestsS>}></Route>
                <Route path="/MS6Graph" element={<ShowGraphS collectionName={"MemoryScan6"}></ShowGraphS>}></Route>
                <Route path="/MS6Tests" element={<ShowTestsS collectionName={"MemoryScan6"}></ShowTestsS>}></Route>
                <Route path="/MS10Graph" element={<ShowGraphS collectionName={"MemoryScan10"}></ShowGraphS>}></Route>
                <Route path="/MS10Tests" element={<ShowTestsS collectionName={"MemoryScan10"}></ShowTestsS>}></Route>
                <Route path="/SUB10Graph" element={<ShowGraph collectionName={"DigitalSub10"}></ShowGraph>}></Route>
                <Route path="/SUB10Tests" element={<ShowTests collectionName={"DigitalSub10"}></ShowTests>}></Route>
                <Route path="/SUB20Graph" element={<ShowGraph collectionName={"DigitalSub20"}></ShowGraph>}></Route>
                <Route path="/SUB20Tests" element={<ShowTests collectionName={"DigitalSub20"}></ShowTests>}></Route>
                <Route path="/SUB30Graph" element={<ShowGraph collectionName={"DigitalSub30"}></ShowGraph>}></Route>
                <Route path="/SUB30Tests" element={<ShowTests collectionName={"DigitalSub30"}></ShowTests>}></Route>
                <Route path="/LC5SGraph" element={<ShowGraphS collectionName={"LetterCancel5Score"}></ShowGraphS>}></Route>
                <Route path="/LC5STests" element={<ShowTestsS collectionName={"LetterCancel5Score"}></ShowTestsS>}></Route>
                <Route path="/LC5TGraph" element={<ShowGraph collectionName={"LetterCancel5Score"}></ShowGraph>}></Route>
                <Route path="/LC5TTests" element={<ShowTests collectionName={"LetterCancel5Score"}></ShowTests>}></Route>
                <Route path="/LC5BGraph" element={<ShowGraphB collectionName={"LetterCancel5Score"}></ShowGraphB>}></Route>
                <Route path="/LC5BTests" element={<ShowTestsB collectionName={"LetterCancel5Score"}></ShowTestsB>}></Route>
                <Route path="/LC8SGraph" element={<ShowGraphS collectionName={"LetterCancel8Score"}></ShowGraphS>}></Route>
                <Route path="/LC8STests" element={<ShowTestsS collectionName={"LetterCancel8Score"}></ShowTestsS>}></Route>
                <Route path="/LC8TGraph" element={<ShowGraph collectionName={"LetterCancel8Score"}></ShowGraph>}></Route>
                <Route path="/LC8TTests" element={<ShowTests collectionName={"LetterCancel8Score"}></ShowTests>}></Route>
                <Route path="/LC8BGraph" element={<ShowGraphB collectionName={"LetterCancel8Score"}></ShowGraphB>}></Route>
                <Route path="/LC8BTests" element={<ShowTestsB collectionName={"LetterCancel8Score"}></ShowTestsB>}></Route>
                <Route path="/LC10SGraph" element={<ShowGraphS collectionName={"LetterCancel10Score"}></ShowGraphS>}></Route>
                <Route path="/LC10STests" element={<ShowTestsS collectionName={"LetterCancel10Score"}></ShowTestsS>}></Route>
                <Route path="/LC10TGraph" element={<ShowGraph collectionName={"LetterCancel10Score"}></ShowGraph>}></Route>
                <Route path="/LC10TTests" element={<ShowTests collectionName={"LetterCancel10Score"}></ShowTests>}></Route>
                <Route path="/LC10BGraph" element={<ShowGraphB collectionName={"LetterCancel10Score"}></ShowGraphB>}></Route>
                <Route path="/LC10BTests" element={<ShowTestsB collectionName={"LetterCancel10Score"}></ShowTestsB>}></Route>
                <Route path="/admin/stats" element={<StatsForm></StatsForm>}></Route>
                <Route path="/admin/stats/średnia" element={<SredniaForm></SredniaForm>}></Route>
                <Route
                    path="/średniaClick"
                    element={<SredniaT/>}
                />
                <Route path="/średniaStroop" element={<SredniaS></SredniaS>}></Route>
                <Route path="/średniaReitan" element={<SredniaT></SredniaT>}></Route>
                <Route path="/średniaSwitch" element={<SredniaT></SredniaT>}></Route>
                <Route path="/średniaMS4" element={<SredniaS></SredniaS>}></Route>
                <Route path="/średniaMS6" element={<SredniaS></SredniaS>}></Route>
                <Route path="/średniaMS10" element={<SredniaS></SredniaS>}></Route>
                <Route path="/średniaSUB10" element={<SredniaT></SredniaT>}></Route>
                <Route path="/średniaSUB20" element={<SredniaT></SredniaT>}></Route>
                <Route path="/średniaSUB30" element={<SredniaT></SredniaT>}></Route>
                <Route path="/średniaLCT5" element={<SredniaT></SredniaT>}></Route>
                <Route path="/średniaLCS5" element={<SredniaS></SredniaS>}></Route>
                <Route path="/średniaLCB5" element={<SredniaB></SredniaB>}></Route>
                <Route path="/średniaLCT8" element={<SredniaT></SredniaT>}></Route>
                <Route path="/średniaLCS8" element={<SredniaS></SredniaS>}></Route>
                <Route path="/średniaLCB8" element={<SredniaB></SredniaB>}></Route>
                <Route path="/średniaLCT10" element={<SredniaT></SredniaT>}></Route>
                <Route path="/średniaLCS10" element={<SredniaS></SredniaS>}></Route>
                <Route path="/średniaLCB10" element={<SredniaB></SredniaB>}></Route>
                <Route path="/admin/stats/tsnform" element={<ShapiroForm></ShapiroForm>}></Route>
                <Route
                    path="/tsnClick"
                    element={<ShapiroT/>}
                />
                <Route path="/tsnStroop" element={<SredniaS></SredniaS>}></Route>
                <Route path="/tsnReitan" element={<SredniaT></SredniaT>}></Route>
                <Route path="/tsnSwitch" element={<SredniaT></SredniaT>}></Route>
                <Route path="/tsnMS4" element={<SredniaS></SredniaS>}></Route>
                <Route path="/tsnMS6" element={<SredniaS></SredniaS>}></Route>
                <Route path="/tsnMS10" element={<SredniaS></SredniaS>}></Route>
                <Route path="/tsnSUB10" element={<SredniaT></SredniaT>}></Route>
                <Route path="/tsnSUB20" element={<SredniaT></SredniaT>}></Route>
                <Route path="/tsnSUB30" element={<SredniaT></SredniaT>}></Route>
                <Route path="/tsnLCT5" element={<SredniaT></SredniaT>}></Route>
                <Route path="/tsnLCS5" element={<SredniaS></SredniaS>}></Route>
                <Route path="/tsnLCB5" element={<SredniaB></SredniaB>}></Route>
                <Route path="/tsnLCT8" element={<SredniaT></SredniaT>}></Route>
                <Route path="/tsnLCS8" element={<SredniaS></SredniaS>}></Route>
                <Route path="/tsnLCB8" element={<SredniaB></SredniaB>}></Route>
                <Route path="/tsnLCT10" element={<SredniaT></SredniaT>}></Route>
                <Route path="/tsnLCS10" element={<SredniaS></SredniaS>}></Route>
                <Route path="/tsnLCB10" element={<SredniaB></SredniaB>}></Route>
            </Routes>
        </div>
    </div>
  );
}

export default App;
