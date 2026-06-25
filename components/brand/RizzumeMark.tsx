export type MarkSize = 'app-icon' | 'hero' | 'card' | 'small' | 'nav' | 'favicon-32' | 'favicon-16'
export type MarkVariant = 'coral' | 'ink' | 'cream'

interface RizzumeMarkProps {
  size?: MarkSize
  variant?: MarkVariant
  className?: string
}

const SIZE_CONFIG: Record<MarkSize, {
  badge: number
  border: number
  ring: number
  offset: number
  font: number
  letterSpacing: string
  radius: number
  padding: number
  tilt: boolean
}> = {
  'app-icon':   { badge: 200, border: 6,   ring: 3,   offset: 12, font: 132, letterSpacing: '-4px',   radius: 46, padding: 16, tilt: true },
  'hero':       { badge: 130, border: 4,   ring: 2.5, offset: 8,  font: 88,  letterSpacing: '-3px',   radius: 30, padding: 12, tilt: true },
  'card':       { badge: 100, border: 3.5, ring: 2,   offset: 6,  font: 66,  letterSpacing: '-2px',   radius: 23, padding: 10, tilt: true },
  'small':      { badge: 64,  border: 2.5, ring: 2,   offset: 4,  font: 42,  letterSpacing: '-1.5px', radius: 15, padding: 8,  tilt: true },
  'nav':        { badge: 54,  border: 2.5, ring: 2,   offset: 4,  font: 36,  letterSpacing: '-1.5px', radius: 13, padding: 8,  tilt: true },
  'favicon-32': { badge: 32,  border: 2,   ring: 1.5, offset: 3,  font: 21,  letterSpacing: '-1px',   radius: 8,  padding: 5,  tilt: true },
  'favicon-16': { badge: 16,  border: 0,   ring: 0,   offset: 0,  font: 11,  letterSpacing: '0px',    radius: 4,  padding: 3,  tilt: false },
}

const VARIANT_CONFIG: Record<MarkVariant, {
  bg: string
  borderColor: string
  shadowColor: string
  rColor: string
}> = {
  coral: { bg: '#FF6B4A', borderColor: '#FBF7F1', shadowColor: '#241C18', rColor: '#FBF7F1' },
  ink:   { bg: '#241C18', borderColor: '#FF6B4A', shadowColor: '#FF6B4A', rColor: '#FF6B4A' },
  cream: { bg: '#FBF7F1', borderColor: '#FF6B4A', shadowColor: '#E14B3B', rColor: '#E14B3B' },
}

export function RizzumeMark({ size = 'hero', variant = 'coral', className }: RizzumeMarkProps) {
  const s = SIZE_CONFIG[size]
  const v = VARIANT_CONFIG[variant]

  const boxShadow = s.tilt && s.ring > 0
    ? `0 0 0 ${s.ring}px ${v.shadowColor}, ${s.offset}px ${s.offset}px 0 ${v.shadowColor}`
    : undefined

  return (
    <div
      className={className}
      style={{ padding: s.padding, display: 'inline-flex', flexShrink: 0 }}
    >
      <div
        style={{
          width: s.badge,
          height: s.badge,
          borderRadius: s.radius,
          background: v.bg,
          border: s.border > 0 ? `${s.border}px solid ${v.borderColor}` : undefined,
          transform: s.tilt ? 'rotate(6deg)' : undefined,
          boxShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: s.font,
            color: v.rColor,
            lineHeight: 1,
            letterSpacing: s.letterSpacing,
            transform: s.tilt ? 'rotate(-6deg)' : undefined,
            display: 'block',
          }}
        >
          R
        </span>
      </div>
    </div>
  )
}
