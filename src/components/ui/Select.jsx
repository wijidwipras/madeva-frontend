import { Controller } from 'react-hook-form'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

export function Select({
  name,
  control,
  label,
  options = [],
  placeholder = 'Pilih...',
  rules,
  disabled = false,
  className,
  required = false,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error
        const errorId = hasError ? `${name}-error` : undefined

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
              <select
                id={name}
                disabled={disabled}
                aria-invalid={hasError}
                aria-describedby={errorId}
                className={cn(
                  'w-full border rounded-md px-4 py-2.5 text-base text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 appearance-none bg-white',
                  hasError
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-primary focus:border-primary',
                  disabled && 'bg-gray-100 cursor-not-allowed opacity-60'
                )}
                {...field}
              >
                {placeholder && (
                  <option value="" disabled>
                    {placeholder}
                  </option>
                )}
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            {hasError && (
              <p
                id={errorId}
                className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
              >
                {fieldState.error.message}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}
