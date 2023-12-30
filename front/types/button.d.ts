// export type DigicamDB = Record<string, string>;

// export interface DpreviewNews {
//   link: string;
//   title: string;
// }

// export const GRADE = {
//   FLAGSHIP: 'FLAGSHIP',
//   PROFESSIONAL: 'PROFESSIONAL',
//   ADVANCED: 'ADVANCED',
//   MIDRANGE: 'MIDRANGE',
//   ENTRYMID: 'ENTRYMID',
//   ENTRY: 'ENTRY',
//   VALUE: 'VALUE',
// } as const;

import { CSSProperties } from "react";

export interface IStyledButton {
  color?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  borderRadius?: string;
  backgroundColor?: string;
  customStyle?: CSSProperties;
}

export interface IButton {
  width?: string;
  height?: string;
  content: string;
  fontSize?: string;
  color?: string;
  borderRadius?: string;
  backgroundColor?: string;
  customStyle?: CSSProperties;
  handleClick?: () => void | Promise<void>;
}
