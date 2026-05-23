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
    <div className="min-h-screen bg-[#f4f4f4]">
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

      <main className="pt-16 lg:ml-[95px] min-h-screen flex flex-col">
        <div className="flex-1 p-3.5">{children}</div>
        <div className="px-3.5 pb-3.5">
          <Footer copyrightText="PT Medeva Multi Talenta" />
        </div>
      </main>
    </div>
  )
}
