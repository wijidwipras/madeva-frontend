import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility to merge Tailwind classes and handle conditional class names.
 * Uses clsx for conditional logic and tailwind-merge to resolve conflicts.
 *
 * @param  {...(string | object | boolean)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
