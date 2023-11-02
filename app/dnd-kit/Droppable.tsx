import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      className="w-[500px] h-[600px] bg-gray-200 relative"
      ref={setNodeRef}
      style={style}>
      {props.children}
    </div>
  );
}
