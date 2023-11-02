"use client";

import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent, Modifier } from "@dnd-kit/core";

import { TimeDraggable } from "./TimeDraggable";
import { TimeDroppable } from "./TimeDroppable";
import { MapDraggable } from "./types";
import { mapOfData } from "./mapping";

export default function App() {
  const [{ x, y }, setCoordinates] = useState({ x: 0, y: 50 });
  const [{ xx, yy }, setCoordinates2] = useState({ xx: 0, yy: 500 });
  const [listOfMap, setListOfMap] = useState<Array<MapDraggable>>([]);

  useEffect(() => {
    console.log(mapOfData);
    setListOfMap(mapOfData);
  }, []);

  return (
    <div className=" w-screen h-screen bg-green-200 flex justify-center items-center gap-4">
      <DndContext
        onDragEnd={handleDragEnd}
        // modifiers={[restrictToVerticalAxis]}
      >
        <TimeDroppable>
          {listOfMap.map((mapData) => (
            <TimeDraggable
              x={mapData.x}
              y={mapData.y}
              id={mapData.id}
              w={100}
              h={mapData.h}>
              {`mapData ${mapData.id}`}
            </TimeDraggable>
          ))}
          {/* <TimeDraggable
            x={x}
            y={y}
            id={"1"}
            w={100}
            h={100}>
            Test1
          </TimeDraggable>

          <TimeDraggable
            x={xx}
            y={yy}
            id={"2"}
            w={100}
            h={100}>
            Test2
          </TimeDraggable> */}
        </TimeDroppable>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    console.log(event);

    if (event.active.id === "1") {
      setCoordinates((prev) => {
        const go = Math.floor(event.delta.x / 100) * 100;
        return {
          x: prev.x + go <= 0 ? 0 : prev.x + go >= 500 ? 400 : prev.x + go,
          y: prev.y + event.delta.y,
        };
      });
    } else if (event.active.id === "2") {
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
