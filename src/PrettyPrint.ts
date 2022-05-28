import type { Dot, Lambda, LeftPar, RightPar, Space } from './Char';
import type { Abs, App, Arg, Expr, Func, Var } from './Expr';

export type PrettyPrint<E extends Expr> = E extends Var<infer N>
  ? N
  : E extends Abs<infer P, infer B>
  ? // @ts-expect-error
    `${Lambda}${P}${Dot}${PrettyPrint<B>}`
  : E extends App<App<Expr, Expr>, App<Expr, Expr>>
  ? `${LeftPar}${PrettyPrint<
      Func<E>
    >}${RightPar}${Space}${LeftPar}${PrettyPrint<Arg<E>>}${RightPar}`
  : E extends App<Abs<string, Expr> | App<Expr, Expr>, infer A>
  ? `${LeftPar}${PrettyPrint<Func<E>>}${RightPar}${Space}${PrettyPrint<A>}`
  : E extends App<infer F, infer A>
  ? `${PrettyPrint<F>}${Space}${PrettyPrint<A>}`
  : never;
