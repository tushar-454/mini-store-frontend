import { TReview } from '@/api/reviews';
import { MessageSquareQuote } from 'lucide-react';
import Image from 'next/image';
import { Rating } from '../shared/rating';
import { TypographyH4, TypographyMuted, TypographyP } from '../ui/typography';

const ReviewCard = ({ review }: { review: TReview }) => {
  return (
    <div className='min-h-[355px] rounded-2xl border bg-white p-10 shadow-lg'>
      <div className='relative z-20 flex !min-h-[355px] flex-col items-center'>
        <MessageSquareQuote
          size={100}
          className='absolute -left-5 -top-5 -z-10 text-primary-foreground'
        />
        <TypographyP className='flex-grow text-center'>
          {review.comment.length > 200 ? `${review.comment.slice(0, 200)} . . .` : review.comment}
        </TypographyP>
        <div className='mt-8 flex flex-grow flex-col items-center justify-end gap-2'>
          <Rating rating={review.rating} />
          <Image
            src={review.photo || 'https://via.placeholder.com/50'}
            alt='avatar'
            width={50}
            height={50}
            className='size-14 cursor-pointer rounded-full object-cover shadow'
          />
          <span className='flex flex-col items-center justify-center'>
            <TypographyH4>{review.name}</TypographyH4>
            <TypographyMuted>{review.email}</TypographyMuted>
          </span>
        </div>
      </div>
    </div>
  );
};

export { ReviewCard };
