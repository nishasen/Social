import React from 'react';
import { useSelector } from 'react-redux';
import { CreatePost, EditProfile, HeaderText, PostCardMapping, ProfileBackground, ProfileConnect, UserDetails } from '../../Components';

const Profile = () => {
  const { user, token } = useSelector(state => state.auth)
  return (
    <div className="pages">
      <HeaderText text={user.firstname + " " + user.lastname} />
      <ProfileBackground user={user}/>
      <div className="profile-setting">
        <EditProfile />
        <CreatePost />
        <ProfileConnect user={user} userId={token}/>
        <UserDetails user={user}/>
      </div>
      <PostCardMapping profile={true}/>
    </div>
  )
}

export { Profile };