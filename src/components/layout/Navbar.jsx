import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import { Avatar } from '../ui/Avatar'
import { DropdownMenu } from '../ui/DropdownMenu'
import { IconButton } from '../ui/IconButton'

export function Navbar({ clinicName, onMenuToggle, user }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <IconButton
          icon={Bars3Icon}
          className="md:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        />
        <span className="text-sm md:text-base font-semibold text-gray-800">
          {clinicName}
        </span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <svg
          className="h-6 w-auto hidden sm:block"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 16 H14 L18 6 L22 26 L26 10 L30 22 L34 16 H44"
            stroke="#11C5C0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="w-px h-6 bg-[#11C5C0] hidden sm:block" />
        <span className="text-2xl font-light text-gray-800 tracking-tight hidden sm:inline-flex items-center">
          Madeva
        </span>
        <span className="text-2xl font-light tracking-tight hidden sm:inline-flex items-center">
          <span className="text-[#11C5C0]">Mint</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <IconButton icon={BellIcon} size="sm" aria-label="Notifikasi" />

            <DropdownMenu
              align="right"
              trigger={
                <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                </button>
              }
              items={[
                { label: 'Profile', onClick: user.onProfile },
                { divider: true },
                { label: 'Logout', onClick: user.onLogout },
              ]}
            />
          </>
        )}
      </div>
    </header>
  )
}
