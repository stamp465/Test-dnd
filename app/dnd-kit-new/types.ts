import { ReactNode } from "react";

export interface TimeDraggable {
  id: string;
  x: number;
  y: number;
  height: number;
  bg?: string;
  children?: ReactNode;
}
