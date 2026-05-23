import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { IconButton } from '../ui/IconButton'
import { cn } from '../../lib/cn'

export function RoomCard({ room, isSelected, onSelect, onEdit, onDelete }) {
  return (
    <Card
      onClick={() => onSelect?.(room)}
      className={cn(
        'p-4 transition-all',
        isSelected && 'ring-2 ring-primary border-primary'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{room.name}</h3>
        <Badge variant={room.isAktif ? 'success' : 'danger'}>
          {room.isAktif ? 'Aktif' : 'Non-Aktif'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
        <div>
          <span className="text-gray-400">Kelas:</span> {room.kelas}
        </div>
        <div>
          <span className="text-gray-400">Kapasitas:</span> {room.kapasitas}
        </div>
        <div>
          <span className="text-gray-400">Jenis Kelamin:</span> {room.jenisKelamin}
        </div>
        <div>
          <span className="text-gray-400">Usia:</span> {room.usia}
        </div>
        <div className="col-span-2">
          <span className="text-gray-400">Penyakit:</span> {room.penyakit}
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <IconButton
          icon={PencilIcon}
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onEdit?.(room)
          }}
          aria-label="Edit ruangan"
        />
        <IconButton
          icon={TrashIcon}
          size="sm"
          variant="danger"
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.(room)
          }}
          aria-label="Hapus ruangan"
        />
      </div>
    </Card>
  )
}
