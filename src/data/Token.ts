import type { CLetter } from './Char';

export type TkVar<N extends CLetter> = `Var(${N})`;

export type TkLambda = 'Lambda';

export type TkLeftPar = 'LeftPar';

export type TkRightPar = 'RightPar';

export type TkDot = 'Dot';

export type TkSpace = 'Space';

export type Token =
  | TkVar<CLetter>
  | TkLambda
  | TkLeftPar
  | TkRightPar
  | TkDot
  | TkSpace;
