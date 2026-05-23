import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Badge } from '../ui/Badge'

export function RoomTable({ rooms, onSelect, selectedId }) {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-[#F1F2F6]">
            <th className="text-left px-4 py-3.5 text-xs font-medium text-gray-500 border-b border-r border-gray-300 w-12">
              #
            </th>
            <th className="text-left px-4 py-3.5 text-xs font-medium text-gray-500 border-b border-gray-300">
              Kategori Ruangan
            </th>
            <th className="w-14 border-b border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr
              key={room.id}
              className={selectedId === room.id ? 'bg-primary/5' : 'hover:bg-gray-50'}
            >
              <td className="px-4 py-4 text-sm text-gray-600 border-b border-r border-gray-300">
                {index + 1}
              </td>
              <td className="px-4 py-4 border-b border-r border-gray-300">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base font-bold text-gray-900">
                    {room.nama_ruangan}
                  </span>
                  <Badge variant={room.is_active ? 'success' : 'warning'}>
                    {room.is_active ? 'Aktif' : 'Non-Aktif'}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  Kelas: {room.nama_kelas}<br />
                  Jenis Kelamin: {room.jenis_kelamin || '-'}<br />
                  Usia: {room.usia || '-'}<br />
                  Penyakit: {room.penyakit || '-'}
                </div>
              </td>
              <td className="px-4 py-4 border-b border-gray-300 text-center">
                <button
                  onClick={() => onSelect(room)}
                  className="w-[42px] h-[42px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors shadow-[0_4px_10px_rgba(46,155,255,.3)]"
                  aria-label={`Pilih ${room.nama_ruangan}`}
                >
                  <ArrowRightIcon className="w-[18px] h-[18px]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
