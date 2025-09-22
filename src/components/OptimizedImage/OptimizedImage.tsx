import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjY2NjY2NjIiBmb250LXNpemU9IjE0Ij5CaWcgRXhwYW5zaW9uPC90ZXh0Pjwvc3ZnPg==',
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setImageError(true);
    if (onError) onError();
  };

  const shouldLoadImage = loading === 'eager' || inView;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder pendant le chargement */}
      {!imageLoaded && !imageError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
          aria-hidden="true"
        />
      )}
      
      {/* Image principale */}
      <img
        ref={imgRef}
        src={shouldLoadImage ? src : placeholder}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />

      {/* Indicateur de chargement */}
      {shouldLoadImage && !imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Gestion des erreurs */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 text-white text-sm">
          <div className="text-center">
            <p>🏗️</p>
            <p>Big Expansion</p>
            <p className="text-xs opacity-70">Image non disponible</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
