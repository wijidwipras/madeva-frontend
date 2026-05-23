import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { InboxIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/Button'
import { InputField } from '../ui/InputField'
import { Select } from '../ui/Select'
import { Checkbox } from '../ui/Checkbox'
import { Radio } from '../ui/Radio'
import { Modal } from '../ui/Modal'

const usiaOptions = [
  { value: 'Semua', label: 'Semua' },
  { value: 'Anak', label: 'Anak' },
  { value: 'Dewasa', label: 'Dewasa' },
]

const jenisKelaminOptions = [
  { value: 'Semua', label: 'Semua' },
  { value: 'Laki-laki', label: 'Laki-laki' },
  { value: 'Perempuan', label: 'Perempuan' },
]

const penyakitOptions = [
  { value: 'Semua', label: 'Semua' },
  { value: 'Infeksius', label: 'Infeksius' },
  { value: 'Non-Infeksius', label: 'Non-Infeksius' },
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
  { value: 'Kabinet', label: 'Kabinet' },
  { value: 'Bed Bayi', label: 'Bed Bayi' },
]

function mapApiToForm(apiData) {
  if (!apiData) return null
  return {
    nama_ruangan: apiData.nama_ruangan || '',
    id_kelas_ruangan: apiData.id_kelas_ruangan || '',
    harga_ruangan: apiData.harga_ruangan || '',
    jumlah_kamar: apiData.jumlah_kamar || '',
    fasilitas_ruangan: Array.isArray(apiData.fasilitas_ruangan) ? apiData.fasilitas_ruangan : [],
    jenis_kelamin: apiData.jenis_kelamin || '',
    usia: apiData.usia || '',
    penyakit: apiData.penyakit || '',
    is_active: apiData.is_active ?? true,
  }
}

const defaultValues = {
  nama_ruangan: '',
  id_kelas_ruangan: '',
  harga_ruangan: '',
  jumlah_kamar: '',
  fasilitas_ruangan: [],
  jenis_kelamin: '',
  usia: '',
  penyakit: '',
  is_active: true,
}

export function RoomForm({ onSubmit, onCancel, onToggleStatus, initialData, isLoading, kelasOptions = [] }) {
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: mapApiToForm(initialData) || defaultValues,
  })

  const is_active = watch('is_active')
  const [showActiveModal, setShowActiveModal] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  useEffect(() => {
    if (initialData) {
      reset(mapApiToForm(initialData))
    } else {
      reset(defaultValues)
    }
  }, [initialData, reset])

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  const confirmToggleActive = async () => {
    if (!initialData?.id) return
    setIsToggling(true)
    try {
      const updated = await onToggleStatus(initialData.id)
      setValue('is_active', updated.is_active, { shouldDirty: false })
    } catch {
      // error handled by parent toast
    } finally {
      setIsToggling(false)
      setShowActiveModal(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            FORM TAMBAH KATEGORI RUANGAN
          </h2>
          <p className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Wajib diisi
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowActiveModal(true)}
          className={`h-[42px] px-4 border rounded-md flex items-center gap-2.5 text-sm font-medium transition-colors ${
            is_active
              ? 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
              : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <InboxIcon className="w-4 h-4" />
          {is_active ? 'Aktif' : 'Aktifkan'}
        </button>
      </div>

      {/* Card 1: Informasi Ruangan */}
      <div className="border border-gray-200 rounded-xl p-5 mb-5">
        <h3 className="text-xl font-bold text-gray-900 mb-5">INFORMASI RUANGAN</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <InputField
            name="nama_ruangan"
            control={control}
            label="Nama / Nomor Ruangan"
            placeholder="Nama / Nomor Ruangan"
            rules={{ required: 'Nama ruangan wajib diisi' }}
            required
          />
          <Select
            name="id_kelas_ruangan"
            control={control}
            label="Kelas"
            options={kelasOptions.map(k => ({ value: k.id, label: k.nama_kelas }))}
            placeholder="Select..."
            rules={{ required: 'Kelas wajib dipilih' }}
            required
          />
          <InputField
            name="jumlah_kamar"
            control={control}
            label="Jumlah Kamar"
            placeholder="0"
            rules={{ required: 'Jumlah kamar wajib diisi' }}
            required
          />
          <InputField
            name="harga_ruangan"
            control={control}
            label="Harga Ruangan"
            placeholder="0"
            prefix="Rp"
            rules={{ required: 'Harga wajib diisi' }}
            required
          />
        </div>
      </div>

      {/* Card 2: Fasilitas Ruangan */}
      <div className="border border-gray-200 rounded-xl p-5 mb-5">
        <h3 className="text-xl font-bold text-gray-900 mb-5">FASILITAS RUANGAN</h3>
        <Checkbox
          name="fasilitas_ruangan"
          control={control}
          options={fasilitasOptions}
          columns={3}
        />
      </div>

      {/* Card 3: Kategori Ruangan */}
      <div className="border border-gray-200 rounded-xl p-5 mb-5">
        <h3 className="text-xl font-bold text-gray-900 mb-5">KATEGORI RUANGAN</h3>

        <div className="mb-6">
          <p className="text-base font-semibold text-gray-700 mb-3">
            Jenis Kelamin <span className="text-red-500">*</span>
          </p>
          <Radio
            name="jenis_kelamin"
            control={control}
            options={jenisKelaminOptions}
            rules={{ required: 'Jenis kelamin wajib dipilih' }}
          />
        </div>

        <div className="mb-6">
          <p className="text-base font-semibold text-gray-700 mb-3">
            Usia <span className="text-red-500">*</span>
          </p>
          <Radio
            name="usia"
            control={control}
            options={usiaOptions}
            rules={{ required: 'Usia wajib dipilih' }}
          />
        </div>

        <div>
          <p className="text-base font-semibold text-gray-700 mb-3">
            Penyakit <span className="text-red-500">*</span>
          </p>
          <Radio
            name="penyakit"
            control={control}
            options={penyakitOptions}
            rules={{ required: 'Penyakit wajib dipilih' }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Simpan
        </Button>
      </div>

      {/* Active Confirmation Modal */}
      <Modal
        isOpen={showActiveModal}
        onClose={() => setShowActiveModal(false)}
        title="KONFIRMASI STATUS"
      >
        <p className="text-gray-600 mb-5">
          Apakah Anda yakin ingin{' '}
          <strong>{is_active ? 'nonaktifkan' : 'aktifkan'}</strong>{' '}
          kategori ?
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowActiveModal(false)}
            className="px-5 py-2.5 rounded-lg border border-red-400 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={confirmToggleActive}
            disabled={isToggling}
            className="px-5 py-2.5 rounded-lg bg-[#4a9dff] text-white text-sm font-semibold shadow-[0_4px_12px_rgba(74,157,255,.25)] hover:bg-[#3a8df0] transition-colors disabled:opacity-50"
          >
            {isToggling ? 'Memproses...' : 'Ya'}
          </button>
        </div>
      </Modal>
    </form>
  )
}
