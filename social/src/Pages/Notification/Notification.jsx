import { Typography } from '@mui/material';
import React from 'react';
import { HeaderText, PostCardMapping } from '../../Components';

const Notification = () => {
  return (
    <div className="pages">
      <HeaderText text="Notifications" />
      <Typography variant="h6" sx={{color: "var(--grey)"}}>Work in progress</Typography>
      <PostCardMapping notification={true}/>
    </div>
  )
}

export { Notification };