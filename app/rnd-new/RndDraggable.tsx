"use client";

import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { MapDraggableChildren } from "./types";

export default function RndDraggable({
  id,
  x,
  y,
  w,
  h,
  bg,
  children,
  onDragStart,
  onDragStop,
  onResizeStart,
  onResizeStop,
}: MapDraggableChildren) {
  const [zIndex, setZIndex] = useState("");
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: bg ?? "#f0f0f0",
  } as const;

  return (
    <Rnd
      id={id}
      className={zIndex}
      bounds={"parent"}
      style={style}
      enableResizing={{ top: true, right: false, bottom: true, left: false }}
      onDragStart={(e, data) => {
        onDragStart(e, data);
        setZIndex("absolute z-40");
      }}
      onDragStop={(e, data) => {
        onDragStop(e, data);
        setZIndex("");
      }}
      onResizeStart={(e, direction, ref) => {
        onResizeStart(e, direction, ref);

        setZIndex("absolute z-40");
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onResizeStop(e, direction, ref, delta, position);
        setZIndex("");
      }}
      size={{ width: w, height: h }}
      position={{ x: x, y: y }}>
      {children}
    </Rnd>
  );
}
