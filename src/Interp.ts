import type { EAbs, EApp, Expr, EVar } from './data/Expr';
import { Overwrite } from './utils/Overwrite';

type Substitute<
  N extends string,
  E extends Expr,
  C extends Record<string, Expr>
> = E extends EVar<N>
  ? C[N]
  : E extends EAbs<infer P, infer B>
  ? EAbs<P, Substitute<N, B, Overwrite<C, P, EVar<P>>>>
  : E extends EApp<infer F, infer A>
  ? EApp<Substitute<N, F, C>, Substitute<N, A, C>>
  : E;

export type Interp<
  E extends Expr,
  C extends Record<string, Expr> = {}
> = E extends EVar<string>
  ? E
  : E extends EAbs<infer P, infer B>
  ? EAbs<P, Interp<B, C>>
  : E extends EApp<EAbs<infer P, infer B>, infer A>
  ? Interp<Substitute<P, B, Overwrite<C, P, A>>, Overwrite<C, P, A>>
  : E extends EApp<EVar<infer N>, infer A>
  ? EApp<EVar<N>, Interp<A, C>>
  : E extends EApp<infer F, infer A>
  ? Interp<EApp<Interp<F, C>, Interp<A, C>>, C>
  : never;
