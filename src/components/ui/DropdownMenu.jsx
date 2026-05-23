import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/cn'

export function DropdownMenu({ trigger, items = [], align = 'right' }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-1',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} className="border-t border-gray-100 my-1" />
            }
            return (
              <button
                key={i}
                onClick={() => {
                  item.onClick?.()
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors',
                  item.className
                )}
              >
                {item.icon && <item.icon size={16} />}
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
