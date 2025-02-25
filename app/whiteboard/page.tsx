"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Square,
  Circle,
  Type,
  Eraser,
  Undo,
  Redo,
  Download,
} from "lucide-react";

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState<
    "pencil" | "rectangle" | "circle" | "text" | "eraser"
  >("pencil");
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth - 48; // Accounting for padding
    canvas.height = window.innerHeight - 200; // Accounting for header and tools

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    setContext(ctx);
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    if (!context) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawing(true);
    setLastPos({ x, y });
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing || !context || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    switch (tool) {
      case "pencil":
        context.lineTo(x, y);
        context.stroke();
        break;
      case "eraser":
        context.clearRect(x - 10, y - 10, 20, 20);
        break;
      case "rectangle":
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        context.strokeRect(lastPos.x, lastPos.y, x - lastPos.x, y - lastPos.y);
        break;
      case "circle":
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        context.beginPath();
        const radius = Math.sqrt(
          Math.pow(x - lastPos.x, 2) + Math.pow(y - lastPos.y, 2)
        );
        context.arc(lastPos.x, lastPos.y, radius, 0, 2 * Math.PI);
        context.stroke();
        break;
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
    if (context) {
      context.closePath();
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Whiteboard</h1>
        <div className="flex gap-2">
          <Button
            variant={tool === "pencil" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("pencil")}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "rectangle" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("rectangle")}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "circle" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("circle")}
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "text" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("text")}
          >
            <Type className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "eraser" ? "default" : "outline"}
            size="icon"
            onClick={() => setTool("eraser")}
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <div className="border-l mx-2" />
          <Button variant="outline" size="icon">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="bg-white w-full cursor-crosshair"
        />
      </div>
    </div>
  );
}
