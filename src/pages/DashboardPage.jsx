import { useState } from 'react'
import { Building2, FileText, Search, Plus } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { RoomTable } from '../components/dashboard/RoomTable'
import { RoomForm } from '../components/dashboard/RoomForm'
import { EmptyState } from '../components/dashboard/EmptyState'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const sidebarMenuItems = [
  {
    icon: Building2,
    label: 'Rawat Inap',
    href: '/',
    isActive: true,
    children: [
      { icon: FileText, label: 'Pengaturan Ruangan', href: '/rooms' },
      { icon: FileText, label: 'Pengaturan Kelas', href: '/classes' },
    ],
  },
]

const initialRooms = [
  {
    id: 1,
    name: 'Ruangan ABC',
    kelas: 'Jingga',
    kapasitas: 3,
    jenisKelamin: 'Perempuan',
    usia: 'Dewasa',
    penyakit: 'Non-Infeksius',
    isAktif: false,
  },
  {
    id: 2,
    name: 'Rafflesia 1',
    kelas: 'Ocean Blue',
    kapasitas: 13,
    jenisKelamin: 'Semua',
    usia: 'Anak',
    penyakit: 'Infeksius',
    isAktif: true,
  },
  {
    id: 3,
    name: 'Macaca Fascicularis',
    kelas: 'Clover',
    kapasitas: 6,
    jenisKelamin: 'Laki-laki',
    usia: 'Semua',
    penyakit: 'Non-Infeksius',
    isAktif: true,
  },
]

const tabs = [
  { key: 'semua', label: 'SEMUA' },
  { key: 'aktif', label: 'AKTIF' },
  { key: 'non-aktif', label: 'NON-AKTIF' },
]

export function DashboardPage() {
  const [rooms] = useState(initialRooms)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [activeTab, setActiveTab] = useState('semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const user = {
    name: 'Tenaga Medis 197',
    role: 'Dokter, Purchasing, Manager',
    onProfile: () => console.log('Profile clicked'),
    onLogout: () => console.log('Logout clicked'),
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesTab =
      activeTab === 'semua' ||
      (activeTab === 'aktif' && room.isAktif) ||
      (activeTab === 'non-aktif' && !room.isAktif)
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const handleSubmit = (data) => {
    setIsSubmitting(true)
    console.log('Form submitted:', data)
    setTimeout(() => {
      setIsSubmitting(false)
      setSelectedRoom(null)
    }, 1000)
  }

  return (
    <DashboardLayout sidebarMenuItems={sidebarMenuItems} user={user}>
      <div className="text-sm text-gray-400 mb-4">
        Rawat Inap / Pengaturan Kategori Ruangan
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4">
        {/* Left Panel */}
        <Card className="p-5 min-h-[720px]">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              TAMBAH KATEGORI<br />RUANGAN
            </h2>
            <Button>Tambah</Button>
          </div>

          <div className="text-sm font-semibold text-gray-700 mb-2.5">Status</div>

          <div className="bg-[#f8f8f8] border border-[#dedede] rounded-xl p-2 flex gap-2 mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_1px_3px_rgba(0,0,0,.03)]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 text-sm rounded-lg font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-white text-[#111] border border-[#d9d9d9] shadow-[0_2px_4px_rgba(0,0,0,.04),inset_0_1px_0_rgba(255,255,255,.9)]'
                    : 'bg-transparent text-[#9e9e9e] border border-transparent hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Pencarian"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border border-gray-200 rounded-l-lg px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button className="w-10 flex items-center justify-center border border-primary rounded-r-lg text-primary hover:bg-primary/5 transition-colors">
              <Search size={18} />
            </button>
          </div>

          <RoomTable
            rooms={filteredRooms}
            onSelect={setSelectedRoom}
            selectedId={selectedRoom?.id}
          />
        </Card>

        {/* Right Panel */}
        <Card className="p-5 min-h-[720px]">
          {selectedRoom ? (
            <RoomForm
              onSubmit={handleSubmit}
              initialData={selectedRoom}
              isLoading={isSubmitting}
            />
          ) : (
            <EmptyState />
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}
