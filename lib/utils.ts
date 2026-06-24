import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface RichTextBlock {
  type: 'paragraph' | 'bullet'
  text: string
  bold?: boolean
  italic?: boolean
}

/**
 * Parse Tiptap HTML into structured blocks for PDF rendering.
 * Runs only in browser context (uses DOMParser).
 */
export function parseHtmlBlocks(html: string): RichTextBlock[] {
  if (!html || typeof window === 'undefined') return []
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const blocks: RichTextBlock[] = []

  function extractText(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? ''
    return Array.from(node.childNodes).map(extractText).join('')
  }

  function processNode(node: Node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return
    const el = node as Element
    const tag = el.tagName.toLowerCase()

    if (tag === 'p') {
      const text = extractText(el).trim()
      if (text) blocks.push({ type: 'paragraph', text })
    } else if (tag === 'ul' || tag === 'ol') {
      el.querySelectorAll('li').forEach((li) => {
        const text = extractText(li).trim()
        if (text) blocks.push({ type: 'bullet', text })
      })
    } else {
      Array.from(el.childNodes).forEach(processNode)
    }
  }

  Array.from(doc.body.childNodes).forEach(processNode)
  return blocks
}
