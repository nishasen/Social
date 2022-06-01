import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {db} from '../firebase';
import { getUser, getAllUser } from ".";
import { isLoading, showToast } from "../Features";

export const FollowerRemove = async(token, peer, user, dispatch) => {
    dispatch(isLoading(true))
    try {
        const FollowRef = doc(db, "users", peer?.userId);
        const FollowerRef = doc(db, "users", token);
        await updateDoc(FollowRef, {
            following: arrayRemove({
                userId: token,
                firstname: user?.firstname,
                lastname: user?.lastname,
                avatar: user?.avatar,
            })
        });
        await updateDoc(FollowerRef, {
            follower: arrayRemove({
                userId: peer?.userId,
                firstname: peer?.data?.firstname,
                lastname: peer?.data?.lastname,
                avatar: peer?.data?.avatar,
            })
        });
        dispatch(getUser(token, dispatch));
        dispatch(getAllUser());
    } catch(error) {
        dispatch(showToast({text: "Something went wrong", severity: "error"}))
    } finally { 
        dispatch(isLoading(false))
    }
}

