import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getUser } from ".";
import { showToast } from "../Features";
import {db} from '../firebase';

export const AddToBookmark = async(postId, token, dispatch) => {
    try {
        const BookmarkRef = doc(db, "users", token)
        await updateDoc(BookmarkRef, {
            bookmarks: arrayUnion({
                postId: postId,
        })
    });
        dispatch(getUser(token, dispatch));
    } catch (error) {
        dispatch(showToast({text: "Something went wrong", severity: "error"}));
    }
}