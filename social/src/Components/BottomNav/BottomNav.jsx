import React from 'react';
import './BottomNav.css';
import { IconButton } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BottomNav = () => {
    let navigate = useNavigate();
    const { theme } = useSelector(state => state.theme);
    const getActiveStyles = ({isActive}) => 
        isActive ? {
            color: "white",
            borderRadius: "50%",
            backgroundColor: "var(--primary)"
        } : {}
  return (
    <div className={`bottom-nav ${theme==="light" ? "bottom-nav-light" : "bottom-nav-dark"}`}>
        <IconButton component={NavLink} to="/home" style={getActiveStyles} color="primary" aria-label="home" onClick={()=>navigate("/home")}>
            <HomeRoundedIcon />
        </IconButton>
        <IconButton component={NavLink} to="/explore" style={getActiveStyles} color="primary" aria-label="explore" onClick={()=>navigate("/explore")}>
            <ExploreRoundedIcon />
        </IconButton>
        <IconButton component={NavLink} to="/notification" style={getActiveStyles} color="primary" aria-label="notification" onClick={()=>navigate("/notification")}>
            <NotificationsRoundedIcon />
        </IconButton>
        <IconButton component={NavLink} to="/bookmark" style={getActiveStyles} color="primary" aria-label="bookmark" onClick={()=>navigate("/bookmark")}>
            <BookmarkRoundedIcon />
        </IconButton>
        <IconButton component={NavLink} to="/profile" style={getActiveStyles} color="primary" aria-label="profile" onClick={()=>navigate("/profile")}>
            <PersonRoundedIcon />
        </IconButton>
        <IconButton component={NavLink} to="/setting" style={getActiveStyles} color="primary" aria-label="setting" onClick={()=>navigate("/setting")}>
            <SettingsApplicationsRoundedIcon />
        </IconButton>
    </div>
  )
}

export { BottomNav }