import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'https://62a9cf8a371180affbc8510c.mockapi.io/api/v1' }),
    tagTypes: ['Post', 'User'],
    endpoints: builder => ({})
})