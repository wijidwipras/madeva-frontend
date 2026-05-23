import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import { InputField } from '../ui/InputField'
import { Select } from '../ui/Select'
import { Checkbox } from '../ui/Checkbox'
import { Radio } from '../ui/Radio'

const usiaOptions = [
  { value: 'Anak', label: 'Anak' },
  { value: 'Dewasa', label: 'Dewasa' },
  { value: 'Lansia', label: 'Lansia' },
  { value: 'Semua', label: 'Semua' },
]

const jenisKelaminOptions = [
  { value: 'Laki-laki', label: 'Laki-laki' },
  { value: 'Perempuan', label: 'Perempuan' },
  { value: 'Semua', label: 'Semua' },
]

const penyakitOptions = [
  { value: 'Infeksius', label: 'Infeksius' },
  { value: 'Non-Infeksius', label: 'Non-Infeksius' },
  { value: 'Semua', label: 'Semua' },
]

const fasilitasOptions = [
  { value: 'AC', label: 'AC' },
  { value: 'Kipas Angin', label: 'Kipas Angin' },
  { value: 'TV', label: 'TV' },
  { value: 'Amenities', label: 'Amenities' },
  { value: 'Kamar Mandi Pribadi', label: 'Kamar Mandi Pribadi' },
  { value: 'Kasur', label: 'Kasur' },
  { value: 'Bed Penunggu', label: 'Bed Penunggu' },
  { value: 'Lemari', label: 'Lemari' },
  { value: 'Kursi', label: 'Kursi' },
  { value: 'Dispenser', label: 'Dispenser' },
  { value: 'Sofa', label: 'Sofa' },
  { value: 'Overbed Table', label: 'Overbed Table' },
  { value: 'Meja', label: 'Meja' },
  { value: 'Crib / Tempat Tidur Bayi', label: 'Crib / Tempat Tidur Bayi' },
  { value: 'Bed Bayi', label: 'Bed Bayi' },
]

function mapApiToForm(apiData) {
  if (!apiData) return null
  return {
    nama_ruangan: apiData.nama_ruangan || '',
    id_kelas_ruangan: apiData.id_kelas_ruangan || '',
    harga_ruangan: apiData.harga_ruangan || '',
    fasilitas_ruangan: Array.isArray(apiData.fasilitas_ruangan) ? apiData.fasilitas_ruangan : [],
    jenis_kelamin: apiData.jenis_kelamin || '',
    usia: apiData.usia || '',
    penyakit: apiData.penyakit || '',
    is_active: apiData.is_active ?? true,
  }
}

export function RoomForm({ onSubmit, initialData, isLoading, kelasOptions = [] }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: mapApiToForm(initialData) || {
      nama_ruangan: '',
      id_kelas_ruangan: '',
      harga_ruangan: '',
      fasilitas_ruangan: [],
      jenis_kelamin: '',
      usia: '',
      penyakit: '',
      is_active: true,
    },
  })

  useEffect(() => {
    if (initialData) {
      reset(mapApiToForm(initialData))
    } else {
      reset({
        nama_ruangan: '',
        id_kelas_ruangan: '',
        harga_ruangan: '',
        fasilitas_ruangan: [],
        jenis_kelamin: '',
        usia: '',
        penyakit: '',
        is_active: true,
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Informasi Ruangan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="nama_ruangan"
            control={control}
            label="Nama Ruangan"
            placeholder="Contoh: Ruangan Melati VIP"
            rules={{ required: 'Nama ruangan wajib diisi' }}
            required
          />
          <Select
            name="id_kelas_ruangan"
            control={control}
            label="Kelas"
            options={kelasOptions.map(k => ({ value: k.id, label: k.nama_kelas }))}
            placeholder="Pilih kelas..."
            rules={{ required: 'Kelas wajib dipilih' }}
            required
          />
          <InputField
            name="harga_ruangan"
            control={control}
            label="Harga"
            placeholder="Contoh: Rp 500.000"
            rules={{
              required: 'Harga wajib diisi',
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
          name="fasilitas_ruangan"
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
            name="jenis_kelamin"
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
