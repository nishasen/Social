import { createSlice } from '@reduxjs/toolkit';
import { getAllPost } from '../../Services';

const initialState = {
    loading: false,
    posts: [],
    post: {},
    sortBy: "trending",
}

const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            if(state.sortBy==="trending") {
                state.posts?.sort((a, b) => b?.data?.likes?.length - a?.data?.likes?.length)
            } else if(state.sortBy==="recent") {
                state.posts?.sort((a, b) => new Date(b?.data?.date) - new Date(a?.data?.date))
            } else {
                state.posts?.sort((a, b) => new Date(a?.data?.date) - new Date(b?.data?.date))
            }
        },
        postLoading: (state, action) => {
            state.loading = action.payload
          },
        setPost: (state, action) => {
            state.post = action.payload
        }  
    },
    extraReducers: {
        [getAllPost.pending]: (state) => {
            state.loading = true;
        },
        [getAllPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            if(state.sortBy==="trending") {
                state.posts?.sort((a, b) => b?.data?.likes?.length - a?.data?.likes?.length)
            } else if(state.sortBy==="recent") {
                state.posts?.sort((a, b) => new Date(b?.data?.date) - new Date(a?.data?.date))
            } else {
                state.posts?.sort((a, b) => new Date(a?.data?.date) - new Date(b?.data?.date))
            }
        },
        [getAllPost.rejected]: (state) => {
          state.loading = false;
        }
    }
})

export const { postLoading, setPost, setSortBy } = PostSlice.actions;

export default PostSlice.reducer;