import {useEffect, useState} from "react";
import async from "async";
import {collection, getDocs, getFirestore, query, deleteDoc, doc, updateDoc, where} from "firebase/firestore";
import {Button, Table} from "@mui/material";

const InquiryTable = () => {
    const[inquiries,setInquiries] = useState([]);

    useEffect(() => {
       const fetchInquiries = async () => {
           const db = getFirestore();
           const asksCollection = collection(db, "asks");
           const q = query(asksCollection);

           const querySnapshot = await getDocs(q);

           const inquiriesData = [];
           querySnapshot.forEach((doc) => {
            inquiriesData.push({
               id: doc.id,
                userEmail: doc.data().userEmail,
            });
           });
           setInquiries(inquiriesData);
       };
       fetchInquiries();
    },[]);

    const handleAccept = async (id, userEmail) => {
        await deleteDoc(doc(collection(getFirestore(),"asks"),id));

        const usersCollection = collection(getFirestore(), "users");
        const userQuery = query(usersCollection, where("userEmail", "==", userEmail));
        const userQuerySnapshot = await getDocs(userQuery);

        // Assuming there is only one user with the given email
        if (userQuerySnapshot.size === 1) {
            const userDoc = userQuerySnapshot.docs[0];
            const userId = userDoc.id;

            // Update the user document to set isAdmin to true
            await updateDoc(doc(usersCollection, userId), { isAdmin: true });
        }

        setInquiries((prevInquiries) => prevInquiries.filter((inquiry) => inquiry.id !== id));
    };
    const handleDecline = async (id) => {
        // Handle decline logic (e.g., update the database, send a rejection email, etc.)
        // For simplicity, this example just removes the inquiry from the table
        await deleteDoc(doc(collection(getFirestore(), "asks"), id));
        setInquiries((prevInquiries) => prevInquiries.filter((inquiry) => inquiry.id !== id));
    };
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Email</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                    <td>{inquiry.userEmail}</td>
                    <td>
                        <Button variant="success" onClick={() => handleAccept(inquiry.id, inquiry.userEmail)}>
                            Akceptuj
                        </Button>{" "}
                        <Button variant="danger" onClick={() => handleDecline(inquiry.id)}>
                            Odrzuć
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default InquiryTable;
