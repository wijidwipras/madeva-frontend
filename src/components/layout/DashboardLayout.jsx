import { useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function DashboardLayout({
  children,
  sidebarMenuItems = [],
  user,
  clinicName = 'Klinik Sjamsudin Noor',
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        clinicName={clinicName}
        user={user}
        onMenuToggle={() => setSidebarOpen(true)}
      />

      <Sidebar
        menuItems={sidebarMenuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pt-16 md:ml-[280px] min-h-screen flex flex-col">
        <div className="flex-1 p-6">{children}</div>
        <Footer copyrightText="Madeva Mint" />
      </main>
    </div>
  )
}
