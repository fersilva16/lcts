import type { Dot, Lambda, LeftPar, RightPar, Space } from './data/Char';
import type { Abs, App, Arg, Body, Expr, Func, Var } from './data/Expr';

export type PrettyPrint<E extends Expr> = E extends Var<infer N>
  ? N
  : E extends Abs<infer P, App<Var<string>, Var<string>>>
  ? // @ts-expect-error
    `${Lambda}${P}${Dot}${PrettyPrint<Body<E>>}`
  : E extends Abs<infer P, App<Expr, Expr>>
  ? `${Lambda}${P}${Dot}${LeftPar}${PrettyPrint<Body<E>>}${RightPar}`
  : E extends Abs<infer P, infer B>
  ? `${Lambda}${P}${Dot}${PrettyPrint<B>}`
  : E extends App<App<Expr, Expr>, App<Expr, Expr>>
  ? `${LeftPar}${PrettyPrint<
      Func<E>
    >}${RightPar}${Space}${LeftPar}${PrettyPrint<Arg<E>>}${RightPar}`
  : E extends App<Var<string>, App<Expr, Expr>>
  ? `${PrettyPrint<Func<E>>}${Space}${LeftPar}${PrettyPrint<Arg<E>>}${RightPar}`
  : E extends App<Abs<string, Expr> | App<Expr, Expr>, infer A>
  ? `${LeftPar}${PrettyPrint<Func<E>>}${RightPar}${Space}${PrettyPrint<A>}`
  : E extends App<infer F, infer A>
  ? `${PrettyPrint<F>}${Space}${PrettyPrint<A>}`
  : never;
