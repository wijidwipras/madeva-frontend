import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-gradient-primary text-white focus:ring-2 focus:ring-primary focus:ring-offset-2',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
}

const sizes = {
  sm: 'p-1.5 rounded-md',
  md: 'p-2 rounded-lg',
}

export function IconButton({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  onClick,
  disabled = false,
  isLoading = false,
  'aria-label': ariaLabel,
  className,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center transition-colors focus:outline-none',
        variants[variant],
        sizes[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {isLoading ? (
        <ArrowPathIcon className={cn('animate-spin', size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')} />
      ) : (
        <Icon className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
      )}
    </button>
  )
}
