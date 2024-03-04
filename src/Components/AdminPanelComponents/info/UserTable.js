import React, { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    getFirestore,
    updateDoc,
    doc,
} from "firebase/firestore";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState("");
    const [selectedUserType, setSelectedUserType] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const db = getFirestore();
            const usersCollection = collection(db, "users");
            const querySnapshot = await getDocs(usersCollection);

            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push({
                    id: doc.id,
                    userEmail: doc.data().userEmail,
                    userInfo: doc.data().userInfo,
                    userType: doc.data().userType,
                });
            });
            setUsers(usersData);
        };
        fetchUsers();
    }, []);

    const openDrawer = (userId) => {
        setSelectedUserId(userId);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setSelectedUserId(null);
        setDrawerOpen(false);
    };

    const openDialog = (userId) => {
        setSelectedUserId(userId);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedUserId(null);
        setDialogOpen(false);
    };

    const handleUserInfoUpdate = async () => {
        if (selectedUserId) {
            const db = getFirestore();
            const userRef = doc(db, "users", selectedUserId);
            await updateDoc(userRef, { userInfo: newUserInfo });
            closeDialog();
            // Update the local state with the new userInfo
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUserId
                        ? { ...user, userInfo: newUserInfo }
                        : user
                )
            );
        }
    };

    const handleUserTypeUpdate = async (selectedUserType) => {
        if (selectedUserId) {
            const db = getFirestore();
            const userRef = doc(db, "users", selectedUserId);
            await updateDoc(userRef, { userType: selectedUserType });
            closeDrawer();
            // Update the local state with the new user type
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUserId
                        ? { ...user, userType: selectedUserType }
                        : user
                )
            );
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell onClick={() => openDialog(null)}>Informacja</TableCell>
                            <TableCell onClick={() => openDrawer(null)}>Typ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.userEmail}</TableCell>
                                <TableCell onClick={() => openDialog(user.id)}>
                                    {user.userInfo}
                                </TableCell>
                                <TableCell onClick={() => openDrawer(user.id)}>
                                    {user.userType}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for editing UserInfo */}
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Edytuj informację</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nowa informacja"
                        variant="outlined"
                        fullWidth
                        value={newUserInfo}
                        onChange={(e) => setNewUserInfo(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Odrzuć</Button>
                    <Button onClick={handleUserInfoUpdate}>Zapisz</Button>
                </DialogActions>
            </Dialog>

            {/* Drawer for editing UserType */}
            <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
                <List>
                    {[
                        "0-14",
                        "15-20",
                        "21-30",
                        "31-40",
                        "41-50",
                        "51-60",
                        "61-80",
                        "81-90",
                        "Konto administracji",
                    ].map((text) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => handleUserTypeUpdate(text)}
                        >
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default UserTable;
