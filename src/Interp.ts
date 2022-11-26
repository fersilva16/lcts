import type { EAbs, EApp, Expr, EParam, EVar } from './data/Expr';

type Substitute<
  N extends string,
  S extends Expr,
  E extends Expr
> = E extends EVar<N>
  ? S
  : E extends EVar<infer X>
  ? EVar<X>
  : E extends EAbs<N, infer Y>
  ? EAbs<EParam<E>, Y>
  : E extends EAbs<infer X, infer Y>
  ? EAbs<X, Substitute<N, S, Y>>
  : E extends EApp<infer X, infer Y>
  ? EApp<Substitute<N, S, X>, Substitute<N, S, Y>>
  : never;

export type Interp<E extends Expr> = E extends EVar<infer X>
  ? EVar<X>
  : E extends EAbs<infer X, infer Y>
  ? EAbs<X, Interp<Y>>
  : E extends EApp<EAbs<infer X, infer Y>, infer Z>
  ? Substitute<X, Z, Y>
  : E extends EApp<infer X, infer Y>
  ? EApp<Interp<X>, Interp<Y>>
  : never;
