import type {
  TDot,
  TLambda,
  TLeftPar,
  Token,
  TRightPar,
  TSpace,
  TVar,
} from './token';
import type { Abs, App, Expr, Var } from './expr';

export type Assert<X, T> = X extends T ? X : never;

export type ParseVar<TS extends Token[]> = TS extends [
  TVar<infer N>,
  ...infer R
]
  ? [Var<N>, R]
  : never;

export type ParseAbs<TS extends Token[]> = TS extends [
  TLambda,
  TVar<infer N>,
  TDot,
  ...infer R1
]
  ? Parse<Assert<R1, Token[]>> extends [infer E, infer R2]
    ? [Abs<N, Assert<E, Expr>>, R2]
    : never
  : never;

export type ParseApp<TS extends Token[]> = TS extends [TLeftPar, ...infer R1]
  ? Parse<Assert<R1, Token[]>> extends [infer E1, infer R2]
    ? R2 extends [TRightPar, TSpace, ...infer R3]
      ? Parse<Assert<R3, Token[]>> extends [infer E2, infer R4]
        ? [App<Assert<E1, Expr>, Assert<E2, Expr>>, R4]
        : never
      : never
    : never
  : never;

export type ParsePar<TS extends Token[]> = TS extends [TLeftPar, ...infer R1]
  ? Parse<Assert<R1, Token[]>> extends [infer E, infer R2]
    ? R2 extends [TRightPar, ...infer R3]
      ? [E, R3]
      : never
    : never
  : never;

export type Parse<TS extends Token[]> = ParseVar<TS> extends never
  ? ParseAbs<TS> extends never
    ? ParseApp<TS> extends never
      ? ParsePar<TS> extends never
        ? never
        : ParsePar<TS>
      : ParseApp<TS>
    : ParseAbs<TS>
  : ParseVar<TS>;
