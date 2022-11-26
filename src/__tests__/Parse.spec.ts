import type { Equal, Expect } from '@type-challenges/utils';

import type { EAbs, EApp, EVar } from '../data/Expr';
import type { Parse } from '../Parse';
import type { Tokenize } from '../Tokenize';

type TParse<S extends string> = Parse<Tokenize<S>>;

type Y = EVar<'y'>;
type X = EVar<'x'>;
type Id = EAbs<'y', Y>;
type XApp = EApp<X, X>;
type XYApp = EApp<X, Y>;
type YAbs = EAbs<'y', EApp<Y, Y>>;
type YCombinator = EApp<YAbs, YAbs>;

type cases = [
  Expect<Equal<TParse<'y'>, [Y, []]>>,
  Expect<Equal<TParse<'x'>, [X, []]>>,
  Expect<Equal<TParse<'(y)'>, [Y, []]>>,
  Expect<Equal<TParse<'λy.y'>, [Id, []]>>,
  Expect<Equal<TParse<'(λy.y)'>, [Id, []]>>,
  Expect<Equal<TParse<'y (λy.y)'>, [EApp<EVar<'y'>, Id>, []]>>,
  Expect<Equal<TParse<'(λy.y) (y)'>, [EApp<Id, EVar<'y'>>, []]>>,
  Expect<Equal<TParse<'λy.y (y)'>, [EApp<Id, EVar<'y'>>, []]>>,
  Expect<Equal<TParse<'(y) (λy.y)'>, [EApp<EVar<'y'>, Id>, []]>>,
  Expect<Equal<TParse<'y (x y)'>, [EApp<EVar<'y'>, XYApp>, []]>>,
  Expect<Equal<TParse<'(y) (x y)'>, [EApp<EVar<'y'>, XYApp>, []]>>,
  Expect<Equal<TParse<'x y'>, [XYApp, []]>>,
  Expect<Equal<TParse<'x (y)'>, [XYApp, []]>>,
  Expect<Equal<TParse<'(x) y'>, [XYApp, []]>>,
  Expect<Equal<TParse<'λy.y x'>, [EAbs<'y', EApp<EVar<'y'>, EVar<'x'>>>, []]>>,
  Expect<Equal<TParse<'λy.y λy.y'>, [EApp<Id, Id>, []]>>,
  Expect<Equal<TParse<'λy.y (λy.y)'>, [EApp<Id, Id>, []]>>,
  Expect<Equal<TParse<'(x x) y'>, [EApp<XApp, Y>, []]>>,
  Expect<Equal<TParse<'y (x x)'>, [EApp<Y, XApp>, []]>>,
  Expect<Equal<TParse<'x λy.y'>, [EApp<X, Id>, []]>>,
  Expect<Equal<TParse<'(x x) (x x)'>, [EApp<XApp, XApp>, []]>>,
  Expect<Equal<TParse<'λy.y y'>, [YAbs, []]>>,
  Expect<Equal<TParse<'(λy.y y) λy.y y'>, [YCombinator, []]>>,
  Expect<Equal<TParse<'λx.λy.x x'>, [EAbs<'x', EAbs<'y', XApp>>, []]>>,
  Expect<Equal<TParse<'λx.(x λy.y)'>, [EAbs<'x', EApp<X, Id>>, []]>>,
  Expect<Equal<TParse<'λx.(x (x y))'>, [EAbs<'x', EApp<X, XYApp>>, []]>>
];
