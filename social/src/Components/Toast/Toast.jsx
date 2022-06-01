import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../Features';

const Toast = () => {
    const { isOpen, text, severity } = useSelector(state => state.toast)
    const dispatch = useDispatch();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(hideToast());
      };
  
  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="filled" severity={severity}>
            {text}
        </Alert>
    </Snackbar>
  );
}

export { Toast };
