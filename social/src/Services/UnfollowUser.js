import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {db} from '../firebase';
import { getUser, getAllUser } from ".";
import { isFollowLoading, showToast } from "../Features";

export const UnfollowUser = async(token, peer, user, dispatch) => {
    dispatch(isFollowLoading(true))
    try {
        const FollowRef = doc(db, "users", peer?.userId);
        const FollowingRef = doc(db, "users", token);
        await updateDoc(FollowRef, {
            follower: arrayRemove({
                userId: token,
                firstname: user?.firstname,
                lastname: user?.lastname,
                avatar: user?.avatar,
            })
        });
        await updateDoc(FollowingRef, {
            following: arrayRemove({
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
        dispatch(isFollowLoading(false))
    }
}

