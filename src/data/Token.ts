import { Letter } from './Char';

export type TVar<N extends Letter> = `TVar(${N})`;

export type TLambda = 'TLambda';

export type TLeftPar = 'TLeftPar';

export type TRightPar = 'TRightPar';

export type TDot = 'TDot';

export type TSpace = 'TSpace';

export type Token =
  | TVar<Letter>
  | TLambda
  | TLeftPar
  | TRightPar
  | TDot
  | TSpace;
