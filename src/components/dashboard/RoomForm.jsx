import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { InputField } from '../ui/InputField'
import { Select } from '../ui/Select'
import { Checkbox } from '../ui/Checkbox'
import { Radio } from '../ui/Radio'

const kelasOptions = [
  { value: 'ocean-blue', label: 'Ocean Blue' },
  { value: 'clover', label: 'Clover' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'ruby', label: 'Ruby' },
]

const usiaOptions = [
  { value: 'anak', label: 'Anak' },
  { value: 'dewasa', label: 'Dewasa' },
  { value: 'lansia', label: 'Lansia' },
  { value: 'semua', label: 'Semua' },
]

const jenisKelaminOptions = [
  { value: 'laki-laki', label: 'Laki-laki' },
  { value: 'perempuan', label: 'Perempuan' },
  { value: 'semua', label: 'Semua' },
]

const penyakitOptions = [
  { value: 'infeksius', label: 'Infeksius' },
  { value: 'non-infeksius', label: 'Non-Infeksius' },
  { value: 'semua', label: 'Semua' },
]

const fasilitasOptions = [
  { value: 'ac', label: 'AC' },
  { value: 'kipas-angin', label: 'Kipas Angin' },
  { value: 'tv', label: 'TV' },
  { value: 'amenities', label: 'Amenities' },
  { value: 'kamar-mandi-pribadi', label: 'Kamar Mandi Pribadi' },
  { value: 'kasur', label: 'Kasur' },
  { value: 'bed-penunggu', label: 'Bed Penunggu' },
  { value: 'lemari', label: 'Lemari' },
  { value: 'kursi', label: 'Kursi' },
  { value: 'dispenser', label: 'Dispenser' },
  { value: 'sofa', label: 'Sofa' },
  { value: 'overbed-table', label: 'Overbed Table' },
  { value: 'meja', label: 'Meja' },
  { value: 'crib', label: 'Crib / Tempat Tidur Bayi' },
  { value: 'bed-bayi', label: 'Bed Bayi' },
]

export function RoomForm({ onSubmit, initialData, isLoading }) {
  const { control, handleSubmit } = useForm({
    defaultValues: initialData || {
      namaRuangan: '',
      kelas: '',
      jumlahKamar: '',
      harga: '',
      fasilitas: [],
      jenisKelamin: '',
      usia: '',
      penyakit: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Informasi Ruangan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="namaRuangan"
            control={control}
            label="Nama Ruangan"
            placeholder="Contoh: Ruangan ABC"
            rules={{ required: 'Nama ruangan wajib diisi' }}
            required
          />
          <Select
            name="kelas"
            control={control}
            label="Kelas"
            options={kelasOptions}
            placeholder="Pilih kelas..."
            rules={{ required: 'Kelas wajib dipilih' }}
            required
          />
          <InputField
            name="jumlahKamar"
            control={control}
            label="Jumlah Kamar"
            type="number"
            placeholder="0"
            rules={{
              required: 'Jumlah kamar wajib diisi',
              min: { value: 1, message: 'Minimal 1 kamar' },
            }}
            required
          />
          <InputField
            name="harga"
            control={control}
            label="Harga"
            type="number"
            placeholder="0"
            rules={{
              required: 'Harga wajib diisi',
              min: { value: 0, message: 'Harga tidak boleh negatif' },
            }}
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Fasilitas Ruangan
        </h3>
        <Checkbox
          name="fasilitas"
          control={control}
          options={fasilitasOptions}
        />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Kategori Ruangan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Radio
            name="jenisKelamin"
            control={control}
            label="Jenis Kelamin"
            options={jenisKelaminOptions}
            rules={{ required: 'Jenis kelamin wajib dipilih' }}
            required
          />
          <Select
            name="usia"
            control={control}
            label="Usia"
            options={usiaOptions}
            placeholder="Pilih usia..."
            rules={{ required: 'Usia wajib dipilih' }}
            required
          />
          <Radio
            name="penyakit"
            control={control}
            label="Penyakit"
            options={penyakitOptions}
            rules={{ required: 'Penyakit wajib dipilih' }}
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button type="submit" isLoading={isLoading}>
          Simpan
        </Button>
      </div>
    </form>
  )
}
