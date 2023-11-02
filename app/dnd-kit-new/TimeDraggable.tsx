import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { TimeDraggable } from "./types";

export function TimeDraggable({
  id,
  x,
  y,
  height,
  bg,
  children,
}: TimeDraggable) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
  };
  const backGroundColor = bg ? bg : "bg-red-400";
  const size = `h-[${height}px]`;

  return (
    <button
      className={`absolute w-[100px] ${size} z-50 ${backGroundColor}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      {children}
    </button>
  );
}
