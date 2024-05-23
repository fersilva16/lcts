import type { EAbs, EApp, Expr, EVar } from './data/Expr';

type FV<E extends Expr, C extends string[] = []> = E extends EVar<C[number]>
  ? []
  : E extends EVar<infer N>
  ? [N]
  : E extends EAbs<infer P, infer B>
  ? FV<B, [...C, P]>
  : E extends EApp<infer F, infer A>
  ? [...FV<F, C>, ...FV<A, C>]
  : [];

type Conversion<
  E extends Expr,
  N extends string,
  X extends string
> = E extends EVar<N>
  ? EVar<X>
  : E extends EAbs<N, infer B>
  ? EAbs<X, Conversion<B, N, X>>
  : E extends EApp<infer F, infer A>
  ? EApp<Conversion<F, N, X>, Conversion<A, N, X>>
  : E;

type Substitute<
  E extends Expr,
  N extends string,
  V extends Expr
> = E extends EVar<N>
  ? V
  : E extends EAbs<N, Expr>
  ? E
  : E extends EAbs<infer P extends FV<V>[number], any>
  ? Substitute<Conversion<E, P, `${P}'`>, N, V>
  : E extends EAbs<infer P, infer B>
  ? EAbs<P, Substitute<B, N, V>>
  : E extends EApp<infer F, infer A>
  ? EApp<Substitute<F, N, V>, Substitute<A, N, V>>
  : E;

export type Interp<E extends Expr> = E extends EAbs<infer P, infer B>
  ? EAbs<P, Interp<B>>
  : E extends EApp<EAbs<infer P, infer B>, infer A>
  ? Interp<Substitute<B, P, A>>
  : E extends EApp<infer F, infer A>
  ? Interp<F> extends EAbs<string, Expr>
    ? Interp<EApp<Interp<F>, Interp<A>>>
    : EApp<Interp<F>, Interp<A>>
  : E;
