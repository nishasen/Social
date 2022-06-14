import { signOut } from "@firebase/auth";
import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import { getUser, getAllUser } from '../../Services';

const initialState = {
  userLogin: false,
  allUser: [],
  user: {},
  otherUser: {},
  token: localStorage.getItem('userId') || null,
  loading: false,
  followLoading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkLogin: (state) => {
      state.token = localStorage.getItem('userId');
      state.token!==null ? state.userLogin = true : state.userLogin = false; 
    },
    loggedOut: (state) => {
      state.userLogin = false;
      signOut(auth);
      state.token = '';
      localStorage.removeItem('userId');
    },
    isLoading: (state, action) => {
      state.loading = action.payload
    },
    isFollowLoading: (state, action) => {
      state.followLoading = action.payload
    },
    setOtherUser: (state, action) => {
      state.otherUser = action?.payload?.data;
    }
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state) => {
      state.loading = false;
    },
    [getAllUser.pending]: (state) => {
      state.loading = true;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.allUser = action.payload
    },
    [getAllUser.rejected]: (state) => {
      state.loading = false;
    }
  }
});

export const { checkLogin, loggedOut, isLoading, setOtherUser, isFollowLoading } = AuthSlice.actions;
export default AuthSlice.reducer;
