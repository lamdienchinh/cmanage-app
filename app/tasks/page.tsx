"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskList } from "@/components/tasks/task-list";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";

export default function TasksPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      <TaskList />
      <CreateTaskDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
