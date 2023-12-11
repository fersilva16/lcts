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

export type GetEName<A extends EVar<string>> = A['name'];

export type GetEParam<A extends EAbs<string, Expr>> = A['param'];

export type GetEBody<A extends EAbs<string, Expr>> = A['body'];

export type GetEFunc<A extends EApp<Expr, Expr>> = A['func'];

export type GetEArg<A extends EApp<Expr, Expr>> = A['arg'];
