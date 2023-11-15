import { CSSProperties } from "react";

export interface IStyledTitle {
  customStyle?: CSSProperties;
}

export interface ITitle {
  content: string;
  customStyle?: CSSProperties;
}
