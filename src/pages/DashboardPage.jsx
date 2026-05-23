import { useState, useEffect, useCallback } from 'react'
import { Building2, FileText, Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { RoomTable } from '../components/dashboard/RoomTable'
import { RoomForm } from '../components/dashboard/RoomForm'
import { EmptyState } from '../components/dashboard/EmptyState'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { kategoriRuanganService } from '../services/kategoriRuangan.service'

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

const tabs = [
  { key: 'semua', label: 'SEMUA' },
  { key: 'aktif', label: 'AKTIF' },
  { key: 'non-aktif', label: 'NON-AKTIF' },
]

export function DashboardPage() {
  const { user, logout, isAdmin } = useAuth()

  const [rooms, setRooms] = useState([])
  const [meta, setMeta] = useState({ page: 1, perPage: 5, total: 0, totalPages: 1 })
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [activeTab, setActiveTab] = useState('semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [kelasOptions, setKelasOptions] = useState([])
  const [showForm, setShowForm] = useState(false)

  const fetchRooms = useCallback(async (page = 1, search = '') => {
    setIsLoading(true)
    try {
      const result = await kategoriRuanganService.getAll({ page, perPage: 5, search })
      setRooms(result.data)
      setMeta(result.meta)
    } catch (err) {
      console.error('Gagal memuat data ruangan:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchKelas = useCallback(async () => {
    try {
      const data = await kategoriRuanganService.getKelasRuangan()
      setKelasOptions(data)
    } catch (err) {
      console.error('Gagal memuat kelas ruangan:', err)
    }
  }, [])

  useEffect(() => {
    fetchRooms(1, '')
    fetchKelas()
  }, [fetchRooms, fetchKelas])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRooms(1, searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, fetchRooms])

  const filteredRooms = rooms.filter((room) => {
    if (activeTab === 'semua') return true
    if (activeTab === 'aktif') return room.is_active
    if (activeTab === 'non-aktif') return !room.is_active
    return true
  })

  const handleSelectRoom = (room) => {
    setSelectedRoom(room)
    setShowForm(true)
  }

  const handleCreateNew = () => {
    setSelectedRoom(null)
    setShowForm(true)
  }

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (selectedRoom?.id) {
        await kategoriRuanganService.update(selectedRoom.id, data)
      } else {
        await kategoriRuanganService.create(data)
      }
      setShowForm(false)
      setSelectedRoom(null)
      fetchRooms(meta.page, searchQuery)
    } catch (err) {
      const message = err.response?.data?.error || 'Terjadi kesalahan'
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.totalPages) {
      fetchRooms(newPage, searchQuery)
    }
  }

  const userData = user
    ? { name: user.nama_lengkap || user.username, role: user.is_admin ? 'Admin' : 'User' }
    : { name: 'Guest', role: '' }

  return (
    <DashboardLayout
      sidebarMenuItems={sidebarMenuItems}
      user={{
        ...userData,
        onProfile: () => {},
        onLogout: logout,
      }}
    >
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
            {isAdmin && (
              <Button onClick={handleCreateNew} icon={Plus}>
                Tambah
              </Button>
            )}
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

          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">
              Memuat data...
            </div>
          ) : (
            <>
              <RoomTable
                rooms={filteredRooms}
                onSelect={handleSelectRoom}
                selectedId={selectedRoom?.id}
              />

              {/* Pagination */}
              {meta.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">
                    Halaman {meta.page} dari {meta.totalPages} ({meta.total} data)
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handlePageChange(meta.page - 1)}
                      disabled={meta.page <= 1}
                      className="p-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => handlePageChange(meta.page + 1)}
                      disabled={meta.page >= meta.totalPages}
                      className="p-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>

        {/* Right Panel */}
        {showForm ? (
          <Card className="p-5 min-h-[720px]">
            <RoomForm
              onSubmit={handleSubmit}
              initialData={selectedRoom}
              isLoading={isSubmitting}
              kelasOptions={kelasOptions}
            />
          </Card>
        ) : (
          <Card className="p-5 h-[500px]">
            <EmptyState />
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
