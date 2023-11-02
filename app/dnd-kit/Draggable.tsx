import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function Draggable({
  x,
  y,
  message,
  id,
}: {
  x: number;
  y: number;
  message: string;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      className=" absolute w-[100px] bg-red-400 h-24 border-8 border-blue-200 z-50"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      {message}
    </button>
  );
}
