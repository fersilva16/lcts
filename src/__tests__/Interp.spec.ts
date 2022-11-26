import type { Equal, Expect } from '@type-challenges/utils';

import type { EAbs, EApp, EVar } from '../data/Expr';
import type { Interp } from '../Interp';

type cases = [
  Expect<Equal<Interp<EVar<'y'>>, EVar<'y'>>>,
  Expect<Equal<Interp<EAbs<'y', EVar<'y'>>>, EAbs<'y', EVar<'y'>>>>,
  Expect<Equal<Interp<EApp<EAbs<'x', EVar<'x'>>, EVar<'y'>>>, EVar<'y'>>>
];
