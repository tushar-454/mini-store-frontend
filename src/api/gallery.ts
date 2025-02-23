import { BASE_URL } from '@/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TGallery = {
  _id: string;
  src: string;
  width: number;
  height: number;
  label: string;
};

type TGalleryResponse = {
  success: boolean;
  data: TGallery[];
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

export type TGalleryError = {
  status: number;
  data: Error403 | Error400;
};

const gallery = createApi({
  reducerPath: 'gallery',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    gallery: builder.query<TGalleryResponse, void>({
      query: () => '/gallery',
    }),
    createGallery: builder.mutation<TGalleryResponse, Partial<TGallery>>({
      query: (body) => ({
        url: '/gallery',
        method: 'POST',
        body,
      }),
    }),
    deleteGallery: builder.mutation({
      query: (id: string) => ({
        url: `/gallery/${id}`,
        method: 'DELETE',
      }),
      // Optimistic update for deletion
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchedResult = dispatch(
          gallery.util.updateQueryData('gallery', undefined, (draft) => {
            draft.data = draft.data.filter((gallery) => gallery._id !== id);
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

export const { useGalleryQuery, useCreateGalleryMutation, useDeleteGalleryMutation } = gallery;
export { gallery };
