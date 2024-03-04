import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useLocation } from "react-router-dom";

const SredniaB = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

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
            const filteredData = data.filter(({ timestamp, time, score }) => {
                console.log('Current timestamp:', timestamp);

                // Convert time and score to numbers before using them
                const numericTime = parseFloat(time);
                const numericScore = parseFloat(score);

                return (
                    !isNaN(numericTime) &&
                    !isNaN(numericScore) &&
                    timestamp >= new Date(startTime).getTime() &&
                    timestamp <= new Date(endTime).getTime()
                );
            });

            console.log('Filtered data:', filteredData);

            // Sort the filtered data by timestamp in ascending order
            filteredData.sort((a, b) => a.timestamp - b.timestamp);

            const timeSets = {};
            const scoreSets = {};

            filteredData.forEach(({ userEmail, time, score, id }) => {
                if (!timeSets[userEmail]) {
                    timeSets[userEmail] = { totalTime: 0, count: 0 };
                }

                if (!scoreSets[userEmail]) {
                    scoreSets[userEmail] = { totalScore: 0, count: 0 };
                }

                const numericTime = parseFloat(time);
                const numericScore = parseFloat(score);

                timeSets[userEmail].totalTime += numericTime;
                timeSets[userEmail].count += 1;

                scoreSets[userEmail].totalScore += numericScore;
                scoreSets[userEmail].count += 1;
            });

            const timeAverages = Object.entries(timeSets).map(([userEmail, { totalTime, count }]) => ({
                userEmail,
                averageTime: count > 0 ? totalTime / count : 0,
            }));

            const scoreAverages = Object.entries(scoreSets).map(([userEmail, { totalScore, count }]) => ({
                userEmail,
                averageScore: count > 0 ? totalScore / count : 0,
            }));

            // Combine time and score averages
            const combinedAverages = timeAverages.map(({ userEmail, averageTime }) => {
                const correspondingScore = scoreAverages.find((item) => item.userEmail === userEmail);
                return {
                    userEmail,
                    averageTime,
                    averageScore: correspondingScore ? correspondingScore.averageScore : 0,
                };
            });

            setDataSets(combinedAverages);
            console.log('Time Sets:', timeSets);
            console.log('Score Sets:', scoreSets);
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
                            <TableCell>User Email</TableCell>
                            <TableCell>Average Time</TableCell>
                            <TableCell>Average Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSets.map(({ userEmail, averageTime, averageScore }, index) => (
                            <TableRow key={index}>
                                <TableCell>{userEmail}</TableCell>
                                <TableCell>{averageTime.toFixed(2)}</TableCell>
                                <TableCell>{averageScore.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SredniaB;
