import { RizzumeMark, MarkSize, MarkVariant } from './RizzumeMark'

type WordmarkSize = 'hero' | 'nav'

interface RizzumeWordmarkProps {
  size?: WordmarkSize
  variant?: MarkVariant
  showTagline?: boolean
  className?: string
}

const WORDMARK_CONFIG: Record<WordmarkSize, {
  markSize: MarkSize
  fontSize: number
  letterSpacing: string
  lineHeight: number | string
  gap: number
  taglineSize: number
  taglineTracking: string
}> = {
  hero: {
    markSize: 'hero',
    fontSize: 74,
    letterSpacing: '-3.5px',
    lineHeight: 0.92,
    gap: 40,
    taglineSize: 12,
    taglineTracking: '1.5px',
  },
  nav: {
    markSize: 'nav',
    fontSize: 22,
    letterSpacing: '-0.8px',
    lineHeight: 1,
    gap: 14,
    taglineSize: 10,
    taglineTracking: '1px',
  },
}

const VARIANT_TEXT_COLOR: Record<MarkVariant, string> = {
  coral: '#241C18',
  ink:   '#FBF7F1',
  cream: '#241C18',
}

const TAGLINE_COLOR: Record<MarkVariant, string> = {
  coral: '#8A7B6B',
  ink:   '#C9BBAE',
  cream: '#8A7B6B',
}

export function RizzumeWordmark({
  size = 'hero',
  variant = 'coral',
  showTagline = false,
  className,
}: RizzumeWordmarkProps) {
  const w = WORDMARK_CONFIG[size]

  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: w.gap }}
    >
      <RizzumeMark size={w.markSize} variant={variant} />
      <div style={{ textAlign: 'left' }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: w.fontSize,
            letterSpacing: w.letterSpacing,
            lineHeight: w.lineHeight,
            color: VARIANT_TEXT_COLOR[variant],
          }}
        >
          Rizzumé
        </div>
        {showTagline && (
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: w.taglineSize,
              letterSpacing: w.taglineTracking,
              color: TAGLINE_COLOR[variant],
              marginTop: size === 'hero' ? 12 : 4,
            }}
          >
            AI résumé builder with rizz
          </div>
        )}
      </div>
    </div>
  )
}
