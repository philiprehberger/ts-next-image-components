import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

export interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  /** Fallback image src when the primary image fails to load */
  fallbackSrc?: string;
  /** Show a skeleton pulse animation while loading (default: true) */
  showSkeleton?: boolean;
  /** CSS class for the outer container */
  containerClassName?: string;
}

/**
 * Next.js Image wrapper with skeleton loading animation and error fallback.
 * Fades in the image once loaded and falls back to a placeholder on error.
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  showSkeleton = true,
  className,
  containerClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageSrc = hasError ? fallbackSrc : src;

  return (
    <div className={clsx('relative overflow-hidden', containerClassName)}>
      {showSkeleton && isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
          aria-hidden="true"
        />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        className={clsx(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
