import { ReactNode } from "react";
import {
  RndDragCallback,
  RndResizeCallback,
  RndResizeStartCallback,
} from "react-rnd";

export interface MapDraggable {
  id: string;
  day: number;
  y: number;
  h: number;
  bg?: string;
  children?: ReactNode;
}

export interface MapDraggableChildren extends MapDraggable {
  w: number;
  x: number;
  children?: ReactNode;
  onDragStart: RndDragCallback;
  onDragStop: RndDragCallback;
  onResizeStart: RndResizeStartCallback;
  onResizeStop: RndResizeCallback;
}
