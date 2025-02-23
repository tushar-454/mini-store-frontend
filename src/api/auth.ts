import { BASE_URL } from '@/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    createToken: builder.mutation({
      query: (body) => ({
        url: '/auth/token',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useCreateTokenMutation } = auth;
export { auth };
