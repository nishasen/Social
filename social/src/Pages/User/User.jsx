import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { HeaderText, PostCardMapping, ProfileBackground, ProfileConnect, UserDetails } from '../../Components';
import { useParams } from 'react-router-dom';
import { setOtherUser } from '../../Features';
import { FollowUser, UnfollowUser } from '../../Services';

const User = () => {
  const dispatch = useDispatch();  
  const { otherUser, allUser, user, token, followLoading } = useSelector(state => state.auth)
  const { username } = useParams();
  const checkUser = allUser.find(user => user?.data?.username === username)
  dispatch(setOtherUser(checkUser))
  return (
    <div className="pages">
      <HeaderText text={otherUser?.firstname + " " + otherUser?.lastname} />
      <ProfileBackground user={otherUser}/>
      <div className="profile-setting">
        {otherUser?.follower?.some(person => person.userId === token) ?
          <LoadingButton 
            loading={followLoading}
            variant="outlined" 
            onClick={()=>UnfollowUser(token, checkUser, user, dispatch)}>
            Following
          </LoadingButton>  
          :
          <LoadingButton 
            loading={followLoading}
            variant="contained" 
            onClick={()=>FollowUser(token, checkUser, user, dispatch)}>
            Follow
          </LoadingButton> 
        }
        <ProfileConnect user={otherUser} userId={checkUser?.userId} followCheck={true}/>
        <UserDetails user={otherUser}/>
      </div>
      <PostCardMapping user={true}/>
    </div>
  )
}

export { User };