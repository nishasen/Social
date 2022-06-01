import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { showToast, postLoading } from '../Features';
import { getAllPost } from '.';

export const EditPost = async(form, dispatch, postId) => {                          
    dispatch(postLoading(true))
  try {
    await updateDoc(doc(db, "posts", postId), form);
    dispatch(getAllPost());
    dispatch(showToast({text: "Post updated successfully", severity: 'success'}));
  } catch(error) {
    dispatch(showToast({text: error.message, severity: 'error'}));
  } finally {
      dispatch(postLoading(false))
  }
};