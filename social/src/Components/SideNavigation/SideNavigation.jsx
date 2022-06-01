import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import { Chip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideNavigation.css';

const SideNavigation = () => {
    const getActiveStyles = ({isActive}) =>
        isActive ? {
            color: "white",
            backgroundColor: "var(--primary)"
        } : {}
    
  return (
    <div className="side-navigation">
        <div className="side-buttons">
            <Chip 
                component={NavLink}
                clickable
                sx={{width: "10rem", display: "flex", justifyContent: "flex-start"}}
                to="/home"
                style={getActiveStyles}
                variant="outlined"
                color="primary" 
                icon={<HomeRoundedIcon />}
                label="HOME">
            </Chip>  
        </div>
        <div className="side-buttons">
            <Chip 
                component={NavLink}
                clickable
                sx={{width: "10rem", display: "flex", justifyContent: "flex-start"}}
                to="/explore"
                style={getActiveStyles}
                variant="outlined"
                color="primary" 
                icon={<ExploreRoundedIcon />}
                label="EXPLORE">
            </Chip>  
        </div>
        <div className="side-buttons">
            <Chip 
                component={NavLink}
                clickable
                sx={{width: "10rem", display: "flex", justifyContent: "flex-start"}}
                to="/notification"
                style={getActiveStyles}
                variant="outlined"
                color="primary" 
                icon={<NotificationsRoundedIcon />}
                label="NOTIFICATIONS">
            </Chip>
        </div>
        <div className="side-buttons">
            <Chip 
                component={NavLink}
                clickable
                sx={{width: "10rem", display: "flex", justifyContent: "flex-start"}}
                to="/bookmark"
                style={getActiveStyles}
                variant="outlined"
                color="primary" 
                icon={<BookmarkRoundedIcon />}
                label="BOOKMARK">        
            </Chip>
        </div>
        <div className="side-buttons">
            <Chip 
                component={NavLink}
                clickable
                sx={{width: "10rem", display: "flex", justifyContent: "flex-start"}}
                to="/profile"
                style={getActiveStyles}
                variant="outlined"
                color="primary" 
                icon={<PersonRoundedIcon />}
                label="PROFILE">
            </Chip>
        </div>
        <div className="side-buttons">
            <Chip 
                component={NavLink}
                clickable
                sx={{width: "10rem", display: "flex", justifyContent: "flex-start"}}
                to="/setting"
                style={getActiveStyles}
                variant="outlined"
                color="primary" 
                icon={<SettingsApplicationsRoundedIcon />}
                label="SETTING">
            </Chip>
        </div>
    </div>
  )
}

export { SideNavigation };
