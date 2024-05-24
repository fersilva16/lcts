import type { EAbs, EApp, Expr, EVar } from './data/Expr';

export type PrettyPrint<Node extends Expr> = Node extends EVar<infer Name>
  ? Name
  : Node extends EAbs<
      infer Param,
      infer Body extends EApp<EVar<string>, EVar<string>>
    >
  ? `λ${Param}.${PrettyPrint<Body>}`
  : Node extends EAbs<infer Param, infer Body extends EApp<Expr, Expr>>
  ? `λ${Param}.(${PrettyPrint<Body>})`
  : Node extends EAbs<infer Param, infer Body>
  ? `λ${Param}.${PrettyPrint<Body>}`
  : Node extends EApp<
      infer Func extends EApp<Expr, Expr>,
      infer Arg extends EApp<Expr, Expr>
    >
  ? `(${PrettyPrint<Func>}) (${PrettyPrint<Arg>})`
  : Node extends EApp<
      infer Func extends EVar<string>,
      infer Arg extends EApp<Expr, Expr>
    >
  ? `${PrettyPrint<Func>} (${PrettyPrint<Arg>})`
  : Node extends EApp<
      infer Func extends EAbs<string, Expr> | EApp<Expr, Expr>,
      infer Arg
    >
  ? `(${PrettyPrint<Func>}) ${PrettyPrint<Arg>}`
  : Node extends EApp<infer Func, infer Arg>
  ? `${PrettyPrint<Func>} ${PrettyPrint<Arg>}`
  : never;
