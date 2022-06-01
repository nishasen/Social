import React from 'react';
import { HeaderText } from '../../Components';
import { IconButton, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { darkMode, lightMode } from '../../Features';

const Setting = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme)
  return (
    <div className="pages">
      <HeaderText text="Settings" />
      <div style={{display: "flex", justifyContent: "center"}}>
      {theme==="light" ? 
        <IconButton onClick={()=>dispatch(darkMode())} color="primary"><DarkModeIcon /></IconButton>
        :
        <IconButton onClick={()=>dispatch(lightMode())} color="primary"><LightModeIcon /></IconButton>
      } 
      </div> 
      <Typography variant="h6" sx={{color: "var(--grey)"}}>Work in progress</Typography>
    </div>
  )
}

export { Setting };