import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const ShowGraph = ({ collectionName }) => {
    const [dataSets, setDataSets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const collectionRef = collection(db, collectionName);
                const q = query(collectionRef);

                const querySnapshot = await getDocs(q);

                const rawData = querySnapshot.docs.map((doc) => {
                    const docData = doc.data();
                    const timestamp = new Date(docData.timestamp);

                    return {
                        ...docData,
                        timestamp,
                    };
                });

                // Sort the data by timestamp in ascending order
                rawData.sort((a, b) => a.timestamp - b.timestamp);

                const sets = {};

                rawData.forEach(({ userEmail, timestamp, time, score }) => {
                    if (!sets[userEmail]) {
                        sets[userEmail] = [];
                    }

                    sets[userEmail].push({ timestamp, time, score });
                });

                setDataSets(Object.entries(sets));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [collectionName]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {dataSets.map(([userEmail, data], index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h2>User Email: {userEmail}</h2>
                    <LineChart
                        width={600}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" label={{ value: 'data', position: 'insideBottom'}} tick={() => null} />
                        <YAxis label={{ value: 'czas [s]', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="time"
                            name={`Time for ${userEmail}`}
                            stroke="#8884d8" // You can choose your own color
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            name={`Score for ${userEmail}`}
                            stroke="#82ca9d" // You can choose your own color
                        />
                    </LineChart>
                </div>
            ))}
        </div>
    );
};

export default ShowGraph;
