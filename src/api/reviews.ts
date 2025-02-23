import { BASE_URL } from '@/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TReview = {
  _id: string;
  user: string;
  name: string;
  email: string;
  photo: string;
  comment: string;
  rating: number;
  is_deleted: boolean;
};

type TReviewResponse = {
  success: boolean;
  data: TReview[];
};

type Error403 = {
  status: number;
  message: string;
};
type Error400 = {
  status: number;
  error: string;
};

export type TReviewError = {
  status: number;
  data: Error403 | Error400;
};

const reviews = createApi({
  reducerPath: 'reviews',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    reviews: builder.query<TReviewResponse, void>({
      query: () => '/review',
    }),
    allReviews: builder.query<TReviewResponse, void>({
      query: () => '/review/?is_deleted=all',
    }),
    createReview: builder.mutation<
      TReviewResponse,
      { orderId: string; comment: string; rating: number }
    >({
      query: ({ orderId, comment, rating }) => ({
        url: '/review/' + orderId,
        method: 'POST',
        body: { comment, rating },
      }),
    }),
    updateReview: builder.mutation<TReviewResponse, Partial<TReview>>({
      query: ({ _id, ...body }) => ({
        url: '/review/' + _id,
        method: 'PUT',
        body,
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          reviews.util.updateQueryData('allReviews', undefined, (draft) => {
            const review = draft.data.find((review) => review._id === _id);
            if (review) {
              Object.assign(review, patch);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useAllReviewsQuery,
} = reviews;
export { reviews };
