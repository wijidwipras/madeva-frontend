import emptyImg from '../../assets/empty.png'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <img
        src={emptyImg}
        alt="Empty state"
        className="w-[180px] h-[180px] object-contain mb-8"
      />
      <p className="text-gray-500 text-md leading-loose max-w-[800px]">
        Silahkan memilih data kategori ruangan untuk melihat, mengubah,
        menghapus, mengarsipkan, dan mengaktifkan data kategori ruangan.
        Silahkan klik tombol tambah untuk menambahkan kategori ruangan baru.
      </p>
    </div>
  )
}
