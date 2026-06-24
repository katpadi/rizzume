'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { useEffect, useCallback } from 'react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      style={active ? { background: 'var(--app-accent)' } : undefined}
      className={`h-7 w-7 flex items-center justify-center rounded text-xs font-medium transition-colors ${
        active
          ? 'text-white'
          : 'text-zinc-500 hover:bg-amber-50 hover:text-amber-700'
      }`}
    >
      {children}
    </button>
  )
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, codeBlock: false, code: false, blockquote: false, horizontalRule: false }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline' } }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[80px] text-sm text-zinc-800 leading-relaxed',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML()
      onChange(html === '<p></p>' ? '' : html)
    },
  })

  // Sync external value changes (e.g. store hydration)
  useEffect(() => {
    if (editor && value !== undefined) {
      const current = editor.getHTML()
      const normalized = value || ''
      if (current !== normalized && (normalized !== '' || current !== '<p></p>')) {
        editor.commands.setContent(normalized, { emitUpdate: false })
      }
    }
  }, [editor, value])

  const addLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href ?? ''
    const url = window.prompt('Enter URL', prev)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden focus-within:border-zinc-400 transition-colors">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-zinc-100 bg-zinc-50">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (⌘B)">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (⌘I)">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (⌘U)">
          <span className="underline">U</span>
        </ToolbarButton>
        <div className="w-px h-4 bg-zinc-200 mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
          ≡
        </ToolbarButton>
        <div className="w-px h-4 bg-zinc-200 mx-1" />
        <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Add link">
          🔗
        </ToolbarButton>
        {editor.isActive('link') && (
          <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} title="Remove link" active={false}>
            ✕
          </ToolbarButton>
        )}
      </div>

      {/* Editor area */}
      <div className="relative px-3 py-2">
        {editor.isEmpty && placeholder && (
          <p className="absolute top-2 left-3 text-sm text-zinc-400 pointer-events-none select-none">
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .ProseMirror ul { list-style-type: disc; padding-left: 1.25rem; margin: 0.25rem 0; }
        .ProseMirror li { margin: 0.1rem 0; }
        .ProseMirror p { margin: 0 0 0.25rem; }
        .ProseMirror p:last-child { margin-bottom: 0; }
      `}</style>
    </div>
  )
}
