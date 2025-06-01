import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import '../styles/KaryawanFullForm.scss';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { DUMMY_REGIONS } from '../utils/dummyRegions';

const tipeKaryawanOptions = [
  { value: 'Manager', label: 'Manager' }, { value: 'Admin', label: 'Admin' },
  { value: 'Resepsionis', label: 'Resepsionis' }, { value: 'Manajemen', label: 'Manajemen' },
  { value: 'Finance', label: 'Finance' }, { value: 'Kasir', label: 'Kasir' },
  { value: 'Purchasing', label: 'Purchasing' }, { value: 'Perawat', label: 'Perawat' },
  { value: 'Bidan', label: 'Bidan' }, { value: 'Dokter', label: 'Dokter' },
];

const KaryawanFullForm = ({ onSubmitForm, initialData = null, isLoading = false, isUpdate = false }) => {
  const [formData, setFormData] = useState({
    nama_lengkap: '', no_ktp_nik: '', jenis_kelamin: '', tempat_lahir: '',
    tanggal_lahir: '', no_telepon: '', provinsi: '', kota_kabupaten: '',
    kecamatan: '', kelurahan: '', alamat: '', username: '', email: '',
    password: '',
    status: '',
    tipe_karyawan: '',
    tipe_lainnya: '',
    tanggal_mulai_kontrak: '', tanggal_selesai_kontrak: '',
    status_menikah: '', kode_dokter_bpjs: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [villageOptions, setVillageOptions] = useState([]);

  const karyawanFullSchema = Yup.object().shape({
    nama_lengkap: Yup.string().required('Nama Lengkap wajib diisi.'),
    no_ktp_nik: Yup.string().required('No. Kartu Identitas wajib diisi.').matches(/^[0-9]{16}$/, 'Nomor KTP/NIK harus 16 digit angka.'),
    jenis_kelamin: Yup.string().required('Jenis Kelamin wajib dipilih.'),
    status: Yup.string().required('Status wajib dipilih.'),
    tempat_lahir: Yup.string().optional(),
    tanggal_lahir: Yup.date().optional().nullable().typeError('Format tanggal tidak valid.'),
    no_telepon: Yup.string().optional().matches(/^[0-9-+() ]*$/, 'Nomor telepon tidak valid.'),
    provinsi: Yup.string().optional(), kota_kabupaten: Yup.string().optional(),
    kecamatan: Yup.string().optional(), kelurahan: Yup.string().optional(),
    alamat: Yup.string().optional(), username: Yup.string().required('Username wajib diisi.').min(3, 'Username minimal 3 karakter.'),
    email: Yup.string().email('Format email tidak valid.').required('Email wajib diisi.'),
    password: isUpdate ? Yup.string().optional().nullable() : Yup.string().required('Password wajib diisi.').min(6, 'Password minimal 6 karakter.'),
    tipe_karyawan: Yup.string().required('Tipe wajib dipilih.'),
    tipe_lainnya: Yup.string().when('tipe', {
      is: 'Lainnya',
      then: schema => schema.required('Detail tipe lainnya wajib diisi.'),
      otherwise: schema => schema.optional().nullable(),
    }),
  
    tanggal_mulai_kontrak: Yup.date().optional().nullable().typeError('Format tanggal tidak valid.'),
    tanggal_selesai_kontrak: Yup.date().optional().nullable().typeError('Format tanggal tidak valid.')
      .when('tanggal_mulai_kontrak', (tanggal_mulai_kontrak, schema) => {
          return tanggal_mulai_kontrak ? schema.min(Yup.ref('tanggal_mulai_kontrak'), 'Tgl selesai tidak boleh sebelum tgl mulai') : schema;
      }),
    status_menikah: Yup.string().optional(),
    kode_dokter_bpjs: Yup.string().optional(),
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        // ... (mapping initialData lain tetap sama) ...
        nama_lengkap: initialData.nama_lengkap || '',
        no_ktp_nik: initialData.no_ktp_nik || '',
        jenis_kelamin: initialData.jenis_kelamin || '',
        tempat_lahir: initialData.tempat_lahir || '',
        tanggal_lahir: initialData.tanggal_lahir ? initialData.tanggal_lahir.split('T')[0] : '',
        no_telepon: initialData.no_telepon || '',
        provinsi: initialData.provinsi || '',
        kota_kabupaten: initialData.kota_kabupaten || '',
        kecamatan: initialData.kecamatan || '',
        kelurahan: initialData.kelurahan || '',
        alamat: initialData.alamat || '',
        username: initialData.username || '',
        email: initialData.email || '',
        password: null,
        status: initialData.status || '',
        tipe_karyawan: initialData.tipe_karyawan || '', // Langsung string, bukan array
        tipe_lainnya: initialData.tipe_lainnya || '',
        tanggal_mulai_kontrak: initialData.tanggal_mulai_kontrak ? initialData.tanggal_mulai_kontrak.split('T')[0] : '',
        tanggal_selesai_kontrak: initialData.tanggal_selesai_kontrak ? initialData.tanggal_selesai_kontrak.split('T')[0] : '',
        status_menikah: initialData.status_menikah || '',
        kode_dokter_bpjs: initialData.kode_dokter_bpjs || '',
      }));
    }
  }, [initialData]);

  useEffect(() => {
    const provinces = DUMMY_REGIONS.map(prov => ({ value: prov.id, label: prov.name }));
    setProvinceOptions([{ value: '', label: 'Pilih Provinsi...' }, ...provinces]);

    if (initialData) {
      if (initialData.provinsi) {
        const selectedProv = DUMMY_REGIONS.find(p => p.id === initialData.provinsi);
        if (selectedProv) {
          const cities = selectedProv.cities.map(city => ({ value: city.id, label: city.name }));
          setCityOptions([{ value: '', label: 'Pilih Kota/Kab...' }, ...cities]);
  
          if (initialData.kota_kabupaten) {
            const selectedCity = selectedProv.cities.find(c => c.id === initialData.kota_kabupaten);
            if (selectedCity) {
              const districts = selectedCity.districts.map(dist => ({ value: dist.id, label: dist.name }));
              setDistrictOptions([{ value: '', label: 'Pilih Kecamatan...' }, ...districts]);
  
              if (initialData.kecamatan) {
                const selectedDist = selectedCity.districts.find(d => d.id === initialData.kecamatan);
                if (selectedDist) {
                  const villages = selectedDist.villages.map(vill => ({ value: vill.id, label: vill.name }));
                  setVillageOptions([{ value: '', label: 'Pilih Kelurahan...' }, ...villages]);
                }
              }
            }
          }
        }
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };

      if (name === 'provinsi') {
        newData.kota_kabupaten = ''; // Reset pilihan kota
        newData.kecamatan = '';     // Reset pilihan kecamatan
        newData.kelurahan = '';     // Reset pilihan kelurahan
        setCityOptions([{ value: '', label: 'Pilih Kota/Kab...' }]);
        setDistrictOptions([{ value: '', label: 'Pilih Kecamatan...' }]);
        setVillageOptions([{ value: '', label: 'Pilih Kelurahan...' }]);
  
        if (value) {
          const selectedProv = DUMMY_REGIONS.find(p => p.id === value);
          if (selectedProv) {
            const cities = selectedProv.cities.map(city => ({ value: city.id, label: city.name }));
            setCityOptions(prevOpts => [{ value: '', label: 'Pilih Kota/Kab...' }, ...cities]);
          }
        }
      } else if (name === 'kota_kabupaten') {
        newData.kecamatan = '';
        newData.kelurahan = '';
        setDistrictOptions([{ value: '', label: 'Pilih Kecamatan...' }]);
        setVillageOptions([{ value: '', label: 'Pilih Kelurahan...' }]);
  
        if (value && formData.provinsi) { // Pastikan provinsi sudah terpilih
          const selectedProv = DUMMY_REGIONS.find(p => p.id === formData.provinsi);
          const selectedCity = selectedProv?.cities.find(c => c.id === value);
          if (selectedCity) {
            const districts = selectedCity.districts.map(dist => ({ value: dist.id, label: dist.name }));
            setDistrictOptions(prevOpts => [{ value: '', label: 'Pilih Kecamatan...' }, ...districts]);
          }
        }
      } else if (name === 'kecamatan') {
        newData.kelurahan = '';
        setVillageOptions([{ value: '', label: 'Pilih Kelurahan...' }]);
  
        if (value && formData.provinsi && formData.kota_kabupaten) {
          const selectedProv = DUMMY_REGIONS.find(p => p.id === formData.provinsi);
          const selectedCity = selectedProv?.cities.find(c => c.id === formData.kota_kabupaten);
          const selectedDist = selectedCity?.districts.find(d => d.id === value);
          if (selectedDist) {
            const villages = selectedDist.villages.map(vill => ({ value: vill.id, label: vill.name }));
            setVillageOptions(prevOpts => [{ value: '', label: 'Pilih Kelurahan...' }, ...villages]);
          }
        }
      }
      return newData;
    });
  
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // handleTipeRadioChange sudah ada untuk Jenis Kelamin, bisa dipakai juga untuk Tipe
  // atau buat yang baru jika ingin logika berbeda, tapi di sini kita bisa pakai yang sama.
  const handleTipeRadioChange = (e) => {
    const { name, value } = e.target; // name akan "tipe"
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Jika yang dipilih bukan "Lainnya", kosongkan tipe_lainnya
      tipe_lainnya: value !== 'Lainnya' ? '' : prev.tipe_lainnya,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    if (value !== 'Lainnya' && errors.tipe_lainnya) {
        setErrors(prev => ({...prev, tipe_lainnya: undefined}));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const dataToValidate = { ...formData };
      if (dataToValidate.tipe !== 'Lainnya') {
        dataToValidate.tipe_lainnya = '';
      }
      await karyawanFullSchema.validate(dataToValidate, { abortEarly: false });
      if (onSubmitForm) onSubmitForm(isUpdate, dataToValidate);
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => { newErrors[error.path] = error.message; });
      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const dummyOptions = [{ value: '', label: 'Pilih...' }, { value: 'reguler', label: 'Reguler' }];

  const statusMenikahOptions = [
    { value: '', label: 'Pilih Status' }, { value: 'Belum Menikah', label: 'Belum Menikah' },
    { value: 'Menikah', label: 'Menikah' }, { value: 'Cerai Hidup', label: 'Cerai Hidup' },
    { value: 'Cerai Mati', label: 'Cerai Mati' },
  ];


  return (
    <Form onSubmit={handleSubmit} className="karyawan-full-form">
      <Row>
        {/* Kolom Kiri */}
        <Col md={6} className="form-column">
          <Form.Group className="mb-3" controlId="formNamaLengkap">
            <Form.Label className="form-label-custom">
              Nama Lengkap <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="nama_lengkap"
              placeholder="Nama Lengkap"
              value={formData.nama_lengkap}
              onChange={handleChange}
              isInvalid={!!errors.nama_lengkap}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nama_lengkap}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNoKTP">
            <Form.Label className="form-label-custom">
              No. Kartu Identitas{" "}
              <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                (Nomor Induk Kependudukan)
              </span>
              <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="no_ktp_nik"
              placeholder="No. Kartu Identitas"
              value={formData.no_ktp_nik}
              onChange={handleChange}
              isInvalid={!!errors.no_ktp_nik}
            />
            <Form.Control.Feedback type="invalid">
              {errors.no_ktp_nik}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formJenisKelamin">
            <Form.Label className="form-label-custom">
              Jenis Kelamin <span className="text-danger">*</span>
            </Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Laki-laki"
                name="jenis_kelamin"
                value="Laki-laki"
                checked={formData.jenis_kelamin === "Laki-laki"}
                onChange={handleTipeRadioChange}
                id="radio-lk"
                isInvalid={!!errors.jenis_kelamin && !formData.jenis_kelamin}
              />
              <Form.Check
                inline
                type="radio"
                label="Perempuan"
                name="jenis_kelamin"
                value="Perempuan"
                checked={formData.jenis_kelamin === "Perempuan"}
                onChange={handleTipeRadioChange}
                id="radio-pr"
                isInvalid={!!errors.jenis_kelamin && !formData.jenis_kelamin}
              />
              {errors.jenis_kelamin && !formData.jenis_kelamin && (
                <div className="d-block invalid-feedback">
                  {errors.jenis_kelamin}
                </div>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTempatLahir">
            <Form.Label className="form-label-custom">Tempat Lahir</Form.Label>
            <Form.Control
              type="text"
              name="tempat_lahir"
              placeholder="Tempat Lahir"
              value={formData.tempat_lahir}
              onChange={handleChange}
              isInvalid={!!errors.tempat_lahir}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tempat_lahir}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTanggalLahir">
            <Form.Label className="form-label-custom">Tanggal Lahir</Form.Label>
            <Form.Control
              type="date"
              name="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              isInvalid={!!errors.tanggal_lahir}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tanggal_lahir}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNoTelepon">
            <Form.Label className="form-label-custom">No. Telepon</Form.Label>
            <Form.Control
              type="tel"
              name="no_telepon"
              placeholder="No. Telepon"
              value={formData.no_telepon}
              onChange={handleChange}
              isInvalid={!!errors.no_telepon}
            />
            <Form.Control.Feedback type="invalid">
              {errors.no_telepon}
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="formProvinsi"
            >
              <Form.Label className="form-label-custom">Provinsi</Form.Label>
              <Form.Select
                name="provinsi"
                value={formData.provinsi}
                onChange={handleChange}
                isInvalid={!!errors.provinsi}
              >
                {provinceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.provinsi}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="formKotaKabupaten"
            >
              <Form.Label className="form-label-custom">
                Kota / Kabupaten
              </Form.Label>
              <Form.Select
                name="kota_kabupaten"
                value={formData.kota_kabupaten}
                onChange={handleChange}
                isInvalid={!!errors.kota_kabupaten}
                disabled={!formData.provinsi || cityOptions.length <= 1}
              >
                {cityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.kota_kabupaten}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="formKecamatan"
            >
              <Form.Label className="form-label-custom">Kecamatan</Form.Label>
              <Form.Select
                name="kecamatan"
                value={formData.kecamatan}
                onChange={handleChange}
                isInvalid={!!errors.kecamatan}
                disabled={
                  !formData.kota_kabupaten || districtOptions.length <= 1
                }
              >
                {districtOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.kecamatan}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="formKelurahan"
            >
              <Form.Label className="form-label-custom">Kelurahan</Form.Label>
              <Form.Select
                name="kelurahan"
                value={formData.kelurahan}
                onChange={handleChange}
                isInvalid={!!errors.kelurahan}
                disabled={!formData.kecamatan || villageOptions.length <= 1}
              >
                {villageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.kelurahan}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formDetailAlamat">
            <Form.Label className="form-label-custom">Detail Alamat</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="alamat"
              placeholder="Alamat"
              value={formData.alamat}
              onChange={handleChange}
              isInvalid={!!errors.alamat}
            />
            <Form.Control.Feedback type="invalid">
              {errors.alamat}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Kolom Kanan */}
        <Col md={6} className="form-column">
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label className="form-label-custom">
              Username <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="form-label-custom">
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="form-label-custom">
              Password <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formJenisStatus">
            <Form.Label className="form-label-custom">
              Status <span className="text-danger">*</span>
            </Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Aktif"
                name="status"
                value="aktif"
                checked={formData.status === "aktif"}
                onChange={handleTipeRadioChange}
                id="radio-a"
                isInvalid={!!errors.status && !formData.status}
              />
              <Form.Check
                inline
                type="radio"
                label="Non-Aktif"
                name="status"
                value="non-aktif"
                checked={formData.status === "non-aktif"}
                onChange={handleTipeRadioChange}
                id="radio-na"
                isInvalid={!!errors.status && !formData.status}
              />
              {errors.status && !formData.status && (
                <div className="d-block invalid-feedback">
                  {errors.status}
                </div>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTipeKaryawan">
            <Form.Label className="form-label-custom">
              Tipe <span className="text-danger">*</span>
            </Form.Label>
            <div className="radio-group-wrapper">
              <Row>
                {tipeKaryawanOptions
                  .slice(0, Math.ceil(tipeKaryawanOptions.length))
                  .map((opt) => (
                    <Col xs={6} key={opt.value} className="mb-1">
                      <Form.Check
                        type="radio" // <<<< BERUBAH
                        label={opt.label}
                        name="tipe_karyawan" // <<<< Semua radio button dalam grup harus punya 'name' yang sama
                        value={opt.value}
                        checked={formData.tipe_karyawan === opt.value} // <<<< Perbandingan langsung dengan formData.tipe
                        onChange={handleTipeRadioChange} // <<<< Gunakan handler baru
                        id={`radio-tipe-${opt.value}`}
                        isInvalid={!!errors.tipe_karyawan && !formData.tipe_karyawan} // Feedback jika belum dipilih
                      />
                    </Col>
                  ))}
              </Row>
              <Row className="mt-1 align-items-center">
                <Col xs={6} sm={4} className="mb-1">
                  <Form.Check
                    type="radio" // <<<< BERUBAH
                    label="Lainnya"
                    name="tipe_karyawan"
                    value="Lainnya" // Value spesifik untuk opsi "Lainnya"
                    checked={formData.tipe_karyawan === "Lainnya"}
                    onChange={handleTipeRadioChange}
                    id="radio-tipe-lainnya"
                    isInvalid={!!errors.tipe_karyawan && !formData.tipe_karyawan}
                  />
                </Col>
                <Col xs={6} sm={8}>
                  {formData.tipe === "Lainnya" && ( // Tampilkan jika 'Lainnya' dipilih
                    <Form.Control
                      type="text"
                      name="tipe_lainnya"
                      placeholder="Detail Tipe Lainnya"
                      value={formData.tipe_lainnya}
                      onChange={handleChange} // Bisa pakai handleChange biasa
                      size="sm"
                      isInvalid={!!errors.tipe_lainnya}
                    />
                  )}
                </Col>
              </Row>
            </div>
            {/* Tampilkan error untuk grup radio jika belum ada yang dipilih */}
            {errors.tipe && !formData.tipe && (
              <div className="d-block invalid-feedback mt-1">{errors.tipe}</div>
            )}
            {/* Tampilkan error untuk input 'tipe_lainnya' jika 'Lainnya' dipilih dan input kosong */}
            {errors.tipe_lainnya && formData.tipe === "Lainnya" && (
              <div className="d-block invalid-feedback mt-1">
                {errors.tipe_lainnya}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTanggalMulaiKontrak">
            <Form.Label className="form-label-custom">
              Tanggal Mulai Kontrak
            </Form.Label>
            <Form.Control
              type="date"
              name="tanggal_mulai_kontrak"
              value={formData.tanggal_mulai_kontrak}
              onChange={handleChange}
              isInvalid={!!errors.tanggal_mulai_kontrak}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tanggal_mulai_kontrak}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTanggalSelesaiKontrak">
            <Form.Label className="form-label-custom">
              Tanggal Selesai Kontrak
            </Form.Label>
            <Form.Control
              type="date"
              name="tanggal_selesai_kontrak"
              value={formData.tanggal_selesai_kontrak}
              onChange={handleChange}
              isInvalid={!!errors.tanggal_selesai_kontrak}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tanggal_selesai_kontrak}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatusMenikah">
            <Form.Label className="form-label-custom">
              Status Menikah
            </Form.Label>
            <Form.Select
              name="status_menikah"
              value={formData.status_menikah}
              onChange={handleChange}
              isInvalid={!!errors.status_menikah}
            >
              {statusMenikahOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.status_menikah}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formKodeDokterBPJS">
            <Form.Label className="form-label-custom">
              Kode Dokter BPJS
            </Form.Label>
            <Form.Select
              name="kode_dokter_bpjs"
              value={formData.kode_dokter_bpjs}
              onChange={handleChange}
              isInvalid={!!errors.kode_dokter_bpjs}
            >
              {dummyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.kode_dokter_bpjs}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="d-flex justify-content-end">
          <Button
            variant="primary"
            type="submit"
            className="simpan-button px-4"
            disabled={isLoading}
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default KaryawanFullForm;