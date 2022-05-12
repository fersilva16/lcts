export type Var<N extends string> = `Var ${N}`;

export type Abs<P extends string, B extends Expr> = `Abs ${P} (${B})`;

export type App<F extends Expr, A extends Expr> = `App (${F}) (${A})`;

export type Expr = Var<any> | Abs<any, any> | App<any, any>;
