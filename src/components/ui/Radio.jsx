import { Controller } from 'react-hook-form'
import { cn } from '../../lib/cn'

export function Radio({
  name,
  control,
  label,
  options = [],
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
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
            )}

            <div className="flex flex-wrap gap-3">
              {options.map((opt) => {
                const isSelected = field.value === opt.value
                return (
                  <label
                    key={opt.value}
                    className={cn(
                      'inline-flex items-center gap-2 cursor-pointer',
                      disabled && 'cursor-not-allowed opacity-60'
                    )}
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={disabled}
                      onClick={() => !disabled && field.onChange(opt.value)}
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                        isSelected
                          ? 'border-primary'
                          : 'border-gray-300 bg-white',
                        disabled && 'bg-gray-100 border-gray-200'
                      )}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </button>
                    <span className="text-sm text-gray-700">{opt.label}</span>
                  </label>
                )
              })}
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
