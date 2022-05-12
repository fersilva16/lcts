import type { Equal, Expect, NotEqual } from '@type-challenges/utils';
import type { Abs, App, Var } from '../expr';
import type { Interp } from '../interp';

type cases = [
  Expect<Equal<Interp<Var<'y'>>, Var<'y'>>>,
  Expect<Equal<Interp<Abs<'y', Var<'y'>>>, Abs<'y', Var<'y'>>>>,
  Expect<Equal<Interp<App<Abs<'x', Var<'x'>>, Var<'y'>>>, Var<'y'>>>
];
