import type { Abs, App, Expr, Param, Var } from './data/Expr';

type Substitute<
  N extends string,
  S extends Expr,
  E extends Expr
> = E extends Var<N>
  ? S
  : E extends Var<infer X>
  ? Var<X>
  : E extends Abs<N, infer Y>
  ? Abs<Param<E>, Y>
  : E extends Abs<infer X, infer Y>
  ? Abs<X, Substitute<N, S, Y>>
  : E extends App<infer X, infer Y>
  ? App<Substitute<N, S, X>, Substitute<N, S, Y>>
  : never;

export type Interp<E extends Expr> = E extends Var<infer X>
  ? Var<X>
  : E extends Abs<infer X, infer Y>
  ? Abs<X, Interp<Y>>
  : E extends App<Abs<infer X, infer Y>, infer Z>
  ? Substitute<X, Z, Y>
  : E extends App<infer X, infer Y>
  ? App<Interp<X>, Interp<Y>>
  : never;
