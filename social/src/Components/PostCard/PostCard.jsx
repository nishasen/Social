import React, { useState } from 'react';
import { IconButton, Typography, Chip, Menu, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './PostCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetAvatar, GetUserData, GetUsername, SetDate } from '../../Utilities';
import { LikePost, UnlikePost, PostComment, AddToBookmark, RemoveFromBookmark, DeletePost } from '../../Services';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { setPost } from '../../Features';
import { LikeModal, PostModal } from '..';

const ITEM_HEIGHT = 40;
const PostCard = ({post}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector(state => state.theme);
  const { allUser, token, user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.post);
  const defaultForm = {
    text: '',
    lastname: '',
    firstname: '',
    avatar: '',
    date: ''
  }
  const [inputComment, setInputComment] = useState(defaultForm);
  const { postId, data } = post;
  const {firstname, lastname, date, content, likes, Comment, privacy, image, userId} = data;
  const avatar = GetAvatar(userId, allUser);
  const finalDate = SetDate(date);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const getStyles = {color: theme==="light" ? "var(--black)" : "var(--white)"};
  const getFontStyles = {color: theme==="light" ? "var(--black)" : "var(--white)", fontSize: "1.1rem"};
  const [showComments, setShowComments] = useState(false)
  const username = GetUsername(userId, allUser)
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const handleOpenLikeModal = () => setOpenLikeModal(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    await PostComment(postId, inputComment, dispatch)
    setInputComment(defaultForm)
  }
  return (
    <div className="post-card">
      <section className="post-header-style">
        <div className="post-header">
          <img src={avatar} alt="profile" className="profile profile-md profile-navigate" onClick={()=>navigate(`/user/${username}`, {replace: true})}/>
          <div className="post-user">
            <div className="username-style">
              <Typography variant="h6" style={getStyles}>{firstname + " " + lastname}</Typography>
              <Typography variant="caption" className="post-date">{finalDate}</Typography>
            </div>   
            <div className="username-style">
              <Typography variant="caption" className="post-date">@{username}</Typography>
              <Chip label={privacy} size="small" color="secondary" variant={privacy==="private" ? "outlined" : "contained"}/>
            </div>
          </div>
        </div>
        {userId===token &&
        <>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          color="primary"
          onClick={handleClick}>
            <MoreVertIcon />
        </IconButton>
        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            background: theme==="light"? "var(--bg-modal-light)" : "var(--bg-modal-dark)",
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
          },
        }}
      >
          <MenuItem onClick={()=>{
            dispatch(setPost(post))
            handleOpen()
            handleClose()}}>
            Edit
          </MenuItem>
          <MenuItem onClick={()=>{
            DeletePost(postId, dispatch)
            handleClose()
          }}>
            Delete
          </MenuItem>
      </Menu>
      </>}
      </section>
      <PostModal open={openModal} setOpen={setOpenModal} edit={true}/>
      <article className="post-desc" style={getStyles}>
        {content}
      </article>
      {image && 
      <article className="post-image-desc" style={getStyles}>
        <img src={image} alt="post detail" className="post-image"/>
      </article>}
      <section className="post-actions">
        <div>
          {likes?.find(user => user?.userId===token) ? 
            <IconButton color="error" onClick={()=>{UnlikePost(postId, token, user, dispatch)}}><FavoriteIcon /></IconButton> 
            : 
            <IconButton color="primary" onClick={()=>{LikePost(postId, token, user, dispatch)}}><FavoriteBorderIcon /></IconButton>
          }
          <span style={getStyles}>{likes?.length!==0 ? likes?.length : ""}</span>
        </div>
        <div>
          <IconButton color="primary" onClick={()=>setShowComments(!showComments)}><CommentIcon /></IconButton>
          <span style={getStyles}>{Comment?.length!==0 ? Comment?.length : ""}</span>
        </div>
        <div>
          {user?.bookmarks?.find(post => post?.postId===postId) ? 
            <IconButton color="primary" onClick={()=>RemoveFromBookmark(postId, token, dispatch)}>
              <BookmarkIcon />
            </IconButton> 
            : 
            <IconButton color="primary" onClick={()=>AddToBookmark(postId, token, dispatch)}>
              <BookmarkBorderIcon />
            </IconButton>
          }
        </div>
      </section>
      {likes?.length!==0 && 
        <>
          {likes?.length===1 ?
            <Typography 
              variant="caption" 
              sx={{color: theme==="light"? "var(--black)": "var(--white)"}}
              className="likes-modal"
              onClick={handleOpenLikeModal}>
              {likes[0].firstname} liked your post
            </Typography>
            :
            <Typography 
              variant="caption" 
              sx={{color: theme==="light"? "var(--black)": "var(--white)"}}
              className="likes-modal"
              onClick={handleOpenLikeModal}>
              {likes[0].firstname} and {likes?.length-1} other liked your post
            </Typography>}
        </>}
        <LikeModal likes={likes} openLikeModal={openLikeModal} setOpenLikeModal={setOpenLikeModal} />
      {showComments && 
      <section className="comment-section">
        <form className="add-comment" onSubmit={(e)=>handleSubmit(e)}>
          <input 
            type="text" 
            label="Add your comments" 
            className="input-comment" 
            placeholder="Add your comment" 
            style={getStyles}
            value={inputComment.text}
            onChange={(e)=>setInputComment({...inputComment, 
              text: e.target.value,
              userId: token,
              avatar: user?.avatar,
              firstname: user?.firstname,
              lastname: user?.lastname,
              date: new Date().toLocaleString()})}/>
          <LoadingButton loading={loading} variant="contained" size="small" type="submit">Comment</LoadingButton>
        </form> 
        <div className="all-comments">
          {Comment?.map(comment =>
          <div className="people-comment" key={comment?.userId}>
            <img src={comment?.avatar} className="profile profile-xs comment-profile profile-navigate" alt="comment profile" onClick={()=>navigate(`/user/${GetUsername(GetUserData(comment?.userId, allUser)?.userId, allUser)}`, {replace: true})}/>
            <div>
              <div className="comment-user">
                <Typography variant="h6" style={getFontStyles}>{comment?.firstname+" "+comment?.lastname}</Typography>
                <Typography variant="caption" className="post-date">{SetDate(comment?.date)}</Typography>
              </div>
              <article style={getStyles}>{comment?.text}</article>
            </div>
          </div>)}
        </div>
      </section>}
    </div>
  )
}

export { PostCard };
