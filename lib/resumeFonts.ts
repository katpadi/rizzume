export interface ResumeFont {
  id: string
  label: string
  cssFamily: string
  pdfFamily: string
  googleFont?: string
}

export const RESUME_FONTS: ResumeFont[] = [
  {
    id: 'helvetica',
    label: 'Helvetica',
    cssFamily: 'Helvetica, Arial, sans-serif',
    pdfFamily: 'Helvetica',
  },
  {
    id: 'georgia',
    label: 'Georgia',
    cssFamily: 'Georgia, "Times New Roman", serif',
    pdfFamily: 'Times-Roman',
  },
  {
    id: 'garamond',
    label: 'Garamond',
    cssFamily: '"EB Garamond", Georgia, serif',
    pdfFamily: 'EBGaramond',
    googleFont: 'EB+Garamond:ital,wght@0,400;0,700;1,400',
  },
  {
    id: 'lato',
    label: 'Lato',
    cssFamily: '"Lato", Helvetica, sans-serif',
    pdfFamily: 'Lato',
    googleFont: 'Lato:ital,wght@0,400;0,700;1,400',
  },
  {
    id: 'merriweather',
    label: 'Merriweather',
    cssFamily: '"Merriweather", Georgia, serif',
    pdfFamily: 'Merriweather',
    googleFont: 'Merriweather:ital,wght@0,400;0,700;1,400',
  },
]

export const DEFAULT_FONT_ID = 'helvetica'

export function getFontById(id: string): ResumeFont {
  return RESUME_FONTS.find((f) => f.id === id) ?? RESUME_FONTS[0]
}
