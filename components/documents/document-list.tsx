"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileText, MoreVertical, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  title: string;
  updatedAt: Date;
}

const documents: Document[] = [
  {
    id: "1",
    title: "Project Requirements",
    updatedAt: new Date("2024-02-25T10:00:00"),
  },
  {
    id: "2",
    title: "Meeting Notes",
    updatedAt: new Date("2024-02-24T15:30:00"),
  },
  {
    id: "3",
    title: "Development Guidelines",
    updatedAt: new Date("2024-02-23T09:15:00"),
  },
];

interface DocumentListProps {
  selectedDocument: string | null;
  onSelect: (id: string) => void;
}

export function DocumentList({
  selectedDocument,
  onSelect,
}: DocumentListProps) {
  const [items, setItems] = useState(documents);

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    if (selectedDocument === id) {
      onSelect("");
    }
  };

  return (
    <div className="w-full space-y-2">
      {items.map((doc) => (
        <div
          key={doc.id}
          className={cn(
            "w-full flex-1 gap-2 flex items-center justify-between rounded-lg px-3 py-2 text-sm",
            "hover:bg-accent hover:text-accent-foreground",
            selectedDocument === doc.id && "bg-accent text-accent-foreground"
          )}
        >
          <button
            className="flex items-center gap-2 flex-1 text-left truncate"
            onClick={() => onSelect(doc.id)}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <div className="flex-1">
              <div className="truncate font-medium">{doc.title}</div>
              <div className="text-xs text-muted-foreground">
                Updated {doc.updatedAt.toLocaleDateString()}
              </div>
            </div>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => handleDelete(doc.id)}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
