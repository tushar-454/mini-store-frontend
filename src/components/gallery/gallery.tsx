'use client';

import { useGalleryQuery } from '@/api/gallery';
import { useState } from 'react';
import { MasonryPhotoAlbum } from 'react-photo-album';
import { Container } from '../shared/container';
import GallerySkeleton from '../skeleton/gallery';
import { Button } from '../ui/button';
import Gradient from '../ui/gradient';
import { TypographyH2, TypographyMuted, TypographyP } from '../ui/typography';
import { renderNextImage } from './render_next_image';

const Gallery = () => {
  const { data, isLoading, isError } = useGalleryQuery();
  const [showall, setShowall] = useState(false);
  const { data: photos } = data || { success: false, data: [] };
  let placeholder;
  if (isLoading && !isError) {
    placeholder = <GallerySkeleton />;
  }

  if (!isLoading && isError) {
    placeholder = (
      <TypographyP className='text-center text-red-500'>Failed to load photos</TypographyP>
    );
  }

  if (!isLoading && !isError && Array.isArray(photos) && photos.length === 0) {
    placeholder = <TypographyMuted className='text-center'>No photos found</TypographyMuted>;
  }

  return (
    <section>
      <Container>
        <TypographyH2 id='gallery'>
          <Gradient>Gallery</Gradient>
        </TypographyH2>
        {/* wrapper  */}
        {placeholder ? (
          <div className='my-8'>{placeholder}</div>
        ) : (
          <div
            className={`relative my-8 rounded-lg ${showall ? 'h-auto' : 'max-h-[600px] overflow-hidden'}`}
          >
            {!showall && (
              <span className='absolute left-0 top-0 z-30 grid h-full w-full place-items-center items-end bg-gradient-to-b from-transparent to-black/50'>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowall(!showall)}
                  className='mb-5 text-white'
                >
                  View More
                </Button>
              </span>
            )}
            <MasonryPhotoAlbum
              photos={photos && photos.length > 0 ? photos : []}
              render={{ image: renderNextImage }}
              defaultContainerWidth={1200}
              sizes={{
                size: '1168px',
                sizes: [{ viewport: '(max-width: 1200px)', size: 'calc(100vw - 32px)' }],
              }}
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export { Gallery };
