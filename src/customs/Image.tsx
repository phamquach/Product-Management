'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useState, useMemo } from 'react';
import Image, { ImageProps } from 'next/image';
import no_image from '@/public/no_image.png';

export default function CustomImage({ src, alt, ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImport>(src);
  
  const handleError = () => {
    if (imgSrc !== no_image) {
      setImgSrc(no_image);
    }
  };

  const finalAlt = useMemo(() => alt || 'fallback image', [alt]);

  return <Image {...props} src={imgSrc} onError={handleError} alt={finalAlt} />;
}
