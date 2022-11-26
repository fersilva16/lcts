import type { EAbs, EApp, Expr, EVar } from './data/Expr';
import type {
  TkDot,
  TkLambda,
  TkLeftPar,
  Token,
  TkRightPar,
  TkSpace,
  TkVar,
} from './data/Token';
import type { Assert } from './utils/Assert';
import type { TakeLast } from './utils/TakeLast';

type State = Array<Token | Expr>;

type ParseVar<S extends State> = S extends [TkVar<infer N>] ? EVar<N> : never;

type ParseAbs<S extends State, TS extends Token[]> = S extends [
  TkLambda,
  EVar<infer P>,
  TkDot,
  Expr
]
  ? TS[0] extends TkSpace
    ? TS[1] extends TkLambda
      ? EAbs<P, Assert<S[3], Expr>>
      : TS[1] extends TkLeftPar
      ? EAbs<P, Assert<S[3], Expr>>
      : never
    : EAbs<P, Assert<S[3], Expr>>
  : never;

type ParseApp<S extends State> = S extends [Expr, TkSpace, Expr]
  ? EApp<Assert<S[0], Expr>, Assert<S[2], Expr>>
  : never;

type ParseParen<S extends State> = S extends [TkLeftPar, Expr, TkRightPar]
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
