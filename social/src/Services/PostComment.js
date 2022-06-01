import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAllPost } from ".";
import { postLoading, showToast } from "../Features";
import {db} from '../firebase';

export const PostComment = async(postId, comment, dispatch) => {
    dispatch(postLoading(true))
    try {
        const CommentRef = doc(db, "posts", postId);
        await updateDoc(CommentRef, {
            Comment: arrayUnion(comment)
        });
        dispatch(getAllPost());
    } catch(error) {
        dispatch(postLoading(false))
        dispatch(showToast({text: "Something went wrong", severity: "error"}))
    } finally {
        dispatch(postLoading(false))
    }
}
