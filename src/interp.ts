import type { Abs, App, Expr, Var } from './expr';

type Substitute<
  N extends string,
  S extends string,
  E extends Expr
> = E extends Var<infer X>
  ? X extends N
    ? S
    : Var<X>
  : E extends Abs<infer X, infer Y>
  ? X extends N
    ? Abs<X, Y>
    : // @ts-expect-error
      Abs<X, Substitute<N, S, Y>>
  : E extends App<infer X, infer Y>
  ? App<Substitute<N, S, X>, Substitute<N, S, Y>>
  : never;

export type Interp<E extends Expr> = E extends Var<infer X>
  ? Var<X>
  : E extends Abs<infer X, infer Y>
  ? // @ts-expect-error
    Abs<X, Interp<Y>>
  : E extends App<Abs<infer X, infer Y>, infer Z>
  ? Substitute<X, Z, Y>
  : E extends App<infer X, infer Y>
  ? App<Interp<X>, Interp<Y>>
  : never;
