import { Typography, Box, Button, Modal, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';
import './ProfileConnect.css';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { setOtherUser } from '../../Features';
import { GetUserData, GetUsername } from '../../Utilities';
import { FollowUser, UnfollowUser, FollowerRemove } from '../../Services';

const style = {
  display: "flex",
  justifyContent: "center",
  margin: "2rem auto",
  width: "max-content",
  bgcolor: 'background.paper',
  boxShadow: 24,
  border: "transparent",
  borderRadius: "0.5rem",
  p: 1,
};

const ProfileConnect = ({user, userId, followCheck}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUser, token, followLoading, user:currentUser } = useSelector(state => state.auth);
  const { posts } = useSelector(state => state.post);
  const { theme } = useSelector(state => state.theme)
  const [following, setFollowing] = useState(false);
  const [follower, setFollower] = useState(false);
  const userData = (id) =>  GetUserData(id, allUser);
  const userPosts = posts?.filter(post => post?.data?.userId===userId)
  return (
    <div className={`profile-connect ${theme==="light" ? "profile-connect-light" : "profile-connect-dark"}`}>
      <Button size="small" className="connect-align" onClick={()=>setFollower(true)}>
        <Typography variant="h6" sx={{fontWeight: "bold"}}>{user?.follower?.length}</Typography>
        <Typography variant="caption">Follower</Typography>
      </Button>
      <div className="connect-align">
            <Typography variant="h6" sx={{fontWeight: "bold"}}>{userPosts?.length}</Typography>
            <Typography variant="caption">POSTS</Typography>    
      </div>
      <Button size="small" className="connect-align" onClick={()=>setFollowing(true)}>
        <Typography variant="h6" sx={{fontWeight: "bold"}}>{user?.following?.length}</Typography>
        <Typography variant="caption">Following</Typography>
      </Button>
      <Modal
        open={follower}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} style={{background: theme==="light" ? "var(--bg-modal-light)" : "var(--bg-modal-dark)"}}>
          <div className="peer-list">
            <div className="list-heading">
              <Typography variant="h5">Followers</Typography> 
              <IconButton color="primary" onClick={()=>setFollower(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="lists">
              {user?.follower?.length===0 ? 
                <div>
                  <Typography variant="h6" sx={{textAlign: "center"}}>No followers 😥</Typography>
                </div>
                : 
                user?.follower?.map(follower => 
                <div className="follow-list" key={follower?.userId}>
                  <div className="profile-card-detail" onClick={()=>{
                    setFollower(false);
                    dispatch(setOtherUser(userData(follower?.userId)));
                    navigate(`/user/${GetUsername(GetUserData(follower?.userId, allUser)?.userId, allUser)}`, {replace: true})}}>  
                    <img src={follower?.avatar} className="profile-img profile profile-md" alt="followers" />
                    <Typography variant="body1" className="user-name-large">{follower?.firstname+" "+follower?.lastname}</Typography>
                  </div>
                  {(follower?.userId!==token) ? 
                    followCheck ?
                    <>
                      {currentUser?.following?.some(person => person.userId === follower?.userId) ?
                      <LoadingButton
                        loading={followLoading}  
                        size="small" 
                        variant="outlined" 
                        onClick={()=>UnfollowUser(token, userData(follower?.userId), currentUser, dispatch)}>
                        Following
                      </LoadingButton>
                      :
                      <LoadingButton
                        loading={followLoading}  
                        size="small" 
                        variant="contained" 
                        onClick={()=>FollowUser(token, userData(follower?.userId), currentUser, dispatch)}>
                        Follow
                      </LoadingButton>} 
                    </>
                    :
                    <LoadingButton
                      loading={followLoading}  
                      size="small" 
                      variant="outlined" 
                      onClick={()=>FollowerRemove(token, userData(follower?.userId), currentUser, dispatch)}>
                      Remove
                    </LoadingButton>
                    :
                    ""}
                </div>)}
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={following}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} style={{background: theme==="light" ? "var(--bg-modal-light)" : "var(--bg-modal-dark)"}}>
          <div className="peer-list">
            <div className="list-heading">
              <Typography variant="h5">Following</Typography> 
              <IconButton color="primary" onClick={()=>setFollowing(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="lists">
              {user?.following?.length===0 ? 
                <div>
                  <Typography variant="h6">Not following anyone 😪</Typography>
                </div> : 
                user?.following?.map(following => 
                <div className="follow-list" key={following?.userId}>
                  <div className="profile-card-detail" onClick={()=>{
                    setFollowing(false);
                    dispatch(setOtherUser(userData(following?.userId)));
                    navigate(`/user/${GetUsername(GetUserData(following?.userId, allUser)?.userId, allUser)}`, {replace: true})}}>
                    <img src={following?.avatar} className="profile-img profile profile-md" alt="followers" />
                    <Typography variant="body1" className="user-name-large">{following?.firstname+" "+following?.lastname}</Typography>
                  </div>
                  {(following?.userId!==token) ? 
                    followCheck ?
                    <>
                      {currentUser?.following?.some(person => person.userId === following?.userId) ?
                      <LoadingButton
                        loading={followLoading}  
                        size="small" 
                        variant="outlined" 
                        onClick={()=>UnfollowUser(token, userData(following?.userId), currentUser, dispatch)}>
                        Following
                      </LoadingButton>
                      :
                      <LoadingButton
                        loading={followLoading}  
                        size="small" 
                        variant="contained" 
                        onClick={()=>FollowUser(token, userData(following?.userId), currentUser, dispatch)}>
                        Follow
                      </LoadingButton>} 
                    </>
                    :
                    <LoadingButton
                      loading={followLoading}  
                      size="small" 
                      variant="outlined" 
                      onClick={()=>UnfollowUser(token, userData(following?.userId), currentUser, dispatch)}>
                      Remove
                    </LoadingButton>
                    :
                    ""}
                </div>)}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export { ProfileConnect };
