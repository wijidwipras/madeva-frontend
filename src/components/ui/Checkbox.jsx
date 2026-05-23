import { Controller } from 'react-hook-form'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'

const gridColumns = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export function Checkbox({
  name,
  control,
  label,
  options = [],
  rules,
  disabled = false,
  className,
  columns,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error
        const errorId = hasError ? `${name}-error` : undefined
        const selectedValues = field.value || []

        const handleChange = (value) => {
          const updated = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value]
          field.onChange(updated)
        }

        return (
          <div className={cn('w-full', className)}>
            {label && (
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                {label}
              </label>
            )}

            <div className={columns ? cn('grid gap-3', gridColumns[columns]) : 'flex flex-wrap gap-3'}>
              {options.map((opt) => {
                const isChecked = selectedValues.includes(opt.value)
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
                      role="checkbox"
                      aria-checked={isChecked}
                      disabled={disabled}
                      onClick={() => !disabled && handleChange(opt.value)}
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                        isChecked
                          ? 'bg-primary border-primary'
                          : 'bg-white border-gray-300',
                        disabled && 'bg-gray-100 border-gray-200'
                      )}
                    >
                      {isChecked && <Check size={14} className="text-white" />}
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
