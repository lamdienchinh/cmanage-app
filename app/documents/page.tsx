"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentEditor } from "@/components/documents/document-editor";
import { DocumentList } from "@/components/documents/document-list";
import { CreateDocumentDialog } from "@/components/documents/create-document-dialog";

export default function DocumentsPage() {
  const [open, setOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  return (
    <div className="h-[calc(100vh-theme(spacing.16))]">
      <div className="flex h-full">
        {/* Document List Sidebar */}
        <div className="w-64 border-r bg-muted/40 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Documents</h2>
            <Button size="sm" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <DocumentList
            selectedDocument={selectedDocument}
            onSelect={setSelectedDocument}
          />
        </div>

        {/* Editor Area */}
        <div className="flex-1">
          {selectedDocument ? (
            <DocumentEditor documentId={selectedDocument} />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a document or create a new one
            </div>
          )}
        </div>
      </div>

      <CreateDocumentDialog
        open={open}
        onOpenChange={setOpen}
        onDocumentCreate={(id) => {
          setSelectedDocument(id);
          setOpen(false);
        }}
      />
    </div>
  );
}
