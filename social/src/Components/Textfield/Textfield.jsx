import React from 'react';
import { Field, useField } from 'formik';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const Textfield = ({label, ...props}) => {
    const [field, meta] = useField(props);
    const { theme } = useSelector(state => state.theme)
  return (
      <Field
        as={TextField} 
        fullWidth 
        error={meta.touched && meta.error}
        label={label}
        {...field}
        {...props}
        helperText={meta.touched ? meta.error : false}
        color="primary"
        sx={{ input: { color: theme==='light' ? 'var(--black)' : 'var(--white)'}}}
        focused               
        required/>
  )
}

export { Textfield };
