import React, { useEffect, useState } from 'react';
import {
    getFirestore,
    collection,
    query,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

const ShowTests = ({ collectionName }) => {
    const [dataSets, setDataSets] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newTestInfo, setNewTestInfo] = useState('');
    const [selectedTestInfo, setSelectedTestInfo] = useState('');

    const fetchData = async () => {
        try {
            const db = getFirestore();
            const collectionRef = collection(db, collectionName);
            const q = query(collectionRef);

            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map(doc => {
                const docData = doc.data();
                const timestamp = new Date(docData.timestamp);

                return {
                    id: doc.id,
                    ...docData,
                    timestamp,
                };
            });

            // Sort the data by timestamp in ascending order
            data.sort((a, b) => a.timestamp - b.timestamp);

            const sets = {};

            data.forEach(({ userEmail, timestamp, score,time, id, testInfo }) => {
                if (!sets[userEmail]) {
                    sets[userEmail] = [];
                }

                sets[userEmail].push({ id, timestamp, score,time, testInfo });
            });

            setDataSets(Object.entries(sets));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [collectionName]);

    const openDrawer = (userId, testInfo) => {
        setSelectedUserId(userId);
        setSelectedTestInfo(testInfo);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setSelectedUserId(null);
        setSelectedTestInfo('');
        setDrawerOpen(false);
    };

    const openDialog = (userId, testInfo) => {
        setSelectedUserId(userId);
        setSelectedTestInfo(testInfo);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedUserId(null);
        setSelectedTestInfo('');
        setDialogOpen(false);
    };

    const handleTestInfoUpdate = async () => {
        if (selectedUserId) {
            try {
                const db = getFirestore();
                const docRef = doc(db, collectionName, selectedUserId);
                await updateDoc(docRef, { testInfo: newTestInfo });

                // Update the local state with the new testInfo
                const updatedSets = dataSets.map(([userEmail, data]) =>
                    userEmail === selectedUserId
                        ? [userEmail, data.map((item) => {
                            if (item.id === selectedUserId) {
                                return { ...item, testInfo: newTestInfo };
                            }
                            return item;
                        })]
                        : [userEmail, data]
                );

                // Update the selectedTestInfo in the state
                setSelectedTestInfo(newTestInfo);

                setDataSets(updatedSets);


                closeDialog();
            } catch (error) {
                console.error('Error updating TestInfo:', error);
            }
        }
    };

    const handleDelete = async (setId, docId) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, collectionName, docId);
            await deleteDoc(docRef);

            // Remove the deleted item from the state
            setDataSets(prevSets =>
                prevSets.map(([userEmail, data]) =>
                    userEmail === setId
                        ? [userEmail, data.filter(item => item.id !== docId)]
                        : [userEmail, data]
                )
            );
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    return (
        <>
            {dataSets.map(([userEmail, data], index) => (
                <div key={index}>
                    <h2>User Email: {userEmail}</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Timestamp</TableCell>
                                    <TableCell>Score</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Test Info</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map(({ id, timestamp, score,time, testInfo }, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{timestamp.toLocaleString()}</TableCell>
                                        <TableCell>{score}</TableCell>
                                        <TableCell>{time}</TableCell>
                                        <TableCell onClick={() => openDialog(id, testInfo)}>{testInfo}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleDelete(userEmail, id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Drawer for editing TestInfo */}
                    <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
                        <List>
                            <ListItem>
                                <ListItemText primary="Current Test Info" secondary={selectedTestInfo} />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => openDialog(selectedUserId, selectedTestInfo)}
                            >
                                <ListItemText primary="Edit Test Info" />
                            </ListItem>
                        </List>
                    </Drawer>

                    {/* Dialog for editing TestInfo */}
                    <Dialog open={isDialogOpen} onClose={closeDialog}>
                        <DialogTitle>Edit TestInfo</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Current Test Info"
                                variant="outlined"
                                fullWidth
                                disabled
                                value={selectedTestInfo}
                            />
                            <TextField
                                label="New TestInfo"
                                variant="outlined"
                                fullWidth
                                value={newTestInfo}
                                onChange={(e) => setNewTestInfo(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDialog}>Cancel</Button>
                            <Button onClick={handleTestInfoUpdate}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ))}
        </>
    );
};

export default ShowTests;
