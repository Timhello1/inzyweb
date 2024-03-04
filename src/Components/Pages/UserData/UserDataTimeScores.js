import React, { useEffect, useState } from "react";
import { collection, query, where, getFirestore, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../../../Styles/UserData.css";

const UserData = ({ collectionName }) => {
    const [userData, setUserData] = useState([]);
    const firestore = getFirestore();
    const [yAxisDomain, setYAxisDomain] = useState([0, 1]); // Initial domain for Y-axis

    useEffect(() => {
        const user = getAuth().currentUser;
        const userEmail = user ? user.email : null;


        if (userEmail) {
            const fetchData = async () => {
                const q = query(
                    collection(firestore, collectionName),
                    where('userEmail', '==', userEmail)
                );

                try {
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const data = querySnapshot.docs.map(doc => {
                            const docData = doc.data();
                            const timestamp = new Date(docData.timestamp);

                            // Extract year, month, day, hour, minute, and second
                            const year = timestamp.getFullYear();
                            const month = timestamp.getMonth() + 1; // Months are 0-based
                            const day = timestamp.getDate();
                            const hour = timestamp.getHours();
                            const minute = timestamp.getMinutes();
                            const second = timestamp.getSeconds();

                            return {
                                ...docData,
                                year,
                                month,
                                day,
                                hour,
                                minute,
                                second
                            };
                        });

                        // Sort the data by the extracted timestamp components
                        data.sort((a, b) => {
                            if (a.year !== b.year) return a.year - b.year;
                            if (a.month !== b.month) return a.month - b.month;
                            if (a.day !== b.day) return a.day - b.day;
                            if (a.hour !== b.hour) return a.hour - b.hour;
                            if (a.minute !== b.minute) return a.minute - b.minute;
                            return a.second - b.second;
                        });

                        const timeValues = data.map(item => item.time);
                        const scoreValues = data.map(item => item.score); // Add this line

                        const minYTime = Math.min(...timeValues);
                        const maxYTime = Math.max(...timeValues);
                        const minYScore = Math.min(...scoreValues); // Add this line
                        const maxYScore = Math.max(...scoreValues); // Add this line

                        setYAxisDomain({ time: [minYTime, maxYTime], score: [minYScore, maxYScore] }); // Update this line

                        setUserData(data);
                    } else {
                        setUserData([]);
                    }
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
            };

            fetchData();
        }
    }, [collectionName]);

    return (
        <div className="chart-container">
            {userData.length > 0 ? (
                <div className="chart">
                    <LineChart width={window.innerWidth * 0.8} height={400} data={userData}>
                        <XAxis dataKey="timestamp" tick={{ fontSize: 0.1 }} interval={0} angle={45} textAnchor="start" />
                        <YAxis domain={yAxisDomain.time} />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="score" stroke="#82ca9d" activeDot={{ r: 8 }} /> {/* Add this line */}
                    </LineChart>
                </div>
            ) : (
                <p>No data available for the current user</p>
            )}
        </div>
    );
};

export default UserData;
