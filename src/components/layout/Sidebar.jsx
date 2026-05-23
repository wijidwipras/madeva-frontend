import { useState } from 'react'
import { X, FileText } from 'lucide-react'
import { IconButton } from '../ui/IconButton'
import { cn } from '../../lib/cn'

export function Sidebar({ menuItems = [], isOpen, onClose }) {
  const [hoveredMenu, setHoveredMenu] = useState(null)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 w-[95px] bg-white z-40 transition-transform duration-200',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-end p-4 lg:hidden">
          <IconButton icon={X} onClick={onClose} size="sm" aria-label="Close menu" />
        </div>

        <nav className="flex flex-col items-center gap-2 pt-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            return (
              <div
                key={item.href}
                className="relative w-full"
                onMouseEnter={() => hasChildren && setHoveredMenu(item.href)}
                onMouseLeave={() => hasChildren && setHoveredMenu(null)}
              >
                <a
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1.5 w-full py-3 text-xs font-medium transition-colors',
                    item.isActive
                      ? 'text-primary border-l-4 border-primary bg-primary/5'
                      : 'text-gray-500 hover:text-gray-900 border-l-4 border-transparent'
                  )}
                >
                  {Icon && <Icon size={28} />}
                  <span className="truncate px-2">{item.label}</span>
                </a>

                {hasChildren && hoveredMenu === item.href && (
                  <div className="absolute left-full top-0 w-56 bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.12)] border border-gray-200 border-l-0 py-2 z-50">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon || FileText
                      return (
                        <a
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <ChildIcon size={16} className="text-gray-400" />
                          {child.label}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
