import { cn } from '../../lib/cn'

export function Card({ className, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
    >
      {children}
    </div>
  )
}
