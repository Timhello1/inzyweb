import GameCard from "./GameCard";
import "../../../Styles/homeStyle.css"
import circleClickTest from "../../images/circleClickTest.png"
import stroopTest from "../../images/stroopTest.png"
import SwitchTrail from "../../images/SwitchTrail.png"
import ReitanTest from "../../images/ReitanTest.png"
import LetterCancelTest1 from "../../images/LetterCancelTest1.png"
import LetterCancelTest2 from "../../images/LetterCancelTest2.png"
import LetterCancelTest3 from "../../images/LetterCancelTest3.png"
import DigitSubTest1 from "../../images/DigitSubTest1.png"
import DigitSubTest2 from "../../images/DigitSubTest2.png"
import DigitSubTest3 from "../../images/DigitSubTest3.png"
import MemoryScanTest1 from "../../images/MemoryScanTest1.png"
import MemoryScanTest2 from "../../images/MemoryScanTest2.png"
import MemoryScanTest3 from "../../images/MemoryScanTest3.png"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";

const Home = () => {

    const [currentUser] = useState(getAuth().currentUser);
    const [hasDoneCircleClickTest, setHasDoneCircleClickTest] = useState(false);
    const [hasDoneStroopTest, setHasDoneStroopTest] = useState(false);
    const [hasDoneSwitchTrailTest, setHasDoneSwitchTrailTest] = useState(false);
    const [hasDoneReitanTest, setHasDoneReitanTest] = useState(false);
    const [hasDoneLCTETest, setHasDoneLCTETest] = useState(false);
    const [hasDoneLCTMTest, setHasDoneLCTMTest] = useState(false);
    const [hasDoneLCTHTest, setHasDoneLCTHTest] = useState(false);
    const [hasDoneDSSTETest, setHasDoneDSSTETest] = useState(false);
    const [hasDoneDSSTMTest, setHasDoneDSSTMTest] = useState(false);
    const [hasDoneDSSTHTest, setHasDoneDSSTHTest] = useState(false);
    const [hasDoneSMSTETest, setHasDoneSMSTETest] = useState(false);
    const [hasDoneSMSTMTest, setHasDoneSMSTMTest] = useState(false);
    const [hasDoneSMSTHTest, setHasDoneSMSTHTest] = useState(false);



    useEffect(() => {

        const checkSMSTH = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const SMSTHRef = query(collection(getFirestore(), 'MemoryScan10'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(SMSTHRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneSMSTHTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkSMSTM = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const SMSTMRef = query(collection(getFirestore(), 'MemoryScan6'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(SMSTMRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneSMSTMTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkSMSTE = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const SMSTERef = query(collection(getFirestore(), 'MemoryScan4'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(SMSTERef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneSMSTETest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkDSSTH = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const DSSTHRef = query(collection(getFirestore(), 'DigitalSub30'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(DSSTHRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneDSSTHTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkDSSTM = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const DSSTMRef = query(collection(getFirestore(), 'DigitalSub20'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(DSSTMRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneDSSTMTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkDSSTE = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const DSSTERef = query(collection(getFirestore(), 'DigitalSub10'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(DSSTERef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneDSSTETest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkLCTH = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const LCTHRef = query(collection(getFirestore(), 'LetterCancel10Score'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(LCTHRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneLCTHTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkLCTM = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const LCTMRef = query(collection(getFirestore(), 'LetterCancel8Score'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(LCTMRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneLCTMTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkLCTE = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const LCTERef = query(collection(getFirestore(), 'LetterCancel5Score'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(LCTERef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneLCTETest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkCircleClickTest = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const circleClickTestRef = query(collection(getFirestore(), 'CircleClickerTest'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(circleClickTestRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')


                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneCircleClickTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkSwitchTrailTest = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const SwitchTrailTestRef = query(collection(getFirestore(), 'SwitchTrailTest'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(SwitchTrailTestRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneSwitchTrailTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkReitanTest = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const ReitanTestRef = query(collection(getFirestore(), 'ReitanTest'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(ReitanTestRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15); // Convert timestamp to date object

                        const modicurrentDate = currentDate.replace(',', '')

                        console.log(testDate)
                        console.log(modicurrentDate)

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneReitanTest(true);
                        }

                    });

                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        const checkStroopTest = async (userEmail) => {
            try {

                const currentDate = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }); // Get current date object in the format 'Nov 17 2023'

                const StroopTestRef = query(collection(getFirestore(), 'scoresStroopTest'), where('userEmail', '==', userEmail));
                const snapshot = await getDocs(StroopTestRef);

                if (!snapshot.empty) {

                    snapshot.forEach((doc) => {
                        const testDate = doc.data().timestamp.substring(4,15);
                        const modicurrentDate = currentDate.replace(',', '')

                        if (testDate === modicurrentDate) {
                            // User has done the circleClickTest today
                            setHasDoneStroopTest(true);
                        }
                    });
                }
            } catch (error) {
                console.error('Error checking circleClickTest:', error);
            }
        };

        if (currentUser) {
            checkCircleClickTest(currentUser.email);
            checkStroopTest(currentUser.email)
            checkSwitchTrailTest(currentUser.email)
            checkReitanTest(currentUser.email)
            checkLCTE(currentUser.email)
            checkLCTM(currentUser.email)
            checkLCTH(currentUser.email)
            checkDSSTE(currentUser.email)
            checkDSSTM(currentUser.email)
            checkDSSTH(currentUser.email)
            checkSMSTE(currentUser.email)
            checkSMSTM(currentUser.email)
            checkSMSTH(currentUser.email)
        }
    }, [currentUser]);

    const cardsData = [
        { path: '/ClickTestWelcome', imageURL: circleClickTest ,heading: 'Test Zwinności',text: 'Test, sprawdzający reflex i precyzję'},
        { path: '/StroopTestWelcome',imageURL: stroopTest ,heading: 'Test Stroopa',text: 'Test sprawdzający szybkość podejmowania decyzji'},
        { path: '/SwitchTrailWelcome',imageURL: SwitchTrail ,heading: 'Test zmieniającej ścieżki',text: 'test sprawdzający spostrzegawczość i reflex'},
        { path: '/ReitanTestWelcome',imageURL: ReitanTest ,heading: 'Test Reitana',text: 'Test sprawdzający spostrzegawczość na numerach'},
        { path: '/LetterCancellationTestWelcome',imageURL: LetterCancelTest1 ,heading: 'Test anulowania liter (Łatwy)',text: 'Test sprawdzający spostrzegawczość na literach'},
        { path: '/LetterCancellationTestWelcome',imageURL: LetterCancelTest2 ,heading: 'Test anulowania liter (Średni)',text: 'Test sprawdzający spostrzegawczość na literach'},
        { path: '/LetterCancellationTestWelcome',imageURL: LetterCancelTest3 ,heading: 'Test anulowania liter (Trudny)',text: 'Test sprawdzający spostrzegawczość na literach'},
        { path: '/DigitSubWelcome',imageURL: DigitSubTest1 ,heading: 'Test substytucji cyfr (Łatwy)',text: 'Test sprawdzający umiejętność łączenia symboli w umyśle'},
        { path: '/DigitSubWelcome',imageURL: DigitSubTest2 ,heading: 'Test substytucji cyfr (Średni)',text: 'Test sprawdzający umiejętność łączenia symboli w umyśle'},
        { path: '/DigitSubWelcome',imageURL: DigitSubTest3 ,heading: 'Test substytucji cyfr (Trudny)',text: 'Test sprawdzający umiejętność łączenia symboli w umyśle'},
        { path: '/MemoryScanWelcome',imageURL: MemoryScanTest1,heading: 'Test skanu pamięci (Łatwy)',text: 'Test sprawdzający pamięć'},
        { path: '/MemoryScanWelcome',imageURL: MemoryScanTest2,heading: 'Test skanu pamięci (Średni)',text: 'Test sprawdzający pamięć'},
        { path: '/MemoryScanWelcome',imageURL: MemoryScanTest3,heading: 'Test skanu pamięci (Trudny)',text: 'Test sprawdzający pamięć'},
    ];
    return (
      <div className="home">
          <h1>Testy do wykonania na dziś</h1>
          <div className="cardcontainer">
              {cardsData.map((card,index) => (
                  <Link to={card.path} key={index}>
                      {(card.imageURL === circleClickTest && hasDoneCircleClickTest)
                      || (card.imageURL === stroopTest && hasDoneStroopTest)
                      || (card.imageURL === SwitchTrail && hasDoneSwitchTrailTest)
                      || (card.imageURL === ReitanTest && hasDoneReitanTest)
                      || (card.imageURL === LetterCancelTest1 && hasDoneLCTETest)
                      || (card.imageURL === LetterCancelTest2 && hasDoneLCTMTest)
                      || (card.imageURL === LetterCancelTest3 && hasDoneLCTHTest)
                      || (card.imageURL === DigitSubTest1 && hasDoneDSSTETest)
                      || (card.imageURL === DigitSubTest2 && hasDoneDSSTMTest)
                      || (card.imageURL === DigitSubTest3 && hasDoneDSSTHTest)
                      || (card.imageURL === MemoryScanTest1 && hasDoneSMSTETest)
                      || (card.imageURL === MemoryScanTest2 && hasDoneSMSTMTest)
                      || (card.imageURL === MemoryScanTest3 && hasDoneSMSTHTest)
                          ? null : <GameCard key={index} {...card} />}
                  </Link>
              ))}
          </div>

      </div>
    );
};

export default Home;