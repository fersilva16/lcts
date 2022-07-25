import type { Abs, App, Expr, Var } from './data/Expr';
import type {
  TDot,
  TLambda,
  TLeftPar,
  Token,
  TRightPar,
  TSpace,
  TVar,
} from './data/Token';
import type { Assert } from './utils/Assert';
import type { TakeLast } from './utils/TakeLast';

type State = Array<Token | Expr>;

type ParseVar<S extends State> = S extends [TVar<infer N>] ? Var<N> : never;

type ParseAbs<S extends State, TS extends Token[]> = S extends [
  TLambda,
  Var<infer P>,
  TDot,
  Expr
]
  ? TS[0] extends TSpace
    ? TS[1] extends TLambda
      ? Abs<P, Assert<S[3], Expr>>
      : TS[1] extends TLeftPar
      ? Abs<P, Assert<S[3], Expr>>
      : never
    : Abs<P, Assert<S[3], Expr>>
  : never;

type ParseApp<S extends State> = S extends [Expr, TSpace, Expr]
  ? App<Assert<S[0], Expr>, Assert<S[2], Expr>>
  : never;

type ParseParen<S extends State> = S extends [TLeftPar, Expr, TRightPar]
  ? S[1]
  : never;

type TryParse<S extends State, TS extends Token[]> =
  | ParseParen<S>
  | ParseApp<S>
  | ParseAbs<S, TS>
  | ParseVar<S>;

type Reduce<
  S extends State,
  CS extends State,
  TS extends Token[]
> = S['length'] extends 0
  ? [CS, TS]
  : TakeLast<S> extends [infer LS, infer L]
  ? TryParse<Assert<[L, ...CS], State>, TS> extends never
    ? Reduce<Assert<LS, State>, Assert<[L, ...CS], State>, TS>
    : Reduce<
        [...Assert<LS, State>, TryParse<Assert<[L, ...CS], State>, TS>],
        [],
        TS
      >
  : [CS, TS];

type Shift<S extends State, TS extends Token[]> = TS extends [
  infer T,
  ...infer R
]
  ? Reduce<Assert<[...S, T], State>, [], Assert<R, Token[]>> extends [
      infer NS,
      infer NTS
    ]
    ? Shift<Assert<NS, State>, Assert<NTS, Token[]>>
    : never
  : S['length'] extends 1
  ? [S[0], []]
  : never;

export type Parse<TS extends Token[]> = Shift<[], TS>;
