import type { EAbs, EApp, Expr, EVar } from './data/Expr';
import { Assert } from './utils/Assert';
import { Overwrite } from './utils/Overwrite';

type Substitute<
  N extends string,
  E extends Expr,
  C extends Record<string, Expr>
> = E extends EVar<N>
  ? C[N]
  : E extends EAbs<infer X, infer Y>
  ? EAbs<X, Substitute<N, Y, Overwrite<C, X, EVar<X>>>>
  : E extends EApp<infer X, infer Y>
  ? EApp<Substitute<N, X, C>, Substitute<N, Y, C>>
  : E;

export type Interp<E extends Expr, C extends Record<string, Expr> = {}> = E extends EVar<infer X>
  ? EVar<X>
  : E extends EAbs<infer X, infer Y>
  ? EAbs<X, Interp<Y>>
  : E extends EApp<EAbs<infer X, infer Y>, infer Z>
  ? Interp<Substitute<X, Y, Overwrite<C, X, Z>>>
  : E extends EApp<infer X, infer Y>
  ? EApp<Interp<X>, Interp<Y>>
  : never;
