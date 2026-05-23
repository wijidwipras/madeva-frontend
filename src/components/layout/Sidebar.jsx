import { X } from 'lucide-react'
import { IconButton } from '../ui/IconButton'
import { cn } from '../../lib/cn'

export function Sidebar({ menuItems = [], isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 w-[280px] bg-white border-r border-gray-200 z-40 transition-transform duration-200',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <span className="text-sm font-semibold text-gray-500">Menu</span>
          <IconButton icon={X} onClick={onClose} size="sm" aria-label="Close menu" />
        </div>

        <div className="h-px bg-[#11C5C0] mx-4 md:hidden" />

        <nav className="flex flex-col gap-1 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  item.isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {Icon && <Icon size={20} />}
                {item.label}
              </a>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
