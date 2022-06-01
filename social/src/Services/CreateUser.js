import {auth, db} from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { showToast, isLoading } from '../Features';

export const CreateUser = async(userData, dispatch, navigate, actions) => {                          
    const {avatar, firstname, lastname, username, email, password} = userData; 
    dispatch(isLoading(true))
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), {
      avatar: avatar,
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      bio: 'Add a bio to let people know about you.',
      website: 'https://herecomes@yourwebsite.com',
      follower: [],
      following: [],
      bookmarks: [],
    });
    actions.resetForm();
    navigate('/', {replace: true});
    dispatch(showToast({text: "Signed up successfully", severity: 'success'}));
  } catch(error) {
    dispatch(showToast({text: error.message, severity: 'error'}));
  } finally {
      dispatch(isLoading(false))
  }
};