import {auth} from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { showToast, isLoading } from '../Features';

export const LoginUser = async(userData, actions, navigate, dispatch) => {
    dispatch(isLoading(true))
    try {
        const result = await signInWithEmailAndPassword(auth, userData.email, userData.password);   
        localStorage.setItem('userId', result.user.uid);        
        actions.resetForm();
        navigate('/home', {replace: true});
        dispatch(showToast({text: "Logged in successfully", severity: "success"}));
      } catch(error) {
        dispatch(showToast({text: "Login failed, try again", severity: "error"}));
      } finally {
          dispatch(isLoading(false));
      }
}