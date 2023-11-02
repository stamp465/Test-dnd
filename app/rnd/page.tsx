"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";

export default function Page() {
  const [cn1, setCn1] = useState("");
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
  } as const;

  return (
    <div className=" w-screen h-screen bg-green-200 flex justify-center items-center gap-4">
      <div className="w-[500px] h-[600px] bg-gray-200 relative">
        <Rnd
          className={cn1}
          bounds={"parent"}
          style={style}
          onDragStart={(e, d) => {
            setCn1("absolute z-40");
          }}
          onDragStop={(e, d) => {
            console.log("onDrag", e, d);
            setCn1("");
          }}
          onResizeStop={(e, d) => {
            console.log("onResize", e, d);
          }}
          default={{
            x: 0,
            y: 0,
            width: 200,
            height: 200,
          }}>
          Rnd1
        </Rnd>

        <Rnd
          bounds={"parent"}
          style={style}
          onDragStop={(e, d) => {
            console.log("onDrag", e, d);
          }}
          onResizeStop={(e, d) => {
            console.log("onResize", e, d);
          }}
          default={{
            x: 300,
            y: 0,
            width: 100,
            height: 100,
          }}>
          Rnd2
        </Rnd>

        <Rnd
          bounds={"parent"}
          style={style}
          onDragStop={(e, d) => {
            console.log("onDrag", e, d);
          }}
          onResizeStop={(e, d) => {
            console.log("onResize", e, d);
          }}
          default={{
            x: 300,
            y: 300,
            width: 100,
            height: 100,
          }}>
          Rnd3
        </Rnd>
      </div>
    </div>
  );
}
