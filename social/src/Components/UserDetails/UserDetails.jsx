import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import "./UserDetails.css";

const UserDetails = ({user}) => {
    const { theme } = useSelector(state => state.theme);
  return (
    <div className="user-details">
      <Typography variant="body1" sx={{color: theme==="light" ? "var(--black)" : "var(--white)"}}>{user?.bio}</Typography>
      <Typography variant="body1" color="primary" >@{user?.username}</Typography>
      <Typography variant="caption" href={user?.website} component="a" rel="noreferrer" target="_blank" sx={{color: "var(--grey)"}}>{user?.website}</Typography>
    </div>
  )
}

export { UserDetails };
