import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";       
import { userSlice } from "./userSlice";    

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userSlice.reducerPath]: userSlice.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(userSlice.middleware),          
});
