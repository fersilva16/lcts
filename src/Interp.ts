import type { EAbs, EApp, Expr, EVar } from './data/Expr';

type FV<Node extends Expr, Context extends string[] = []> = Node extends EVar<
  Context[number]
>
  ? never
  : Node extends EVar<infer Name>
  ? Name
  : Node extends EAbs<infer Param, infer Body>
  ? FV<Body, [...Context, Param]>
  : Node extends EApp<infer Func, infer Arg>
  ? FV<Func, Context> | FV<Arg, Context>
  : never;

type Conversion<
  Node extends Expr,
  Name extends string,
  NewName extends string
> = Node extends EVar<Name>
  ? EVar<NewName>
  : Node extends EAbs<Name, infer Body>
  ? EAbs<NewName, Conversion<Body, Name, NewName>>
  : Node extends EApp<infer Func, infer Arg>
  ? EApp<Conversion<Func, Name, NewName>, Conversion<Arg, Name, NewName>>
  : Node;

type Substitute<
  Node extends Expr,
  Name extends string,
  Value extends Expr
> = Node extends EVar<Name>
  ? Value
  : Node extends EAbs<Name, Expr>
  ? Node
  : Node extends EAbs<infer Param extends FV<Value>, any>
  ? Substitute<Conversion<Node, Param, `${Param}'`>, Name, Value>
  : Node extends EAbs<infer Param, infer Body>
  ? EAbs<Param, Substitute<Body, Name, Value>>
  : Node extends EApp<infer Func, infer Arg>
  ? EApp<Substitute<Func, Name, Value>, Substitute<Arg, Name, Value>>
  : Node;

export type Interp<Node extends Expr> = Node extends EAbs<
  infer Param,
  infer Boby
>
  ? EAbs<Param, Interp<Boby>>
  : Node extends EApp<EAbs<infer Param, infer Body>, infer Arg>
  ? Interp<Substitute<Body, Param, Arg>>
  : Node extends EApp<infer Func, infer Arg>
  ? Interp<Func> extends EAbs<string, Expr>
    ? Interp<EApp<Interp<Func>, Interp<Arg>>>
    : EApp<Interp<Func>, Interp<Arg>>
  : Node;
