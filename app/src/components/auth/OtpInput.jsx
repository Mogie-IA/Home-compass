import { useRef } from 'react'

/**
 * Six-box verification code input with auto-advance, backspace, and paste.
 * (Mock: any 6 digits are accepted by the caller.)
 */
export default function OtpInput({ value, onChange, onComplete }) {
  const refs = useRef([])

  const setChar = (i, char) => {
    const next = value.split('')
    next[i] = char
    const joined = next.join('').slice(0, 6)
    onChange(joined)
    return joined
  }

  const handleChange = (i, e) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1)
    if (!char) return
    const joined = setChar(i, char)
    if (i < 5) refs.current[i + 1]?.focus()
    if (joined.length === 6 && !joined.includes(undefined)) onComplete?.(joined)
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (value[i]) setChar(i, '')
      else if (i > 0) {
        refs.current[i - 1]?.focus()
        setChar(i - 1, '')
      }
    }
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < 5) refs.current[i + 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const digits = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6)
    if (!digits) return
    onChange(digits)
    const focusIdx = Math.min(digits.length, 5)
    refs.current[focusIdx]?.focus()
    if (digits.length === 6) onComplete?.(digits)
  }

  return (
    <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-14 w-full rounded-xl border border-line bg-white text-center text-[1.35rem] font-bold text-navy shadow-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand focus:shadow-[0_0_0_3px_rgb(0_82_204/0.18)]"
        />
      ))}
    </div>
  )
}
