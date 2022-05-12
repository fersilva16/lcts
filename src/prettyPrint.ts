import type { Dot, Lambda, LeftPar, RightPar, Space } from './char';
import type { Abs, App, Expr, Var } from './expr';

export type PrettyPrint<E extends Expr> = E extends Var<infer N>
  ? N
  : E extends Abs<infer P, infer B>
  ? // @ts-expect-error
    `${Lambda}${P}${Dot}${LeftPar}${PrettyPrint<B>}${RightPar}`
  : E extends App<infer F, infer A>
  ? `${LeftPar}${PrettyPrint<F>}${RightPar}${Space}${LeftPar}${PrettyPrint<A>}${RightPar}`
  : never;
