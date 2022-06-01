import { doc, deleteDoc } from "firebase/firestore";
import { getAllPost } from ".";
import { showToast } from "../Features";
import { db } from "../firebase";

export const DeletePost = async(id, dispatch) => {
    try {
        await deleteDoc(doc(db, "posts", id));
        dispatch(getAllPost());
    } catch (error) {
        dispatch(showToast({text: "Cannot delete post", severity: "error"}))
    }
}