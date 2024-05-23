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
