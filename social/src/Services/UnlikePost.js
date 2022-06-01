import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { getAllPost } from ".";
import { isLoading, showToast } from "../Features";
import {db} from '../firebase';

export const UnlikePost = async(postId, token, user, dispatch) => {
    dispatch(isLoading(true))
    try {
        const UnlikeRef = doc(db, "posts", postId);
        await updateDoc(UnlikeRef, {
            likes: arrayRemove({
                userId: token,
                firstname: user?.firstname,
                lastname: user?.lastname,
                avatar: user?.avatar,
            })
        });
        dispatch(getAllPost());
    } catch(error) {
        dispatch(isLoading(false))
        dispatch(showToast({text: "Something went wrong", severity: "error"}))
    } finally {
        dispatch(isLoading(false))
    }
}
