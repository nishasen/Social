import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './CreatePost.css';
import { PostModal } from '..';

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Create Post</Button>
      <PostModal open={open} setOpen={setOpen}/>
    </div>
  )
}

export { CreatePost };
