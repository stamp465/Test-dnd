import { ReactNode } from "react";

export interface MapDraggable {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  bg?: string;
  children?: ReactNode;
}

export interface MapDraggableChildren extends MapDraggable {
  children?: ReactNode;
}
