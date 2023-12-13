import React, { useEffect, useState } from "react";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../../../Styles/UserData.css";

const ShowGraph = ({ collectionName }) => {
    const [userData, setUserData] = useState([]);
    const firestore = getFirestore();
    const [yAxisDomain, setYAxisDomain] = useState([0, 1]); // Initial domain for Y-axis

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(firestore, collectionName));

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

                    // Group data by userEmail
                    const groupedData = data.reduce((acc, item) => {
                        const userEmail = item.userEmail;
                        if (!acc[userEmail]) {
                            acc[userEmail] = [];
                        }
                        acc[userEmail].push(item);
                        return acc;
                    }, {});

                    const timeValues = data.map(item => item.time);
                    const minY = Math.min(...timeValues);
                    const maxY = Math.max(...timeValues);

                    setYAxisDomain([minY, maxY]);

                    setUserData(Object.entries(groupedData));
                } else {
                    setUserData([]);
                }
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        fetchData();
    }, [collectionName, firestore]);

    return (
        <div className="chart-container">
            {userData.length > 0 ? (
                <div className="chart">
                    <LineChart width={window.innerWidth * 0.8} height={400}>
                        <XAxis dataKey="timestamp" tick={{ fontSize: 0.1 }} interval={0} angle={45} textAnchor="start" />
                        <YAxis domain={yAxisDomain} />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        {userData.map(([userEmail, userDataSet]) => (
                            <Line
                                key={userEmail}
                                type="monotone"
                                dataKey="time"
                                data={userDataSet}
                                name={userEmail}
                                stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Random color for each user
                                activeDot={{ r: 8 }}
                            />
                        ))}
                    </LineChart>
                </div>
            ) : (
                <p>No data available for the current user</p>
            )}
        </div>
    );
};

export default ShowGraph();
