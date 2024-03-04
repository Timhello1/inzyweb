import { Link, useMatch, useResolvedPath } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import  Toolbar  from '@mui/material/Toolbar';
import  Typography  from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {List, ListItemText} from "@mui/material";
import { ListItem } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import async from "async";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";

export default function Navbar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isNestedDrawerOpen, setNestedDrawerOpen] = useState(false);
    const [isNewNestedDrawerOpen, setNewNestedDrawerOpen] = useState(false);
    const [isNewNestedDrawer2Open, setNewNestedDrawer2Open] = useState(false);
    const [isNewNestedDrawerLetterCancelOpen, setNewNestedDrawerLetterCancelOpen] = useState(false);
    const [isNewNestedDrawerLetterCanceleasyOpen, setNewNestedDrawerLetterCanceleasyOpen] = useState(false);
    const [isNewNestedDrawerLetterCancelmediumOpen, setNewNestedDrawerLetterCancelmediumOpen] = useState(false);
    const [isNewNestedDrawerLetterCancelhardOpen, setNewNestedDrawerLetterCancelhardOpen] = useState(false);


    const handleNewNestedDrawerToggle = () => {
        setNewNestedDrawerOpen(!isNewNestedDrawerOpen);
    };
    const handleNewNestedDrawerLetterCancelToggle = () => {
        setNewNestedDrawerLetterCancelOpen(!isNewNestedDrawerLetterCancelOpen);
    };
    const handleNewNestedDrawerLetterCanceleasyToggle = () => {
        setNewNestedDrawerLetterCanceleasyOpen(!isNewNestedDrawerLetterCanceleasyOpen);
    };
    const handleNewNestedDrawerLetterCancelmediumToggle = () => {
        setNewNestedDrawerLetterCancelmediumOpen(!isNewNestedDrawerLetterCancelmediumOpen);
    };
    const handleNewNestedDrawerLetterCancelhardToggle = () => {
        setNewNestedDrawerLetterCancelhardOpen(!isNewNestedDrawerLetterCancelhardOpen);
    };
    const handleNewNestedDrawer2Toggle = () => {
        setNewNestedDrawer2Open(!isNewNestedDrawer2Open);
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const currentUser = getAuth().currentUser;

    const handleLogout = async () => {
        try {
            await getAuth().signOut();
            console.log("logged out");
        }catch (error){
            console.error("Error logging out:", error);
        }
    };

    const handleNestedDrawerToggle = () => {
        setNestedDrawerOpen(!isNestedDrawerOpen);
    };


    return <nav className="nav">
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#333333', width: '100%' }} elevation={0}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleSidebarToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" className="site-title">
                            Wersja Demo
                        </Link>
                    </Typography>
                    <ul>
                        {currentUser ? (
                            <li>
                                <button onClick={handleLogout}>Wyloguj</button>
                            </li>
                        ) : (
                            <Link to="/login">Zaloguj</Link>
                        )}
                    </ul>
                </Toolbar>
            </AppBar>
        </Box>
        <Drawer anchor="left" open={isSidebarOpen} onClose={handleSidebarToggle}>
            <List>
                <ListItem button component={Link} to="/StroopTestWelcome">
                    Test Stroopa
                </ListItem>
                <ListItem button component={Link} to="/SwitchTrailWelcome">
                    Test zmiennej ścieżki
                </ListItem>
                <ListItem button component={Link} to="/ReitanTestWelcome">
                    Test Reitana
                </ListItem>
                <ListItem button component={Link} to="/LetterCancellationTestWelcome">
                    Test anulowania liter
                </ListItem>
                <ListItem button component={Link} to="/DigitSubWelcome">
                    Test szyfrowania
                </ListItem>
                <ListItem button component={Link} to="/MemoryScanWelcome">
                    Test skanu pamięci Sternberga
                </ListItem>
                <ListItem button component={Link} to="/Admin">
                    Panel administracji
                </ListItem>

                <ListItem button component={Link} to="/ClickTestWelcome">
                    Test zwinności
                </ListItem>
                <ListItem>
                    <ListItem button onClick={handleNestedDrawerToggle}>
                        <ListItemText primary="Wyniki" />
                        {isNestedDrawerOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Drawer anchor="left" open={isNestedDrawerOpen} onClose={handleNestedDrawerToggle}>
                        <List>
                            <ListItem button component={Link} to="/ReitanTestResults">
                                Wyniki Testu Reitana
                            </ListItem>
                            <ListItem button component={Link} to="/StroopTestResults">
                                Wyniki Testu Stroopa
                            </ListItem>
                            <ListItem button component={Link} to="/ClickTestResults">
                                Wyniki testu czasu reakcji
                            </ListItem>
                            <ListItem button component={Link} to="/SwitchTestResults">
                                Wyniki testu zmiennej ścieżki
                            </ListItem>


                            <ListItem button onClick={handleNewNestedDrawer2Toggle}>
                                <ListItemText primary="Wyniki testu szyfrowania" />
                                {isNewNestedDrawer2Open ? <ExpandLess /> : <ExpandMore />}
                                <Drawer anchor="left" open={isNewNestedDrawer2Open} onClose={handleNewNestedDrawer2Toggle}>
                                    <List>
                                        <ListItem button component={Link} to="/DigitSub10TestResults">
                                            Digit Substitution results (easy)
                                        </ListItem>
                                        <ListItem button component={Link} to="/DigitSub20TestResults">
                                            Digit Substitution results (medium)
                                        </ListItem>
                                        <ListItem button component={Link} to="/DigitSub30TestResults">
                                            Digit Substitution results (hard)
                                        </ListItem>
                                    </List>
                                </Drawer>
                            </ListItem>

                            <ListItem button onClick={handleNewNestedDrawerToggle}>
                                <ListItemText primary="Wyniki Testu skanu pamięci" />
                                {isNewNestedDrawerOpen ? <ExpandLess /> : <ExpandMore />}
                                <Drawer anchor="left" open={isNewNestedDrawerOpen} onClose={handleNewNestedDrawerToggle}>
                                    <List>
                                        <ListItem button component={Link} to="/MemoryScan4Results">
                                            Memory Scan results (easy)
                                        </ListItem>
                                        <ListItem button component={Link} to="/MemoryScan6Results">
                                            Memory Scan results (medium)
                                        </ListItem>
                                        <ListItem button component={Link} to="/MemoryScan10Results">
                                            Memory Scan results (hard)
                                        </ListItem>
                                    </List>
                                </Drawer>
                            </ListItem>

                            <ListItem button onClick={handleNewNestedDrawerLetterCancelToggle}>
                                <ListItemText primary="Wynik testu anulowania liter" />
                                {isNewNestedDrawerLetterCancelOpen ? <ExpandLess /> : <ExpandMore />}
                                <Drawer anchor="left" open={isNewNestedDrawerLetterCancelOpen} onClose={handleNewNestedDrawerLetterCancelToggle}>
                                    <List>

                                        <ListItem button onClick={handleNewNestedDrawerLetterCanceleasyToggle}>
                                            <ListItemText primary="Easy"></ListItemText>
                                            {isNewNestedDrawerLetterCanceleasyOpen ? <ExpandLess /> : <ExpandMore />}
                                            <Drawer anchor="left" open={isNewNestedDrawerLetterCanceleasyOpen} onClose={handleNewNestedDrawerLetterCanceleasyToggle}>
                                                <List>
                                                    <ListItem button component={Link} to="/LCETTestResults">
                                                        Based on Time
                                                    </ListItem>
                                                    <ListItem button component={Link} to="/LCESTestResults">
                                                        Based on Score
                                                    </ListItem>
                                                    <ListItem button component={Link} to="/LCETSTestResults">
                                                        Based on Time and Score
                                                    </ListItem>
                                                </List>
                                            </Drawer>
                                        </ListItem>

                                        <ListItem button onClick={handleNewNestedDrawerLetterCancelmediumToggle}>
                                            <ListItemText primary="Medium"></ListItemText>
                                            {isNewNestedDrawerLetterCancelmediumOpen ? <ExpandLess /> : <ExpandMore />}
                                            <Drawer anchor="left" open={isNewNestedDrawerLetterCancelmediumOpen} onClose={handleNewNestedDrawerLetterCancelmediumToggle}>
                                                <List>
                                                    <ListItem button component={Link} to="/LCMTTestResults">
                                                        Based on Time
                                                    </ListItem>
                                                    <ListItem button component={Link} to="/LCMSTestResults">
                                                        Based on Score
                                                    </ListItem>
                                                    <ListItem button component={Link} to="/LCMTSTestResults">
                                                        Based on Time and Score
                                                    </ListItem>
                                                </List>
                                            </Drawer>
                                        </ListItem>

                                        <ListItem button onClick={handleNewNestedDrawerLetterCancelhardToggle}>
                                            <ListItemText primary="Hard"></ListItemText>
                                            {isNewNestedDrawerLetterCancelhardOpen ? <ExpandLess /> : <ExpandMore />}
                                            <Drawer anchor="left" open={isNewNestedDrawerLetterCancelhardOpen} onClose={handleNewNestedDrawerLetterCancelhardToggle}>
                                                <List>
                                                    <ListItem button component={Link} to="/LCHTTestResults">
                                                        Based on Time
                                                    </ListItem>
                                                    <ListItem button component={Link} to="/LCHSTestResults">
                                                        Based on Score
                                                    </ListItem>
                                                    <ListItem button component={Link} to="/LCHTSTestResults">
                                                        Based on Time and Score
                                                    </ListItem>
                                                </List>
                                            </Drawer>
                                        </ListItem>

                                    </List>
                                </Drawer>

                            </ListItem>

                        </List>
                    </Drawer>
                </ListItem>
            </List>
        </Drawer>
    </nav>
}


