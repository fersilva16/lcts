import type { CDot, CLambda, CLeftPar, CRightPar, CSpace } from './data/Char';
import type { EAbs, EApp, EArg, EBody, Expr, EFunc, EVar } from './data/Expr';

export type PrettyPrint<E extends Expr> = E extends EVar<infer N>
  ? N
  : E extends EAbs<infer P, EApp<EVar<string>, EVar<string>>>
  ? `${CLambda}${P}${CDot}${PrettyPrint<EBody<E>>}`
  : E extends EAbs<infer P, EApp<Expr, Expr>>
  ? `${CLambda}${P}${CDot}${CLeftPar}${PrettyPrint<EBody<E>>}${CRightPar}`
  : E extends EAbs<infer P, infer B>
  ? `${CLambda}${P}${CDot}${PrettyPrint<B>}`
  : E extends EApp<EApp<Expr, Expr>, EApp<Expr, Expr>>
  ? `${CLeftPar}${PrettyPrint<
      EFunc<E>
    >}${CRightPar}${CSpace}${CLeftPar}${PrettyPrint<EArg<E>>}${CRightPar}`
  : E extends EApp<EVar<string>, EApp<Expr, Expr>>
  ? `${PrettyPrint<EFunc<E>>}${CSpace}${CLeftPar}${PrettyPrint<
      EArg<E>
    >}${CRightPar}`
  : E extends EApp<EAbs<string, Expr> | EApp<Expr, Expr>, infer A>
  ? `${CLeftPar}${PrettyPrint<EFunc<E>>}${CRightPar}${CSpace}${PrettyPrint<A>}`
  : E extends EApp<infer F, infer A>
  ? `${PrettyPrint<F>}${CSpace}${PrettyPrint<A>}`
  : never;
