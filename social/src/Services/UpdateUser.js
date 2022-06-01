import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { showToast, isLoading } from '../Features';
import { getUser } from '.';

export const UpdateUser = async(form, dispatch, token) => {                          
    dispatch(isLoading(true))
  try {
    await updateDoc(doc(db, "users", token), form);
    dispatch(getUser(token, dispatch));
    dispatch(showToast({text: "Updated your profile successfully", severity: 'success'}));
  } catch(error) {
    dispatch(showToast({text: error.message, severity: 'error'}));
  } finally {
      dispatch(isLoading(false))
  }
};