// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
//   tagTypes: ["Posts"],

//   endpoints: (builder) => ({
//     getPosts: builder.query({
//       query: () => "post",
//       providesTags: ["Posts"],
//     }),
//     getPostById: builder.query({
//       query: (postId) => `post/${postId}`,
//       providesTags: (result, error, postId) => [{ type: "Posts", id: postId }],
//     }),

//     addComment: builder.mutation({
//       query: ({ postId, comment }) => ({
//         url: `post/${postId}/comments`,
//         method: "POST",
//         body: comment,
//       }),
//       invalidatesTags: (result, error, { postId }) => [
//         { type: "Posts", id: postId },
//         { type: "Posts", id: `${postId}-comments` },
//       ],
//     }),
//     getComments: builder.query({
//       query: (postId) => `post/${postId}/comments`,
//       providesTags: (result, error, postId) => [{ type: "Posts", id: `${postId}-comments` }],
//     }),

//     createPost: builder.mutation({
//       query: (newPost) => ({
//         url: "post",
//         method: "POST",
//         body: newPost,
//       }),
//       invalidatesTags: ["Posts"],
//     }),
//   }),
// });

// export const {
//   useGetPostsQuery,
//   useGetPostByIdQuery,
//   useCreatePostMutation,
//   useAddCommentMutation,
//   useGetCommentsQuery,
// } = api;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Posts"],

  endpoints: (builder) => ({
    // GET ALL POSTS
    getPosts: builder.query({
      query: () => "post",
      providesTags: ["Posts"],
    }),

    // GET SINGLE POST
    getPostById: builder.query({
      query: (postId) => `post/${postId}`,
      providesTags: (result, error, postId) => [{ type: "Posts", id: postId }],
    }),

    // ADD COMMENT
    addComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `post/${postId}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Posts", id: postId },
        { type: "Posts", id: `${postId}-comments` },
      ],
    }),

    // GET COMMENTS
    getComments: builder.query({
      query: (postId) => `post/${postId}/comments`,
      providesTags: (result, error, postId) => [
        { type: "Posts", id: `${postId}-comments` },
      ],
    }),

    // CREATE POST
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "post",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),
    // ✅ EDIT POST (PUT)
    editPost: builder.mutation({
      query: ({ id, title, body }) => ({
        url: `post/${id}`,
        method: "PUT",
        body: { title, body },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Posts", id },
        "Posts",
      ],
    }),
    // ✅ DELETE POST (DELETE)
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
  useEditPostMutation,
  useDeletePostMutation,
} = api;
