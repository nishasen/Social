import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from '../Features/Theme/ThemeSlice';
import AuthReducer from '../Features/Auth/AuthSlice';
import ToastReducer from '../Features/Toast/ToastSlice';
import PostReducer from '../Features/Post/PostSlice';

export const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        auth: AuthReducer,
        toast: ToastReducer,
        post: PostReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});