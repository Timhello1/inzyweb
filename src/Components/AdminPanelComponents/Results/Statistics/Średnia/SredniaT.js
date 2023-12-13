import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const ŚredniaT = ({ collectionName, startTime, endTime }) => {
    const [dataSets, setDataSets] = useState([]);


    const fetchData = async () => {
        try {
            const db = getFirestore();
            const collectionRef = collection(db, collectionName);
            const q = query(collectionRef);

            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map((doc) => {
                const docData = doc.data();
                const timestamp = new Date(docData.timestamp);

                return {
                    id: doc.id,
                    ...docData,
                    timestamp,
                };
            });

            // Filter data based on start and end timestamps
            const filteredData = data.filter(
                ({ timestamp }) => timestamp >= startTime && timestamp <= endTime
            );

            // Sort the filtered data by timestamp in ascending order
            filteredData.sort((a, b) => a.timestamp - b.timestamp);

            const sets = {};

            filteredData.forEach(({ userEmail, time, id }) => {
                if (!sets[userEmail]) {
                    sets[userEmail] = { totalTime: 0, count: 0 };
                }

                sets[userEmail].totalTime += time;
                sets[userEmail].count += 1;
            });

            const averages = Object.entries(sets).map(([userEmail, { totalTime, count }]) => ({
                userEmail,
                averageTime: count > 0 ? totalTime / count : 0,
            }));

            setDataSets(averages);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [collectionName, startTime, endTime]);



    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Email</TableCell>
                            <TableCell>Average Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSets.map(({ userEmail, averageTime }, index) => (
                            <TableRow key={index}>
                                <TableCell>{userEmail}</TableCell>
                                <TableCell>{averageTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
export default ŚredniaT;
