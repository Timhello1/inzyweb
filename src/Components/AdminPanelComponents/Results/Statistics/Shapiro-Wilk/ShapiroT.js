import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { jStat } from "jstat";
import { useLocation } from "react-router-dom";

const ShapiroT = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const collectionName = searchParams.get("collectionName") || "defaultCollectionName";
    const startTime = searchParams.get("startTime") || "defaultStartTime";
    const endTime = searchParams.get("endTime") || "defaultEndTime";

    const [normalityResults, setNormalityResults] = useState([]);

    useEffect(() => {
        const fetchDataAndRunTest = async () => {
            try {
                const db = getFirestore();
                const collectionRef = collection(db, collectionName);
                const q = query(collectionRef);

                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs.map((doc) => {
                    const docData = doc.data();
                    const timestamp = new Date(docData.timestamp).getTime();

                    return {
                        userEmail: docData.userEmail,
                        timestamp,
                        // Add any data you want to use for the normality test.
                        score: docData.score || 0,
                    };
                });

                const results = [];

                data.forEach(({ userEmail, timestamp, score }) => {
                    if (timestamp >= new Date(startTime).getTime() && timestamp <= new Date(endTime).getTime()) {
                        // Perform normality assessment based on confidence intervals
                        const alpha = 0.05; // Set your desired confidence level
                        const sd = jStat.stdev(score);
                        const n = score.length;

                        // Calculate the confidence interval
                        const [lower, upper] = jStat.normalci(jStat.mean(score), alpha, sd, n);

                        // Check if the mean is within the confidence interval
                        const isNormal = jStat.mean(score) >= lower && jStat.mean(score) <= upper;

                        results.push({
                            userEmail,
                            normalityTestResult: isNormal,
                        });
                    }
                });

                setNormalityResults(results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataAndRunTest();
    }, [collectionName, startTime, endTime]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Email</TableCell>
                            <TableCell>Normality Test Result</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {normalityResults.map(({ userEmail, normalityTestResult }, index) => (
                            <TableRow key={index}>
                                <TableCell>{userEmail}</TableCell>
                                <TableCell>{normalityTestResult ? "Normal" : "Not Normal"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ShapiroT;
