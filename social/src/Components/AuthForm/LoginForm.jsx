import React from 'react';
import { Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { Textfield } from '..';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import './AuthForm.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../Services';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);
  const { loading } = useSelector(state => state.auth);
  const changeColor = theme==="light" ? "var(--black)" : "var(--white)";
  return (
    <Formik initialValues = {{
      email: "",
      password: "",
    }}
    validationSchema = {Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Email required'),
      password: Yup.string()
        .required('Password required')
        .min(8, 'Password is too short, minimum 8 characters required')
    })}
    onSubmit = {async(values, actions) => {
      const userData = JSON.parse(JSON.stringify(values, null, 2));
      LoginUser(userData, actions, navigate, dispatch);
    }}>
      { formik => (
        <form color="primary" className="auth-form" onSubmit={formik.handleSubmit}>
          <Typography variant="h4" color={changeColor}> Login</Typography>
          <Textfield label="Email" name="email" type="email"/>
          <Textfield label="Password" name="password" type="password" />
          <LoadingButton variant="contained" type="submit" endIcon={<LoginIcon />} loading={loading} loadingPosition="end" fullWidth>
            Login
          </LoadingButton>
          <div className="account-check" style={{color: changeColor}}>
            Do not have an acount? 
            <Link to="/signup" className="link">
              <Button size="sm" endIcon={<ArrowForwardIosIcon fontSize="small"/>}>Signup</Button>
            </Link>
          </div>
        </form>
      )}
    </Formik>
  )
}

export { LoginForm };
