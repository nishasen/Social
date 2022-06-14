import React from 'react';
import { Typography, Box, Modal, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { setOtherUser } from '../../Features';
import { GetUsername } from '../../Utilities';
import { FollowUser, UnfollowUser } from '../../Services';
import '../SuggestCard/SuggestCard.css';

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

const AllSuggestions = ({showSuggestions, setShowSuggestions, Users}) => {
    const { theme } = useSelector(state => state.theme);
    const { allUser, token, user, followLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <div>
      <Modal
        open={showSuggestions}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} style={{background: theme==="light" ? "var(--bg-modal-light)" : "var(--bg-modal-dark)"}}>
          <div className="peer-list">
            <div className="list-heading">
              <Typography variant="h5">Suggestions</Typography> 
              <IconButton color="primary" onClick={()=>setShowSuggestions(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="lists">
              {Users?.length===0 ? 
                <div>
                  <Typography variant="h6">No suggestions 😴</Typography>
                </div> : 
                Users?.map(peer => 
                <div className="follow-list" key={peer?.userId}>
                  <div className="profile-card-detail" onClick={()=>{
                    dispatch(setOtherUser(peer))
                    setShowSuggestions(false)
                    navigate(`/user/${GetUsername(peer?.userId, allUser)}`, {replace: true})}}>
                    <img src={peer?.data?.avatar} className="profile-img profile profile-md" alt="followers" />
                    <Typography variant="body1" className="user-name-large">{peer?.data?.firstname + " " + peer?.data?.lastname}</Typography>
                  </div>
                  {peer?.data?.follower?.some(person => person.userId === token) ?
                  <LoadingButton 
                    loading={followLoading} 
                    size="small" 
                    variant="outlined" 
                    onClick={()=>UnfollowUser(token, peer, user, dispatch)}>
                    Following
                  </LoadingButton>
                  :
                  <LoadingButton 
                    loading={followLoading}
                    size="small" 
                    variant="contained" 
                    onClick={()=>FollowUser(token, peer, user, dispatch)}>
                    Follow
                  </LoadingButton>} 
                </div>)}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export { AllSuggestions };
