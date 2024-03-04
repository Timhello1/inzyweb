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

const ShowGraphS = ({ collectionName }) => {
    const [dataSets, setDataSets] = useState([]);

    useEffect(() => {
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
                        ...docData,
                        timestamp,
                    };
                });

                // Sort the data by timestamp in ascending order
                data.sort((a, b) => a.timestamp - b.timestamp);

                const sets = {};

                data.forEach(({ userEmail, timestamp, score }) => {
                    if (!sets[userEmail]) {
                        sets[userEmail] = [];
                    }

                    sets[userEmail].push({ timestamp, score });
                });

                setDataSets(Object.entries(sets));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [collectionName]);

    // Combine all sets into a single dataset for the combined graph
    const combinedData = dataSets.reduce((combinedData, [userEmail, data]) => {
        data.forEach(({ timestamp, score }) => {
            const entry = combinedData.find((entry) => entry.timestamp === timestamp);
            if (!entry) {
                combinedData.push({ timestamp });
            }
            combinedData.forEach((entry) => {
                if (entry.timestamp === timestamp) {
                    entry[userEmail] = score;
                }
            });
        });
        return combinedData;
    }, []);

    // Sort combinedData by timestamp in ascending order
    combinedData.sort((a, b) => a.timestamp - b.timestamp);

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
                            dataKey="score"
                            name={`Set for ${userEmail}`}
                            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                        />
                    </LineChart>
                </div>
            ))}
            <div style={{ marginBottom: '20px' }}>
                <h2>Combined Graph</h2>
                <LineChart
                    width={1400}
                    height={700}
                    data={combinedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" label={{ value: 'data', position: 'insideBottom'}} tick={() => null} />
                    <YAxis label={{ value: 'czas [s]', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip />
                    <Legend />
                    {dataSets.map(([userEmail], index) => (
                        <Line
                            key={index}
                            type="monotone"
                            dataKey={userEmail}
                            name={`Set for ${userEmail}`}
                            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                        />
                    ))}
                </LineChart>
            </div>
        </div>
    );
};

export default ShowGraphS;
