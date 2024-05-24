import type { EAbs, EApp, Expr, EVar } from './data/Expr';
import type {
  TkDot,
  TkLambda,
  TkLeftPar,
  Token,
  TkRightPar,
  TkVar,
} from './data/Token';
import type { TakeLast } from './utils/TakeLast';

type ParseState = Array<Token | Expr>;

type ParseVar<State extends ParseState> = State extends [TkVar<infer Name>]
  ? EVar<Name>
  : never;

type ParseAbs<
  State extends ParseState,
  Tokens extends Token[]
> = State extends [TkLambda, EVar<infer Param>, TkDot, infer Body extends Expr]
  ? Tokens[0] extends TkVar<any> | TkLambda | TkLeftPar
    ? never
    : EAbs<Param, Body>
  : never;

type ParseApp<State extends ParseState> = State extends [
  infer Func extends Expr,
  infer Arg extends Expr
]
  ? EApp<Func, Arg>
  : never;

type ParseParen<S extends ParseState> = S extends [
  TkLeftPar,
  infer Node extends Expr,
  TkRightPar
]
  ? Node
  : never;

type ParseExpr<State extends ParseState, Tokens extends Token[]> =
  | ParseParen<State>
  | ParseApp<State>
  | ParseAbs<State, Tokens>
  | ParseVar<State>;

type Reduce<
  State extends ParseState,
  FinalState extends ParseState,
  Tokens extends Token[]
> = State['length'] extends 0
  ? [FinalState, Tokens]
  : TakeLast<State> extends [
      infer Rest extends ParseState,
      infer Node extends Token | Expr
    ]
  ? ParseExpr<[Node, ...FinalState], Tokens> extends never
    ? Reduce<Rest, [Node, ...FinalState], Tokens>
    : Reduce<[...Rest, ParseExpr<[Node, ...FinalState], Tokens>], [], Tokens>
  : [FinalState, Tokens];

type Shift<State extends ParseState, Tokens extends Token[]> = Tokens extends [
  infer FirstToken extends Token,
  ...infer Rest extends Token[]
]
  ? Reduce<[...State, FirstToken], [], Rest> extends [
      infer Nodes extends ParseState,
      infer Tokens extends Token[]
    ]
    ? Shift<Nodes, Tokens>
    : never
  : State['length'] extends 1
  ? [State[0], []]
  : never;

export type Parse<Tokens extends Token[]> = Shift<[], Tokens>;
