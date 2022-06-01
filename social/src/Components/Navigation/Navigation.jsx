import React from 'react';
import Social from '../../Assets/Social.png';
import IconButton from '@mui/material/IconButton'; 
import LogoutIcon from '@mui/icons-material/Logout';
import './Navigation.css';
import { Link } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { darkMode, lightMode, loggedOut } from '../../Features';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Navigation = () => {
    const { theme } = useSelector(state => state.theme);
    const { userLogin, user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <div className={`navigation ${theme==="light" ? "nav-light" : "nav-dark"}`}> 
        <Link to={userLogin ? "/home" : "/" }><img src={Social} alt="logo" className="nav-logo"/></Link>
        <div className="loggedin">
            {userLogin ? 
            <>
                <img src={user.avatar} alt='user' className="profile profile-md"/>
                <Typography variant="caption" color="primary" className="username">@{user.username}</Typography>
                <IconButton 
                    color="primary" 
                    aria-label="user avatar" 
                    size="large" 
                    onClick={()=>{
                        dispatch(loggedOut())
                        navigate('/', {replace: true})}}>
                    <LogoutIcon fontSize="inherit"/>
                </IconButton>
            </>
            : 
            <div style={{display: "flex", justifyContent: "center"}}>
                {theme==="light" ? 
                    <IconButton onClick={()=>dispatch(darkMode())} color="primary"><DarkModeIcon /></IconButton>
                    :
                    <IconButton onClick={()=>dispatch(lightMode())} color="primary"><LightModeIcon /></IconButton>
                } 
            </div> 
            }
        </div>    
    </div>
  )
}

export { Navigation };