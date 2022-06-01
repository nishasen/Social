import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';
import './HeaderText.css';

const HeaderText = ({text, children}) => {
  const { theme } = useSelector(state => state.theme);
  return (
    <div>
      <Typography variant="h5" color={theme==="light" ? "black" : "white"} className="header-text">
        {children} {text}
      </Typography>
    </div>
  )
}

export { HeaderText };
