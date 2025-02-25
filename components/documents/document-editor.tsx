"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import { DocumentToolbar } from "./document-toolbar";

const content = `
<h1>Welcome to the Document Editor</h1>
<p>This is a full-featured rich text editor built with Tiptap. You can:</p>
<ul>
  <li>Format text with <strong>bold</strong>, <em>italic</em>, and other styles</li>
  <li>Create lists and task lists</li>
  <li>Add headings and quotes</li>
  <li>And much more!</li>
</ul>
`;

interface DocumentEditorProps {
  documentId: string;
}

export function DocumentEditor({}: DocumentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none max-w-full",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <DocumentToolbar editor={editor} />
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-4xl">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
