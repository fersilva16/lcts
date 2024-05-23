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
import type { TakeLast } from './utils/TakeLast';

type State = Array<Token | Expr>;

type ParseVar<S extends State> = S extends [TkVar<infer N>] ? EVar<N> : never;

type ParseAbs<S extends State, TS extends Token[]> = S extends [
  TkLambda,
  EVar<infer P>,
  TkDot,
  infer B extends Expr
]
  ? TS[0] extends TkSpace
    ? TS[1] extends TkLambda
      ? EAbs<P, B>
      : TS[1] extends TkLeftPar
      ? EAbs<P, B>
      : never
    : EAbs<P, B>
  : never;

type ParseApp<S extends State> = S extends [
  infer F extends Expr,
  TkSpace,
  infer A extends Expr
]
  ? EApp<F, A>
  : never;

type ParseParen<S extends State> = S extends [
  TkLeftPar,
  infer T extends Expr,
  TkRightPar
]
  ? T
  : never;

type ParseExpr<S extends State, TS extends Token[]> =
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
  : TakeLast<S> extends [infer LS extends State, infer L extends Token | Expr]
  ? ParseExpr<[L, ...CS], TS> extends never
    ? Reduce<LS, [L, ...CS], TS>
    : Reduce<[...LS, ParseExpr<[L, ...CS], TS>], [], TS>
  : [CS, TS];

type Shift<S extends State, TS extends Token[]> = TS extends [
  infer T extends Token,
  ...infer R extends Token[]
]
  ? Reduce<[...S, T], [], R> extends [
      infer NS extends State,
      infer NTS extends Token[]
    ]
    ? Shift<NS, NTS>
    : never
  : S['length'] extends 1
  ? [S[0], []]
  : never;

export type Parse<TS extends Token[]> = Shift<[], TS>;
