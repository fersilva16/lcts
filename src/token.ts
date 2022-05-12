import { Letter } from './char';

export type TVar<N extends Letter> = `TVar(${N})`;

export type TLambda = 'λ';

export type TLeftPar = '(';

export type TRightPar = ')';

export type TDot = '.';

export type TSpace = ' ';

export type Token =
  | TVar<Letter>
  | TLambda
  | TLeftPar
  | TRightPar
  | TDot
  | TSpace;
