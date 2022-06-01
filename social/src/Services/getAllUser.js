import { collection, getDocs, query } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";

export const getAllUser = createAsyncThunk('auth/getAllUser', async() => {
    const allUser = [];
    try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allUser.push({userId: doc.id, data: doc.data()});
        })
        return allUser;
    } catch(error) {
        console.log(error)
    }
})
