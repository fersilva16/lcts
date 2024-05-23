import type { EAbs, EApp, Expr, EVar } from './data/Expr';

export type PrettyPrint<E extends Expr> = E extends EVar<infer N>
  ? N
  : E extends EAbs<infer P, infer B extends EApp<EVar<string>, EVar<string>>>
  ? `λ${P}.${PrettyPrint<B>}`
  : E extends EAbs<infer P, infer B extends EApp<Expr, Expr>>
  ? `λ${P}.(${PrettyPrint<B>})`
  : E extends EAbs<infer P, infer B>
  ? `λ${P}.${PrettyPrint<B>}`
  : E extends EApp<
      infer F extends EApp<Expr, Expr>,
      infer A extends EApp<Expr, Expr>
    >
  ? `(${PrettyPrint<F>}) (${PrettyPrint<A>})`
  : E extends EApp<
      infer F extends EVar<string>,
      infer A extends EApp<Expr, Expr>
    >
  ? `${PrettyPrint<F>} (${PrettyPrint<A>})`
  : E extends EApp<
      infer F extends EAbs<string, Expr> | EApp<Expr, Expr>,
      infer A
    >
  ? `(${PrettyPrint<F>}) ${PrettyPrint<A>}`
  : E extends EApp<infer F, infer A>
  ? `${PrettyPrint<F>} ${PrettyPrint<A>}`
  : never;
