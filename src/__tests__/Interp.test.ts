import type { Equal, Expect } from '@type-challenges/utils';
import type { Abs, App, Var } from '../Expr';
import type { Interp } from '../Interp';

type cases = [
  Expect<Equal<Interp<Var<'y'>>, Var<'y'>>>,
  Expect<Equal<Interp<Abs<'y', Var<'y'>>>, Abs<'y', Var<'y'>>>>,
  Expect<Equal<Interp<App<Abs<'x', Var<'x'>>, Var<'y'>>>, Var<'y'>>>
];
