import { Link, useMatch, useResolvedPath } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Drawer from "@mui/material/Drawer";
import React, {useState} from "react";

export default function Navbar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
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
                        <CustomLink to="/login">Login</CustomLink>
                        <CustomLink to="/about">About</CustomLink>
                    </ul>
                </Toolbar>
            </AppBar>
        </Box>
        <Drawer anchor="left" open={isSidebarOpen} onClose={handleSidebarToggle}>
            <List>
                <ListItem button component={Link} to="/login">
                    Login
                </ListItem>
                <ListItem button component={Link} to="/about">
                    About
                </ListItem>
            </List>
        </Drawer>
    </nav>
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}
