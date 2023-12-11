import type {
  EAbs,
  EApp,
  GetEArg,
  GetEBody,
  Expr,
  GetEFunc,
  EVar,
} from './data/Expr';

export type PrettyPrint<E extends Expr> = E extends EVar<infer N>
  ? N
  : E extends EAbs<infer P, EApp<EVar<string>, EVar<string>>>
  ? // @ts-ignore
    `λ${P}.${PrettyPrint<GetEBody<E>>}`
  : E extends EAbs<infer P, EApp<Expr, Expr>>
  ? `λ${P}.(${PrettyPrint<GetEBody<E>>})`
  : E extends EAbs<infer P, infer B>
  ? `λ${P}.${PrettyPrint<B>}`
  : E extends EApp<EApp<Expr, Expr>, EApp<Expr, Expr>>
  ? `(${PrettyPrint<GetEFunc<E>>}) (${PrettyPrint<GetEArg<E>>})`
  : E extends EApp<EVar<string>, EApp<Expr, Expr>>
  ? `${PrettyPrint<GetEFunc<E>>} (${PrettyPrint<GetEArg<E>>})`
  : E extends EApp<EAbs<string, Expr> | EApp<Expr, Expr>, infer A>
  ? `(${PrettyPrint<GetEFunc<E>>}) ${PrettyPrint<A>}`
  : E extends EApp<infer F, infer A>
  ? `${PrettyPrint<F>} ${PrettyPrint<A>}`
  : never;
