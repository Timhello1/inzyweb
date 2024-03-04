import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useLocation } from "react-router-dom";

const SredniaT = () => {
    // Use useLocation to get the query parameters
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Extract the necessary parameters from the URL
    const collectionName = searchParams.get("collectionName") || "defaultCollectionName";
    const startTime = searchParams.get("startTime") || "defaultStartTime";
    const endTime = searchParams.get("endTime") || "defaultEndTime";

    const [dataSets, setDataSets] = useState([]);

    const fetchData = async () => {
        try {
            const db = getFirestore();
            const collectionRef = collection(db, collectionName);
            const q = query(collectionRef);

            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map((doc) => {
                const docData = doc.data();
                const timestamp = new Date(docData.timestamp).getTime(); // Convert to timestamp

                return {
                    id: doc.id,
                    ...docData,
                    timestamp,
                };
            });

            console.log('Original data:', data);

            // Logging the provided startTime and endTime for debugging
            console.log('Provided startTime:', new Date(startTime).getTime());
            console.log('Provided endTime:', new Date(endTime).getTime());

            // Filter data based on start and end timestamps
            const filteredData = data.filter(({ timestamp, time }) => {
                console.log('Current timestamp:', timestamp);

                // Convert time to a number before using it
                const numericTime = parseFloat(time);

                return (
                    !isNaN(numericTime) &&
                    timestamp >= new Date(startTime).getTime() &&
                    timestamp <= new Date(endTime).getTime()
                );
            });

            console.log('Filtered data:', filteredData);

            // Sort the filtered data by timestamp in ascending order
            filteredData.sort((a, b) => a.timestamp - b.timestamp);

            const sets = {};

            filteredData.forEach(({ userEmail, time, id }) => {
                if (!sets[userEmail]) {
                    sets[userEmail] = { totalTime: 0, count: 0 };
                }

                // Convert time to a number before using it
                const numericTime = parseFloat(time);

                sets[userEmail].totalTime += numericTime;
                sets[userEmail].count += 1;
            });

            const averages = Object.entries(sets).map(([userEmail, { totalTime, count }]) => ({
                userEmail,
                averageTime: count > 0 ? totalTime / count : 0,
            }));

            setDataSets(averages);
            console.log('Sets:', sets);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        fetchData();
        console.log("collection:", collectionName);
        console.log("start:", startTime);
        console.log("end:", endTime);
    }, [collectionName, startTime, endTime]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>średni czas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSets.map(({ userEmail, averageTime }, index) => (
                            <TableRow key={index}>
                                <TableCell>{userEmail}</TableCell>
                                <TableCell>{averageTime.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SredniaT;
