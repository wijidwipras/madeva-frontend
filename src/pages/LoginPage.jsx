import { useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ChevronRight } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'

const loginSchema = yup.object({
  klinikId: yup.string().required('Klinik ID wajib diisi'),
  userId: yup.string().required('User ID wajib diisi'),
  password: yup.string().required('Password wajib diisi'),
})

export default function LoginPage() {
  const recaptchaRef = useRef(null)

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = useCallback(
    async (data) => {
      const token = recaptchaRef.current?.getValue()

      if (!token) {
        setError('recaptcha', {
          type: 'manual',
          message: 'Silakan centang "Saya bukan robot"',
        })
        return
      }

      try {
        // TODO: Ganti dengan API call ke backend
        console.log('Login data:', { ...data, recaptchaToken: token })
        await new Promise((resolve) => setTimeout(resolve, 1500))
        // Reset reCAPTCHA setelah submit sukses
        recaptchaRef.current?.reset()
      } catch (err) {
        console.error('Login error:', err)
        recaptchaRef.current?.reset()
      }
    },
    [setError]
  )

  const handleFormSubmit = useCallback(
    (event) => {
      handleSubmit(onSubmit)(event)
    },
    [handleSubmit, onSubmit]
  )

  const handleRecaptchaChange = useCallback(() => {
    if (errors.recaptcha) {
      clearErrors('recaptcha')
    }
  }, [errors.recaptcha, clearErrors])

  return (
    <div className="min-h-screen bg-white flex items-start justify-center px-5 pt-16">
      <div className="w-full max-w-[360px]">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-5xl font-light text-gray-800 tracking-tight inline-flex items-start">
            Medeva
            <svg
              className="ml-1 -mt-1 h-10 w-auto text-yellow-500"
              viewBox="0 0 48 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 16 H14 L18 6 L22 26 L26 10 L30 22 L34 16 H44"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h1>
        </div>

        {/* Welcome Text */}
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Selamat datang di Medeva! Silakan login untuk melanjutkan
        </p>

        {/* Login Form */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <InputField
            name="klinikId"
            control={control}
            label="Klinik ID"
            placeholder="Masukkan Klinik ID"
            required
          />

          <InputField
            name="userId"
            control={control}
            label="User ID"
            placeholder="Masukkan User ID"
            required
          />

          <InputField
            name="password"
            control={control}
            label="Password"
            placeholder="Masukkan Password"
            type="password"
            showPasswordToggle
            required
          />

          {/* reCAPTCHA */}
          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LdVqvcsAAAAAMtxs_SgcnbP_7e8VMUD5zEO1zB5"
              theme="light"
              size="normal"
              onChange={handleRecaptchaChange}
            />
            {errors.recaptcha?.message && (
              <p className="mt-2 text-sm text-red-600">
                {errors.recaptcha.message}
              </p>
            )}
          </div>

          {/* Lupa Password */}
          <div className="text-left -mt-2">
            <button
              type="button"
              className="text-gray-500 text-sm hover:text-primary hover:underline transition-colors cursor-pointer bg-transparent border-none p-0"
              onClick={() => console.log('Lupa Password clicked')}
            >
              Lupa Password?
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={isSubmitting}
            >
              Masuk
            </Button>
          </div>

          {/* Link ke Apotek */}
          <div className="text-right pt-1">
            <button
              type="button"
              className="text-gray-500 text-sm hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 inline-flex items-center gap-0.5"
              onClick={() => console.log('Apotek login clicked')}
            >
              Masuk ke medeva apotek
              <ChevronRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
