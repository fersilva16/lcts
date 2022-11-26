export type EVar<N extends string> = {
  type: 'Var';
  name: N;
};

export type EAbs<P extends string, B extends Expr> = {
  type: 'Abs';
  param: P;
  body: B;
};

export type EApp<F extends Expr, A extends Expr> = {
  type: 'App';
  func: F;
  arg: A;
};

export type Expr = EVar<any> | EAbs<any, any> | EApp<any, any>;

export type EName<A extends EVar<string>> = A['name'];

export type EParam<A extends EAbs<string, Expr>> = A['param'];

export type EBody<A extends EAbs<string, Expr>> = A['body'];

export type EFunc<A extends EApp<Expr, Expr>> = A['func'];

export type EArg<A extends EApp<Expr, Expr>> = A['arg'];
