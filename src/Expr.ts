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
