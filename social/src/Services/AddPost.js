import { db } from '../firebase';
import { showToast, postLoading } from '../Features';
import { collection, addDoc } from "firebase/firestore"; 

export const AddPost = async(form, dispatch) => {
  dispatch(postLoading(true))
  try{
    await addDoc(collection(db, "posts"), form);
    dispatch(showToast({text: "Post created successfully", severity: "success"}))
  } catch(error) {
    dispatch(showToast({text: error.message, severity: "error"}))
  } finally {
    dispatch(postLoading(false));
  }
}