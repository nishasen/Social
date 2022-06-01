import React from 'react';
import Background from '../../Assets/Background.jpeg';
import './ProfileBackground.css';

const ProfileBackground = ({user}) => {
  return (
    <div className="profile-background">
      <img src={Background} alt="background" className="background-image"/>
      <img src={user?.avatar} alt="profile" className="profile-image"/>
    </div>
  )
}

export { ProfileBackground };
