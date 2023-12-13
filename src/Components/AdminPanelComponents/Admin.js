import {useEffect, useRef, useState} from "react";
import { getAuth } from "firebase/auth";
import {addDoc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import * as emailjs from "@emailjs/browser";
import {toast, ToastContainer} from "react-toastify";
import "../../Styles/admin.css";


export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_xknzhod','template_kinhkh9',form.current,'fuAfdM1HyFoNzZkXP')
            .then(async (result) => {
                toast('🦄 sent!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                const email = form.current.user_email.value;
                await saveEmailToFirestore(email);
                console.log(result.text);
            },(error) => {
                toast('🦄 Failure!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(error.text);
            });
    };

    const saveEmailToFirestore = async (email) => {
        const db = getFirestore();
        const asksCollection = collection(db, "asks");

        await addDoc(asksCollection, {
            userEmail: email,
        });
        console.log("Email saved to Firestore")
    }

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();
        const usersCollection = collection(db, "users");


        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log("User state changed:", user); // Debugging
            if (user) {
                console.log("User Email:", user.email); // Debugging
                const userQuery = query(usersCollection, where("userEmail", "==", user.email));
                console.log("Query:", userQuery); // Debugging
                const querySnapshot = await getDocs(userQuery);
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    console.log("User Data:", userData); // Debugging
                    setIsAdmin(userData.isAdmin === true);
                    console.log("true")
                });
            } else {
                setIsAdmin(false); // User is not logged in, so isAdmin should be false.
                console.log("false")
            }
        });

        // Clean up the listener when the component unmounts.
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {isAdmin ? (
                <div>
                    <h1>Welcome to the Admin Panel</h1>
                </div>
            ) : (
                <div>
                    <h1>You do not have permissions to be here</h1>
                    <p>Ask an admin for permission</p>
                    <form ref={form} onSubmit={sendEmail} className="admin-form">
                        <label className="form-label">Name</label>
                        <input type="text" name="user_name" className="form-input" />
                        <label className="form-label">Email</label>
                        <input type="email" name="user_email" className="form-input" />
                        <label className="form-label">Message</label>
                        <textarea name="message" className="form-textarea" />
                        <input type="submit" value="Send" className="form-button" />
                    </form>

                </div>
            )}
        </div>
    );
}
