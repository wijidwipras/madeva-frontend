import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * InputField component integrated with React Hook Form.
 * Supports labels, helper text, validation errors, and password visibility toggle.
 *
 * @param {Object} props
 * @param {string} props.name - RHF field name
 * @param {import('react-hook-form').Control} props.control - RHF control object
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {'text' | 'email' | 'password' | 'number'} [props.type='text']
 * @param {string} [props.helperText]
 * @param {import('react-hook-form').RegisterOptions} [props.rules]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className]
 * @param {boolean} [props.showPasswordToggle=false]
 * @param {boolean} [props.required=false]
 */
export function InputField({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  helperText,
  rules,
  disabled = false,
  className,
  showPasswordToggle = false,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error
        const errorId = hasError ? `${name}-error` : undefined
        const helperId = helperText ? `${name}-helper` : undefined
        const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

        return (
          <div className={cn('w-full', className)}>
            {label && (
              <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
            )}

            <div className="relative">
              <input
                id={name}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={hasError}
                aria-describedby={describedBy}
                className={cn(
                  'w-full border rounded-lg px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2',
                  hasError
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-primary focus:border-primary',
                  disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
                  isPassword && showPasswordToggle && 'pr-12'
                )}
                {...field}
              />

              {isPassword && showPasswordToggle && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              )}
            </div>

            {hasError ? (
              <p
                id={errorId}
                className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {fieldState.error.message}
              </p>
            ) : helperText ? (
              <p id={helperId} className="mt-1.5 text-sm text-gray-500">
                {helperText}
              </p>
            ) : null}
          </div>
        )
      }}
    />
  )
}
