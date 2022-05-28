import type { Equal, Expect } from '@type-challenges/utils';
import type { Abs, App, Var } from '../Expr';
import type { PrettyPrint } from '../PrettyPrint';

type Y = Var<'y'>;
type X = Var<'x'>;
type Id = Abs<'y', Y>;
type XApp = App<X, X>;
type XYApp = App<X, Y>;
type YAbs = Abs<'y', App<Y, Y>>;
type YCombinator = App<YAbs, YAbs>;

type cases = [
  Expect<Equal<PrettyPrint<Y>, 'y'>>,
  Expect<Equal<PrettyPrint<X>, 'x'>>,
  Expect<Equal<PrettyPrint<Id>, 'λy.y'>>,
  Expect<Equal<PrettyPrint<Abs<'y', Id>>, 'λy.λy.y'>>,
  Expect<Equal<PrettyPrint<Abs<'x', XYApp>>, 'λx.x y'>>,
  Expect<Equal<PrettyPrint<XYApp>, 'x y'>>,
  Expect<Equal<PrettyPrint<App<Id, X>>, '(λy.y) x'>>,
  Expect<Equal<PrettyPrint<App<Id, Id>>, '(λy.y) λy.y'>>,
  Expect<Equal<PrettyPrint<App<XApp, Y>>, '(x x) y'>>,
  Expect<Equal<PrettyPrint<App<XApp, XApp>>, '(x x) (x x)'>>,
  Expect<Equal<PrettyPrint<YAbs>, 'λy.y y'>>,
  Expect<Equal<PrettyPrint<YCombinator>, '(λy.y y) λy.y y'>>,
  Expect<Equal<PrettyPrint<Abs<'x', Abs<'y', XApp>>>, 'λx.λy.x x'>>
];
