"use client";

import React, { useState } from "react";
import { DndContext, Modifier } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export default function App() {
  const [{ x, y }, setCoordinates] = useState({ x: 0, y: 50 });
  const [{ xx, yy }, setCoordinates2] = useState({ xx: 0, yy: 500 });
  const restrictToVerticalAxis: Modifier = ({ transform }) => {
    return {
      ...transform,
      x: 0,
    };
  };

  return (
    <div className=" w-screen h-screen bg-green-200 flex justify-center items-center gap-4">
      <DndContext
        onDragEnd={handleDragEnd1}
        // modifiers={[restrictToVerticalAxis]}
      >
        <Droppable id={"dd1"}>
          <Draggable
            x={x}
            y={y}
            message={"Hello World"}
            id={"d1"}
          />

          <Draggable
            x={xx}
            y={yy}
            message={"aaa"}
            id={"d2"}
          />
        </Droppable>
      </DndContext>
    </div>
  );

  function handleDragEnd1(event: any) {
    console.log(event);

    if (event.active.id === "d1") {
      setCoordinates((prev) => {
        const go = Math.floor(event.delta.x / 100) * 100;
        return {
          x: prev.x + go <= 0 ? 0 : prev.x + go >= 500 ? 400 : prev.x + go,
          y: prev.y + event.delta.y,
        };
      });
    } else if (event.active.id === "d2") {
      setCoordinates2((prev) => {
        const go = Math.floor(event.delta.x / 100) * 100;
        return {
          xx: prev.xx + go <= 0 ? 0 : prev.xx + go >= 500 ? 400 : prev.xx + go,
          yy: prev.yy + event.delta.y,
        };
      });
    }
  }
}
