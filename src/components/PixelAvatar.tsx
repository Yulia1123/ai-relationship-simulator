import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PixelAvatarProps {
  prompt?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-28 h-28',
  lg: 'w-40 h-40',
  xl: 'w-56 h-56',
};

function generatePlaceholder(seed: string) {
  const hue = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 60%, 80%) 0%, hsl(${(hue + 60) % 360}, 50%, 75%) 100%)`,
        }}
      />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        <rect x="30" y="25" width="40" height="35" fill="#3D3833" opacity="0.15" />
        <rect x="35" y="55" width="30" height="25" fill="#3D3833" opacity="0.12" />
        <rect x="38" y="32" width="8" height="8" fill="#3D3833" opacity="0.25" />
        <rect x="54" y="32" width="8" height="8" fill="#3D3833" opacity="0.25" />
        <rect x="44" y="45" width="12" height="4" fill="#D78A8A" opacity="0.6" />
      </svg>
    </div>
  );
}

export function PixelAvatar({ prompt, alt = '头像', size = 'md', className = '' }: PixelAvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!prompt) {
      setImageUrl(null);
      return;
    }
    const url = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square`;
    setImageUrl(url);
    setLoaded(false);
    setError(false);
  }, [prompt]);

  const seed = prompt || alt;
  const showImage = imageUrl && !error;

  return (
    <div
      className={cn(
        `relative ${sizeMap[size]} rounded-xl overflow-hidden border-4 border-paper shadow-pixel bg-gradient-to-br from-rose/20 to-moss/20`,
        className
      )}
    >
      {showImage ? (
        <>
          <img
            src={imageUrl}
            alt={alt}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-500',
              loaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            loading="lazy"
          />
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              {generatePlaceholder(seed)}
              <div className="absolute inset-0 bg-paper/30 animate-pulse" />
            </div>
          )}
        </>
      ) : (
        generatePlaceholder(seed)
      )}
    </div>
  );
}
