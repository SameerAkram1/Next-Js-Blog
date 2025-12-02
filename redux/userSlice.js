import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth/" }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
    }),

     loginUser: builder.mutation({
      query: (credentials) => ({
        url: "callback/credentials", // NextAuth credentials endpoint
        method: "POST",
        body: credentials,
      }),
    })



  }),
});

export const { useRegisterUserMutation } = userSlice;
