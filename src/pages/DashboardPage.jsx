import { useState } from 'react'
import { Settings, BedDouble, Users, Activity } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { RoomCard } from '../components/dashboard/RoomCard'
import { RoomForm } from '../components/dashboard/RoomForm'
import { Card } from '../components/ui/Card'

const sidebarMenuItems = [
  { icon: BedDouble, label: 'Dashboard', href: '/', isActive: true },
  { icon: Settings, label: 'Pengaturan Ruangan', href: '/rooms', isActive: false },
  { icon: Users, label: 'Pasien', href: '/patients', isActive: false },
  { icon: Activity, label: 'Laporan', href: '/reports', isActive: false },
]

const initialRooms = [
  {
    id: 1,
    name: 'Ruangan ABC',
    kelas: 'Ocean Blue',
    kapasitas: 3,
    jenisKelamin: 'Perempuan',
    usia: 'Semua',
    penyakit: 'Non-Infeksius',
    isAktif: false,
    fasilitas: ['ac', 'tv', 'kasur'],
  },
  {
    id: 2,
    name: 'Rafflesia 1',
    kelas: 'Ocean Blue',
    kapasitas: 13,
    jenisKelamin: 'Perempuan',
    usia: 'Anak',
    penyakit: 'Infeksius',
    isAktif: true,
    fasilitas: ['ac', 'tv', 'kasur', 'kipas-angin'],
  },
  {
    id: 3,
    name: 'Macaca Fascicularis',
    kelas: 'Clover',
    kapasitas: 1,
    jenisKelamin: 'Laki-laki',
    usia: 'Semua',
    penyakit: 'Non-Infeksius',
    isAktif: true,
    fasilitas: ['ac', 'tv', 'kasur', 'kamar-mandi-pribadi'],
  },
]

export function DashboardPage() {
  const [rooms, setRooms] = useState(initialRooms)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const user = {
    name: 'Dr. Sarah',
    role: 'Dokter',
    onProfile: () => console.log('Profile clicked'),
    onLogout: () => console.log('Logout clicked'),
  }

  const handleSubmit = (data) => {
    setIsSubmitting(true)
    console.log('Form submitted:', data)
    setTimeout(() => {
      setIsSubmitting(false)
      setSelectedRoom(null)
    }, 1000)
  }

  const handleEdit = (room) => {
    setSelectedRoom(room)
  }

  const handleDelete = (room) => {
    setRooms(rooms.filter((r) => r.id !== room.id))
  }

  return (
    <DashboardLayout
      sidebarMenuItems={sidebarMenuItems}
      user={user}
    >
      <div className="flex gap-6">
        <div className="w-full md:w-[360px] flex-shrink-0">
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Kategori Ruangan
            </h2>
            <div className="space-y-3">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isSelected={selectedRoom?.id === room.id}
                  onSelect={setSelectedRoom}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </Card>
        </div>

        <div className="flex-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {selectedRoom ? 'Edit Kategori Ruangan' : 'Tambah Kategori Ruangan'}
            </h2>
            <RoomForm
              onSubmit={handleSubmit}
              initialData={selectedRoom}
              isLoading={isSubmitting}
            />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
