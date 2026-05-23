import { cn } from '../../lib/cn'

export function Card({ className, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
    >
      {children}
    </div>
  )
}
