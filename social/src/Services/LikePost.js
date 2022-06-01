import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAllPost } from ".";
import { showToast } from "../Features";
import {db} from '../firebase';

export const LikePost = async(postId, token, user, dispatch) => {
    try {
        const LikeRef = doc(db, "posts", postId);
        await updateDoc(LikeRef, {
            likes: arrayUnion({
                userId: token,
                firstname: user?.firstname,
                lastname: user?.lastname,
                avatar: user?.avatar,
            })
        });
        dispatch(getAllPost());
    } catch(error) {
        dispatch(showToast({text: "Something went wrong", severity: "error"}))
    }
}
