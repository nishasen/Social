import React from 'react';
import '../SuggestCard/SuggestCard.css';
import { Typography, Box, Modal, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { setOtherUser } from '../../Features';
import { GetUsername } from '../../Utilities';

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

const LikeModal = ({likes, openLikeModal, setOpenLikeModal}) => {
    const { allUser } = useSelector(state => state.auth);
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
  return (
    <div>
      <Modal
        open={openLikeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} style={{background: theme==="light" ? "var(--bg-modal-light)" : "var(--bg-modal-dark)"}}>
          <div className="peer-list">
            <div className="list-heading">
              <Typography variant="h5">Likes</Typography> 
              <IconButton color="primary" onClick={()=>setOpenLikeModal(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="lists">
              {likes?.length===0 ? 
                <div>
                  <Typography variant="h6">No likes 😴</Typography>
                </div> : 
                likes?.map(peer => 
                <div className="follow-list" key={peer?.userId}>
                  <div className="profile-card-detail" onClick={()=>{
                    dispatch(setOtherUser(peer))
                    setOpenLikeModal(false)
                    navigate(`/user/${GetUsername(peer?.userId, allUser)}`, {replace: true})}}>
                    <img src={peer?.avatar} className="profile-img profile profile-md" alt="followers" />
                    <Typography variant="body1" className="user-name-large">{peer?.firstname + " " + peer?.lastname}</Typography>
                  </div>
                </div>)}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export { LikeModal };
