import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * Button component with multiple variants, sizes, loading state, and icon support.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {boolean} [props.fullWidth=false]
 * @param {string} [props.className]
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick]
 * @param {React.ReactNode} props.children
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  type = 'button',
  onClick,
  children,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none'

  const variants = {
    primary:
      'bg-gradient-primary text-white focus:ring-2 focus:ring-primary focus:ring-offset-2',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400',
    outline:
      'border border-primary text-primary bg-transparent hover:bg-primary/10 focus:ring-2 focus:ring-primary',
    ghost:
      'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2.5 text-base rounded-lg gap-2',
    lg: 'px-5 py-2.5 text-lg rounded-lg gap-2',
  }

  const stateStyles =
    isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        stateStyles,
        widthStyle,
        className
      )}
      {...props}
    >
      {isLoading && (
        <Loader2 className="animate-spin" size={size === 'sm' ? 16 : 20} />
      )}
      {!isLoading && leftIcon}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
      {!isLoading && rightIcon}
    </button>
  )
}
