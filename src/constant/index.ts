export const DEFAULT_AVATAR =
  'https://static.vecteezy.com/system/resources/previews/013/042/571/non_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg';

export const TRACKING_STATUS = ['Pending', 'Confirm', 'Cooking', 'Shipped', 'Delivered'];
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/v1`
    : process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/api/v1`
      : '';
