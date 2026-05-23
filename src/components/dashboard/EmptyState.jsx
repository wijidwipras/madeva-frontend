import { FolderOpen } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[620px] border border-gray-200 rounded-2xl p-8 text-center">
      <div className="w-[180px] h-[180px] rounded-full bg-[#f2f2f7] flex items-center justify-center mb-8">
        <FolderOpen size={80} className="text-[#b9bfd0]" />
      </div>
      <p className="text-gray-500 text-lg leading-loose max-w-[700px]">
        Silahkan memilih data kategori ruangan untuk melihat, mengubah,
        menghapus, mengarsipkan, dan mengaktifkan data kategori ruangan.
        Silahkan klik tombol tambah untuk menambahkan kategori ruangan baru.
      </p>
    </div>
  )
}
