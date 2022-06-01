import React from 'react';
import Hero from '../../Assets/Hero.svg';
import { LoginForm } from '../../Components';
import '../Styles.css';
// import { useDispatch } from 'react-redux';
// import { loggedOut } from '../../Features';

const Landing = () => {
  // const dispatch = useDispatch();
  // dispatch(loggedOut());
  return (
    <div className="landing">
      <img src={Hero} alt="hero" className="hero"/>
      <LoginForm />
    </div>
  )
}

export { Landing };