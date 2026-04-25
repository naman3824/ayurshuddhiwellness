'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useRef, useState } from 'react';

// ─── Cloudinary Config ───
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwudrtj1u/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ayurshuddhi_blog';

// ─── Bubble Menu Button ───
function BubbleButton({ onClick, isActive, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1.5 rounded transition-all duration-150 text-sm ${
        isActive
          ? 'bg-white/20 text-white'
          : 'text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

// ─── Main Component ───
export default function RichTextEditor({ content, onChange }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full mx-auto my-6',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-green-400 underline hover:text-green-300',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your amazing story...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert lg:prose-lg max-w-none min-h-[50vh] cursor-text focus:outline-none text-gray-200 prose-headings:text-white prose-a:text-green-400 prose-img:rounded-xl',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // ─── Cloudinary image upload ───
  const uploadToCloudinary = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.secure_url;
  }, []);

  const handleImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be smaller than 10MB.');
      return;
    }

    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }, [editor, uploadToCloudinary]);

  const handleLink = useCallback(() => {
    if (!editor) return;
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt('Enter URL:', 'https://');
    if (url) {
      editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
    }
  }, [editor]);

  return (
    <div className="relative">
      {/* Bubble Menu — appears on text selection */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 150 }}
          className="flex items-center gap-0.5 bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg px-1.5 py-1 shadow-2xl"
        >
          <BubbleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <span className="font-bold">B</span>
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <span className="italic">I</span>
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <span className="line-through">S</span>
          </BubbleButton>

          <div className="w-px h-5 bg-gray-600 mx-1" />

          <BubbleButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <span className="text-xs font-bold">H2</span>
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <span className="text-xs font-bold">H3</span>
          </BubbleButton>

          <div className="w-px h-5 bg-gray-600 mx-1" />

          <BubbleButton
            onClick={handleLink}
            isActive={editor.isActive('link')}
            title="Link"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          </BubbleButton>
        </BubbleMenu>
      )}

      {/* Floating Menu — appears on empty lines */}
      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 150, placement: 'left' }}
          className="flex items-center"
        >
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={uploading}
            className={`w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center transition-all duration-200 hover:border-green-400 hover:text-green-400 ${
              uploading
                ? 'text-gray-600 cursor-wait animate-pulse'
                : 'text-gray-400 cursor-pointer hover:bg-green-900/20'
            }`}
            title="Add an image"
          >
            {uploading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            )}
          </button>
        </FloatingMenu>
      )}

      {/* Editor content */}
      <EditorContent editor={editor} />

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
        className="hidden"
      />

      {/* Upload indicator */}
      {uploading && (
        <div className="absolute inset-x-0 top-0 bg-green-900/30 border border-green-700/50 rounded-lg px-4 py-2 flex items-center gap-2 text-sm text-green-400">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          Uploading image to Cloudinary...
        </div>
      )}

      {/* Word count footer */}
      {editor && (
        <div className="flex items-center justify-end px-2 py-2 text-xs text-gray-500">
          <span>{editor.getText().split(/\s+/).filter(Boolean).length} words</span>
        </div>
      )}
    </div>
  );
}
