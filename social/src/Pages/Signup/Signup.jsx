import React from 'react';
import { SignupForm } from '../../Components';
import Banner from '../../Assets/Banner.svg';

const Signup = () => {
  return (
    <div className="landing">
      <img src={Banner} alt="hero" className="hero"/>
      <SignupForm />
    </div>
  )
}

export { Signup };