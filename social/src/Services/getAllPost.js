import { collection, getDocs, query, orderBy } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";

export const getAllPost = createAsyncThunk('post/getAllPost', async() => {
    const posts = [];
    try {
        const q = query(collection(db, "posts"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            posts.push({postId: doc.id, data: doc.data()});
        })
        return posts;
    } catch(error) {
        console.log(error)
    }
})
