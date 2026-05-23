import { cn } from '../../lib/cn'

const variants = {
  success: 'bg-gradient-to-b from-[#55b96b] to-[#45a35b] text-white',
  danger: 'bg-gradient-to-b from-red-500 to-red-600 text-white',
  warning: 'bg-gradient-to-b from-[#d3a132] to-[#c08f28] text-white',
  info: 'bg-gradient-to-b from-blue-500 to-blue-600 text-white',
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
