"use client";

import React, { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MapDraggable, MapDraggableChildren } from "./types";
import { Resizable } from "re-resizable";

export function TimeDraggable({
  id,
  x,
  y,
  w,
  h,
  bg,
  children,
}: MapDraggableChildren) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    left: x,
    top: y,
    transform: CSS.Translate.toString(transform),
  };
  const backGroundColor = bg ? bg : "bg-red-400";
  const [height, setHeight] = useState<number>(200);

  useEffect(() => {
    console.log("drag");
  }, []);

  return (
    <button
      className={`absolute z-10 ${backGroundColor}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <Resizable
        style={{ border: "1px solid black" }}
        size={{ width: w, height: h }}
        enable={{
          top: true,
          bottom: true,
        }}
        onResizeStop={(ev, direction, elementRef, delta) => {
          // console.log(ev);
          // console.log(direction);
          // console.log(elementRef);
          // console.log(delta);
          setHeight((prev) => prev + delta.height);
        }}>
        {children}
      </Resizable>
    </button>
  );
}
