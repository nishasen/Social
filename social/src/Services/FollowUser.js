import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAllUser, getUser } from ".";
import { isFollowLoading, showToast } from "../Features";
import {db} from '../firebase';

export const FollowUser = async(token, peer, user, dispatch) => {
    dispatch(isFollowLoading(true))
    try {
        const FollowRef = doc(db, "users", peer?.userId);
        const FollowingRef = doc(db, "users", token);
        await updateDoc(FollowRef, {
            follower: arrayUnion({
                userId: token,
                firstname: user?.firstname,
                lastname: user?.lastname,
                avatar: user?.avatar,
            })
        });
        await updateDoc(FollowingRef, {
            following: arrayUnion({
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
