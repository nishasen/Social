import React, { useState, useEffect } from 'react';
import '../CreatePost/CreatePost.css';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CircularProgress from '@mui/material/CircularProgress';
import Picker from 'emoji-picker-react';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import { Box, Typography, Modal, IconButton, Stack, Chip, TextareaAutosize } from '@mui/material';
import { AddPost, getAllPost, EditPost } from '../../Services';
import { showToast } from '../../Features';

const style = {
    display: "flex",
    justifyContent: "center",
    margin: "2rem auto",
    width: "max-content",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "0.5rem",
    p: 1,
  };

const PostModal = ({open, setOpen, edit}) => {
    const { user, token } = useSelector(state => state.auth);
    const { loading, post } = useSelector(state => state.post);
    const { theme } = useSelector(state => state.theme);
    const defaultForm = {
      userId: '',
      firstname: '',
      lastname: '',
      date: '',
      content: '',
      privacy: 'private',
      likes : [],
      Comment : []
    }
    const dispatch = useDispatch();
    const [openEmoji, setOpenEmoji] = useState(false);
    const [progress, setProgress] = useState(100);
    const [submitMode, setSubmitMode] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [form, setForm] = useState(defaultForm);
    const handleClose = () => setOpen(false);

    const Input = styled('input')({
      display: 'none',
    });

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };

    const setEditPost =() => {
      setForm({...form, 
                userId: post?.data?.userId,
                firstname: post?.data?.firstname,
                lastname: post?.data?.lastname,
                date: post?.data?.date,
                content: post?.data?.content,
                privacy: post?.data?.privacy,
                likes : post?.data?.likes,
                Comment : post?.data?.Comment})
    }
    useEffect(()=> {
      edit && setEditPost();
    }, [open])

    useEffect(()=> {
      setForm({...form, content: form.content + (chosenEmoji ? chosenEmoji.emoji.toString() : "")})
    }, [chosenEmoji])

    const handleChange = (e) => {
      const value = e.target.value;
      setProgress((250-value.length)/2.5);
      setForm({...form, 
        content: value, 
        firstname: user.firstname,
        lastname: user.lastname,
        userId: token,
        date: edit ? post?.data?.date : new Date().toLocaleString()})
        setChosenEmoji(null)
    }
    
    useEffect(()=>{
      progress<0 ? setSubmitMode(true) : setSubmitMode(false);
    }, [progress])

    const handleSubmit = async(e) => {
      e.preventDefault();
      if(form.content!=='') {
        edit ? await EditPost(form, dispatch, post?.postId) : await AddPost(form, dispatch);
        setForm({
          date: '',
          content: '',
          firstname: '',
          lastname: '',
          userId: '',
          privacy: 'private',
          likes : [],
          Comment : []});
        dispatch(getAllPost())  
        handleClose();
        setOpenEmoji(false)
      } else {
        dispatch(showToast({text: "Add your thoughts to post", severity: "warning"}))
      }
    }

  return (
    <div className="modal">
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style} style={{background: theme==="light" ? "var(--bg-modal-light)" : "var(--bg-modal-dark)"}}>
            <form className="modal-box" onSubmit={(e)=>handleSubmit(e)}>
              <div className="modal-heading">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Create Post
                </Typography>
                <IconButton color="primary" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="profile-set">
                <img src={user.avatar} alt="user" className="profile profile-md profile-modal"/>
                <div className="profile-name">
                  <Typography variant="h6" component="h6">{user.firstname + " " + user.lastname}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Public" variant={form.privacy==='public' ? 'contained' : 'outlined'} color="primary" onClick={()=>setForm({...form, privacy: 'public'})} />
                    <Chip label="Private" variant={form.privacy==='private' ? 'contained' : 'outlined'} color="primary" onClick={()=>setForm({...form, privacy: 'private'})} />
                  </Stack>
                </div>
              </div>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Share your thoughts"
                className="textarea-style"
                value={form.content}
                onChange={(e)=>handleChange(e)}/>
              <div className="modal-actions">
                <div className="modal-action-icons">
                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <IconButton color="primary" aria-label="upload emoji" component="span" onClick={()=>setOpenEmoji(!openEmoji)}>
                    <EmojiEmotionsIcon />
                  </IconButton>
                  <CircularProgress size={30} thickness={5} color={progress<0 ? 'error' : 'primary' } variant="determinate" value={progress} />
                  {openEmoji && <div className="emoji-container">
                    <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} pickerStyle={{height: "15rem", width: "15rem"}}/>
                  </div>}
                </div>
                <LoadingButton variant="contained" type="submit" disabled={submitMode} endIcon={<AllInboxIcon />} loading={loading} loadingPosition="end">Post</LoadingButton>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
  )
}

export { PostModal };