"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type KanbanTask = {
  id: string;
  title: string;
  description: string;
  assignee: string;
};

type Column = {
  id: string;
  title: string;
  tasks: KanbanTask[];
};

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Implement authentication",
        description: "Add user login and registration",
        assignee: "John Doe",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-2",
        title: "Create dashboard",
        description: "Design and implement main dashboard",
        assignee: "Jane Smith",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [],
  },
];

export default function KanbanPage() {
  const [columns, setColumns] = useState(initialColumns);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // Find source and destination columns
    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destColumn) return;

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map((col) => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: newTasks };
        }
        return col;
      });

      setColumns(newColumns);
    } else {
      // Moving to different column
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map((col) => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks };
        }
        return col;
      });

      setColumns(newColumns);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-muted rounded-lg p-4">
              <h2 className="font-semibold mb-4">{column.title}</h2>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-background"
                          >
                            <CardContent className="p-4">
                              <h3 className="font-medium">{task.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {task.description}
                              </p>
                              <Badge className="mt-2" variant="outline">
                                {task.assignee}
                              </Badge>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
