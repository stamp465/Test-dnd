"use client";

import React, { useEffect, useState } from "react";
import { MapDraggable } from "./types";
import { mapOfData } from "./mapping";
import RndDraggable from "./RndDraggable";
import {
  RndDragCallback,
  RndResizeCallback,
  RndResizeStartCallback,
} from "react-rnd";

export default function Page() {
  const [listOfMap, setListOfMap] = useState<Array<MapDraggable>>([]);
  const [boxBg, setBoxBg] = useState("bg-gray-200");

  useEffect(() => {
    // console.log(mapOfData);
    setListOfMap(mapOfData);
  }, []);

  useEffect(() => {
    console.log(listOfMap);
  }, [listOfMap]);

  function checkDaydrop(x: number) {
    const wSIze = 100;
    for (let i = 0; i < 5; i++) {
      const startI = i * 100;
      // console.log(startI, x);
      if (x >= startI) {
        if (x - startI < wSIze / 2) {
          return i;
        }
      } else {
        if (startI - x < wSIze / 2) {
          return i;
        }
      }
    }
    return null;
  }

  function canDrop(newData: MapDraggable) {
    if (
      newData.y < 0 ||
      newData.y > 600 ||
      newData.h <= 0 ||
      newData.y + newData.h > 600 ||
      newData.y + newData.h < 0
    )
      return false;
    for (let i = 0; i < listOfMap.length; i++) {
      const data = listOfMap[i];
      if (data.id != newData.id && data.day == newData.day) {
        const startData = data.y;
        const endData = data.y + data.h;
        const startNewData = newData.y;
        const endNewData = newData.y + newData.h;
        console.log("canDrop", startNewData, endNewData, startData, endData);
        if (startNewData <= startData && endNewData <= startData) {
          console.log("--1--");
        } else if (startNewData >= endData && endNewData >= endData) {
          console.log("--2--");
        } else {
          console.log("--3--");
          return false;
        }
      }
    }
    return true;
  }

  function checkDropPosition(newData: MapDraggable) {
    // can drop if have more space than newData height
    for (let i = 0; i < listOfMap.length; i++) {
      const data = listOfMap[i];
      if (data.id != newData.id && data.day == newData.day) {
        const startData = data.y;
        const endData = data.y + data.h;
        const startNewData = newData.y;
        const endNewData = newData.y + newData.h;
        if (startNewData < startData) {
          // collapse top
          console.log("collapse top", data.id);
          if (endNewData > startData && endNewData <= endData) {
            console.log("-1-");
            const checkData = {
              ...newData,
              y: newData.y - (endNewData - startData),
            };
            if (canDrop(checkData)) return checkData;
          } else if (endNewData < startData) {
            console.log("-2-");
            // top postition - not collapse
            if (canDrop(newData)) return newData;
          } else {
            console.log("-3-");
            // full collapse
            return null;
          }
        } else if (startNewData >= startData) {
          console.log("collapse bottom", data.id);
          // collapse bottom
          if (endNewData > endData && startNewData < endData) {
            console.log("-1-");
            const checkData = {
              ...newData,
              y: newData.y + (endData - startNewData),
            };
            if (canDrop(checkData)) return checkData;
          } else if (startNewData >= endData) {
            console.log("-2-");
            // bottom postition - not collapse
            if (canDrop(newData)) return newData;
          } else {
            console.log("-3-");
            // full collapse in side
            return null;
          }
        }
      }
    }
    if (canDrop(newData)) return newData;
    return null;
  }

  const onDragStart: RndDragCallback = (e, data) => {
    console.log("onDragStart", data.node.id, e, data);
    setBoxBg("bg-red-200");
  };

  const onDragStop: RndDragCallback = (e, data) => {
    console.log("onDragStop", data.node.id, e, data);
    const newListOfMap = [...listOfMap].map((mapData) => {
      if (mapData.id === data.node.id) {
        const nextDay = checkDaydrop(data.x) ?? mapData.day;
        const newData = checkDropPosition({
          ...mapData,
          day: nextDay,
          y: data.y,
        });
        if (newData != null) {
          return newData;
        }
      }
      return mapData;
    });
    setListOfMap(newListOfMap);
    setBoxBg("bg-gray-200");
  };

  const onResizeStart: RndResizeStartCallback = (e, direction, ref) => {
    console.log("onResizeStart", ref.id, e, direction, ref);
  };

  const onResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position
  ) => {
    console.log("onResize", ref.id, e, direction, ref, delta, position);
    const newListOfMap = [...listOfMap].map((mapData) => {
      if (mapData.id === ref.id) {
        const newData = checkDropPosition({
          ...mapData,
          y: position.y < 0 ? 0 : position.y,
          h: mapData.h + delta.height,
        });
        if (newData != null) {
          return newData;
        }
      }
      return mapData;
    });
    setListOfMap(newListOfMap);
  };

  return (
    <div className=" w-screen h-screen bg-green-200 flex justify-center items-center gap-4">
      <div className={`w-[500px] h-[600px] relative ${boxBg}`}>
        {listOfMap.map((data) => {
          return (
            <RndDraggable
              key={`Map ${data.id}`}
              y={data.y}
              h={data.h}
              day={data.day}
              bg={data.bg}
              w={100}
              x={data.day * 100}
              onDragStart={onDragStart}
              onDragStop={onDragStop}
              onResizeStart={onResizeStart}
              onResizeStop={onResizeStop}
              id={data.id}>
              {`Data ${data.id}`}
            </RndDraggable>
          );
        })}
      </div>
    </div>
  );
}
