import { cn } from '../../lib/cn'

const variants = {
  success: 'bg-[#55b96b] text-white',
  danger: 'bg-red-500 text-white',
  warning: 'bg-[#d3a132] text-white',
  info: 'bg-blue-500 text-white',
}

export function Badge({ variant = 'info', children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-[7px] py-[3px] rounded text-[10px] font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
