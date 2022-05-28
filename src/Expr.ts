export type Var<N extends string> = {
  type: 'Var';
  name: N;
};

export type Abs<P extends string, B extends Expr> = {
  type: 'Abs';
  param: P;
  body: B;
};

export type App<F extends Expr, A extends Expr> = {
  type: 'App';
  func: F;
  arg: A;
};

export type Expr = Var<any> | Abs<any, any> | App<any, any>;

export type Name<A extends Var<string>> = A['name'];

export type Param<A extends Abs<string, Expr>> = A['param'];

export type Body<A extends Abs<string, Expr>> = A['body'];

export type Func<A extends App<Expr, Expr>> = A['func'];

export type Arg<A extends App<Expr, Expr>> = A['arg'];
