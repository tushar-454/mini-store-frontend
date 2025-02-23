import { BASE_URL } from '@/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export type TCategory = {
  _id: string;
  name: string;
  photo: string;
};
export type TCategories = {
  success: boolean;
  data: TCategory[];
};

export type TCategoryRes = {
  success: boolean;
  data: TCategory;
};

type Error403 = {
  status: number;
  message: string;
};
type Error400 = {
  status: number;
  errors: {
    field: string;
    message: string;
  }[];
};

export type TCategoryError = {
  status: number;
  data: Error403 | Error400;
};

const category = createApi({
  reducerPath: 'category',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    category: builder.query<TCategories, void>({
      query: () => '/category',
    }),
    createCategory: builder.mutation<TCategoryRes, Partial<TCategory>>({
      query: (body) => ({
        url: '/category',
        method: 'POST',
        body,
      }),
    }),
    updateCategory: builder.mutation<TCategoryRes, Partial<TCategory>>({
      query: ({ _id, ...body }) => ({
        url: '/category/' + _id,
        method: 'PUT',
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      // Optimistic update for deletion
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchedResult = dispatch(
          category.util.updateQueryData('category', undefined, (draft) => {
            draft.data = draft.data.filter((category) => category._id !== id);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchedResult.undo();
        }
      },
    }),
  }),
});

export const {
  useCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = category;
export { category };
