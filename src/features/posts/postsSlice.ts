import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData: any) => {
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Post", id })),
      ],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responseData: any, _, arg) => {
        const actualPost = responseData.filter(
          (post: any) => post.userId === Number(arg)
        );

        return postsAdapter.setAll(initialState, actualPost);
      },
      providesTags: (result: any) => [
        ...result.ids.map((id: string) => ({ type: "Post", id })),
      ],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        console.warn("result", result);
        return [{ type: "Post", id: arg.id }];
      },
    }),
    addReaction: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PUT",
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { reactions: post.reactions },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
      // async onQueryStarted(
      //   post,
      //   { dispatch, queryFulfilled }
      // ) {
      //   // `updateQueryData` requires the endpoint name and cache key arguments,
      //   // so it knows which piece of cache state to update
      //   const patchResult = dispatch(
      //     extendedApiSlice.util.updateQueryData(
      //       "getPosts",
      //       undefined,
      //       (draft) => {
      //         // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
      //         const selectedPost = draft.entities[post.id];
      //         console.log("selected post ??", selectedPost)
      //         if (selectedPost) selectedPost.reactions = post.reactions;
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation,
} = extendedApiSlice;

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
