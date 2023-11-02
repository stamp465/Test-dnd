"use client";

import { useState } from "react";
import { Resizable } from "re-resizable";
export default function ResizableComponent(props: any) {
  const [height, setHight] = useState<number>(200);

  return (
    <Resizable
      style={{ border: "1px solid black" }}
      size={{ width: 200, height: height }}
      enable={{
        top: true,
        bottom: true,
      }}
      onResizeStop={(ev, direction, elementRef, delta) => {
        console.log(ev);
        console.log(direction);
        console.log(elementRef);
        console.log(delta);

        setHight((prev) => prev + delta.height);
      }}>
      {props.children}
    </Resizable>
  );
}
