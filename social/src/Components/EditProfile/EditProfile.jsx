import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser, getAllUser } from '../../Services';

const EditProfile = () => {
    const { theme } = useSelector(state => state.theme);
    const { loading, token, user } = useSelector(state => state.auth)
    const defaultForm = {
        username: user.username,
        bio: user.bio,
        website: user.website,
    }
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(defaultForm)
    const [bioCount, setBioCount] = useState(100);
    const [usernameCount, setUsernameCount] = useState(20)
    const [submitDisable, setSubmitDisable] = useState(false)
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (e) => {
        let value = e.target.value;
        const name = e.target.name;
        if(name==="username") {
            value=value.toLowerCase();
            setUsernameCount(25-value.length);
        }
        if(name==="bio") {
            setBioCount(100-value.length);
        }
        setForm({...form, [name]: value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await UpdateUser(form, dispatch, token);
        handleClose();
        setForm(defaultForm);
        dispatch(getAllUser());
    }

    useEffect(() => {
        usernameCount<0 ? setSubmitDisable(true) : setSubmitDisable(false);
        bioCount<0 ? setSubmitDisable(true) : setSubmitDisable(false);
    }, [usernameCount, bioCount])
 
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit profile
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{background: theme==="light" ? "var(--bg-modal-light)" : "var(--bg-modal-dark)"}}>Edit your profile</DialogTitle>
                <DialogContent sx={{background: theme==="light" ? "var(--bg-modal-light)" : "var(--bg-modal-dark)"}}>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            name="username"
                            type="text"
                            value={form.username}
                            fullWidth
                            onChange={(e)=>handleChange(e)}
                            variant="outlined"
                            helperText={usernameCount}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="website"
                            label="Add your website"
                            name="website"
                            type="url"
                            value={form.website}
                            fullWidth
                            onChange={(e)=>handleChange(e)}
                            variant="outlined"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="bio"
                            label="Bio"
                            name="bio"
                            type="text"
                            value={form.bio}
                            fullWidth
                            onChange={(e)=>handleChange(e)}
                            variant="outlined"
                            helperText={bioCount}
                        />
                         <DialogActions sx={{background: theme==="light" ? "var(--bg-modal-light)" : "var(--bg-modal-dark)"}}>
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            <LoadingButton endIcon={<SaveIcon />} loading={loading} loadingPosition="end" type="submit" variant="contained" disabled={submitDisable}>Save</LoadingButton>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export { EditProfile };