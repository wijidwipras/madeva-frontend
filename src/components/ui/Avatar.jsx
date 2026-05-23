import { useState } from 'react'
import { cn } from '../../lib/cn'

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
}

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function Avatar({ src, alt = '', size = 'md', fallback, className }) {
  const [hasError, setHasError] = useState(!src)

  return (
    <div
      className={cn(
        'rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 overflow-hidden',
        sizes[size],
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{fallback || getInitials(alt || '?')}</span>
      )}
    </div>
  )
}
