import React, { useState } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useNavigate } from 'react-router-dom';
import { Textfield } from '..';
import './AuthForm.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Avatars } from '../../Utilities';
import { CreateUser } from '../../Services';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const url = "https://ik.imagekit.io/ecomdiagonalley/Social/Profile1_InTxuA9Np.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1652369924716";
const SignupForm = () => {
  const navigate = useNavigate();  
  const dispatch = useDispatch(); 
  const { theme } = useSelector(state => state.theme);
  const { loading } = useSelector(state => state.auth);
  const [password, setPassword] = useState('password');
  const changeColor = theme==="light" ? "var(--black)" : "var(--white)";
  return (
    <Formik initialValues = {{
      avatar: url,
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    }}
    validationSchema = {Yup.object({
      firstname: Yup.string()
        .required('Firstname required'),
      lastname: Yup.string()
        .required('Lastname required'), 
      username: Yup.string()
        .required('Username required'),   
      email: Yup.string()
        .email('Invalid email')
        .required('Email required'),
      password: Yup.string()
        .required('Password required')
        .min(8, 'Password is too short, minimum 8 characters required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Atleast One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    })}
    onSubmit = {(values, actions) => {
      const userData = JSON.parse(JSON.stringify(values, null, 6));
      CreateUser(userData, dispatch, navigate, actions);
    }}>
      {formik => (<Form className="auth-form" onSubmit={formik.handleSubmit}>
          <Typography variant="h4" color={changeColor}> Signup</Typography>
          <Typography variant="p" color={changeColor}>Choose your avatar</Typography>
          <div className="avatar-box">
            {Avatars.map(avatar=>
            <label HTMLFor={avatar.name}>
              <Field type="radio" id={avatar.name} name="avatar" checked={formik.values.avatar===avatar.url} value={avatar.url} onChange={formik.handleChange}/>
              <span className={formik.values.avatar===avatar.url ? 'avatar avatar-focus' : 'avatar'}>
                <img src={avatar.url} key={avatar.name} alt="avatar" className="avatar-img" />   
              </span>
            </label>)}
          </div>
          <div className="name-fields">
              <Textfield name="firstname" type="text" label="Firstname"/>
              <Textfield name="lastname" type="text" label="Lastname"/>
          </div>
          <Textfield name="username" type="text" label="Username"/>
          <Textfield name="email" type="email" label="Email"/>
          <div className="password-container">
            <Textfield label="Password" name="password" type={password} />
            <div className="password-icons">
              {password==="password" ?
                <IconButton color="primary" onClick={()=>setPassword('text')}><VisibilityOffIcon /></IconButton>
                :
                <IconButton color="primary" onClick={()=>setPassword('password')}><VisibilityIcon /></IconButton>
              }
            </div>
          </div>
          <LoadingButton variant="contained" type="submit" endIcon={<LoginIcon />} loading={loading} loadingPosition="end" fullWidth>Signup</LoadingButton>
          <div className="account-check" style={{color: changeColor}}>Already have an account? <Link to="/" className="link"><Button size="sm" endIcon={<ArrowForwardIosIcon fontSize="small"/>}>Login</Button></Link></div>
      </Form>)}
    </Formik>
  )
}

export { SignupForm };

