import Image from 'next/image';
import { RenderImageContext, RenderImageProps } from 'react-photo-album';
import 'react-photo-album/masonry.css';

export function renderNextImage(
  { alt = '', title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={'blurDataURL' in photo ? 'blur' : undefined}
        className='rounded-lg'
      />
    </div>
  );
}
