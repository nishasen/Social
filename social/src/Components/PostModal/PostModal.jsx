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
import { Box, Typography, Modal, IconButton, Stack, Chip, TextareaAutosize, LinearProgress } from '@mui/material';
import { AddPost, getAllPost, EditPost } from '../../Services';
import { showToast } from '../../Features';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';

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
      image: '',
      privacy: 'private',
      likes : [],
      Comment : []
    }
    const dispatch = useDispatch();
    const [openEmoji, setOpenEmoji] = useState(false);
    const [progress, setProgress] = useState(100);
    const [submitMode, setSubmitMode] = useState(false);
    const [file, setFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [form, setForm] = useState(defaultForm);
    const [upload, setUpload] = useState(false);
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
                Comment : post?.data?.Comment,
                image : post?.data?.image})
    }
    
    useEffect(()=> {
      edit && setEditPost();
      edit && setImageName(post?.data?.image);
    }, [open])
    console.log(form)
    useEffect(()=> {
      setForm({...form, content: form.content + (chosenEmoji ? chosenEmoji.emoji.toString() : "")})
    }, [chosenEmoji])

    useEffect(() => {
      const uploadFile = () => {
        const name = new Date().getTime() + file.name;
        setImageName(name);
        const storageRef = ref(storage, `/posts/` + name);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progress===0 ? setUpload(true) : setUpload(false);
            switch (snapshot.state) {
              case "paused":
                break;
              case "running":
                break;
              default:
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                dispatch(
                  showToast({ text: "you don't have access", severity: "warning" })
                );
                break;
              case "storage/canceled":
                // User canceled the upload
                dispatch(
                  showToast({ text: "you canceled the upload", severity: "info" })
                );
                break;
              case "storage/unknown":
                dispatch(
                  showToast({ text: "Something went wrong", severity: "error" })
                );
                break;
              default:
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL)
              setForm((prev) => ({ ...prev, image: downloadURL }));
            });
          }
        );
      };
      file && uploadFile();
    }, [file]);

    const handleChange = (e) => {
      const value = e.target.value;
      setProgress((250-value.length)/2.5);
      setForm({...form, 
        content: value, 
        firstname: user.firstname,
        lastname: user.lastname,
        userId: token,
      })
        setChosenEmoji(null)
    }
    
    useEffect(()=>{
      progress<0 ? setSubmitMode(true) : setSubmitMode(false);
    }, [progress])

    const imageDelete = () => {
      setForm({...form, image: ''});
      setFile(null);
      setImageName('');
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      let convertingDate = new Date().toString();
      convertingDate = convertingDate.split('G')[0].trim()
      if(form.content!=='') {
        edit ? await EditPost({...form, date: post?.data?.date}, dispatch, post?.postId) : await AddPost({...form, date: convertingDate}, dispatch);
        setForm({
          date: '',
          content: '',
          image: '',
          firstname: '',
          lastname: '',
          userId: '',
          privacy: 'private',
          likes : [],
          Comment : []});
        dispatch(getAllPost())  
        handleClose();
        setOpenEmoji(false);
      } else {
        dispatch(showToast({text: "Add your thoughts to post", severity: "warning"}))
      }
    }

    console.log(form)

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
              {upload ? 
                <LinearProgress /> 
                :
                <> 
                {imageName && 
                <div className="image-name">
                  <Typography className="image-name-resize">{imageName}</Typography>
                  <IconButton onClick={imageDelete}><CloseIcon color="primary"/></IconButton>
                </div>}
                </>
              } 
              <div className="modal-actions">
                <div className="modal-action-icons">
                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={(e)=>setFile(e.target.files[0])}/>
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