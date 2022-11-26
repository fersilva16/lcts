import type { Equal, Expect } from '@type-challenges/utils';

import type { EAbs, EApp, EVar } from '../data/Expr';
import type { PrettyPrint } from '../PrettyPrint';

type Y = EVar<'y'>;
type X = EVar<'x'>;
type Id = EAbs<'y', Y>;
type XApp = EApp<X, X>;
type XYApp = EApp<X, Y>;
type YAbs = EAbs<'y', EApp<Y, Y>>;
type YCombinator = EApp<YAbs, YAbs>;

type cases = [
  Expect<Equal<PrettyPrint<Y>, 'y'>>,
  Expect<Equal<PrettyPrint<X>, 'x'>>,
  Expect<Equal<PrettyPrint<Id>, 'λy.y'>>,
  Expect<Equal<PrettyPrint<EAbs<'y', Id>>, 'λy.λy.y'>>,
  Expect<Equal<PrettyPrint<EAbs<'x', XYApp>>, 'λx.x y'>>,
  Expect<Equal<PrettyPrint<XYApp>, 'x y'>>,
  Expect<Equal<PrettyPrint<EApp<Id, X>>, '(λy.y) x'>>,
  Expect<Equal<PrettyPrint<EApp<Id, Id>>, '(λy.y) λy.y'>>,
  Expect<Equal<PrettyPrint<EApp<XApp, Y>>, '(x x) y'>>,
  Expect<Equal<PrettyPrint<EApp<Y, XApp>>, 'y (x x)'>>,
  Expect<Equal<PrettyPrint<EApp<X, Id>>, 'x λy.y'>>,
  Expect<Equal<PrettyPrint<EApp<XApp, XApp>>, '(x x) (x x)'>>,
  Expect<Equal<PrettyPrint<YAbs>, 'λy.y y'>>,
  Expect<Equal<PrettyPrint<YCombinator>, '(λy.y y) λy.y y'>>,
  Expect<Equal<PrettyPrint<EAbs<'x', EAbs<'y', XApp>>>, 'λx.λy.x x'>>,
  Expect<Equal<PrettyPrint<EAbs<'x', EApp<X, Id>>>, 'λx.(x λy.y)'>>,
  Expect<Equal<PrettyPrint<EAbs<'x', EApp<X, XYApp>>>, 'λx.(x (x y))'>>
];
