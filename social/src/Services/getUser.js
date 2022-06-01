import {db} from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../Features';

export const getUser = createAsyncThunk('auth/getUser', async(id, dispatch) => {
    try{
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
        dispatch(showToast({text: "No such document!", severity: "warning"}));
        }
    } catch(error) {
        dispatch(showToast({text: error.message, severity: "error"}));
    }    
})
