import type { Equal, Expect } from '@type-challenges/utils';

import type { Abs, App, Var } from '../data/Expr';
import type {
  TDot,
  TLambda,
  TLeftPar,
  Token,
  TRightPar,
  TSpace,
  TVar,
} from '../data/Token';
import type { Parse } from '../Parse';
import { Tokenize } from '../Tokenize';

type TParse<S extends string> = Parse<Tokenize<S>>;

type Y = Var<'y'>;
type X = Var<'x'>;
type Id = Abs<'y', Y>;
type XApp = App<X, X>;
type XYApp = App<X, Y>;
type YAbs = Abs<'y', App<Y, Y>>;
type YCombinator = App<YAbs, YAbs>;

type cases = [
  Expect<Equal<TParse<'y'>, [Y, []]>>,
  Expect<Equal<TParse<'x'>, [X, []]>>,
  Expect<Equal<TParse<'(y)'>, [Y, []]>>,
  Expect<Equal<TParse<'λy.y'>, [Id, []]>>,
  Expect<Equal<TParse<'(λy.y)'>, [Id, []]>>,
  Expect<Equal<TParse<'y (λy.y)'>, [Abs<'y', Id>, []]>>,
  Expect<Equal<TParse<'(y) (λy.y)'>, [Abs<'y', Id>, []]>>,
  Expect<Equal<TParse<'y (x y)'>, [Abs<'y', XYApp>, []]>>,
  Expect<Equal<TParse<'(y) (x y)'>, [Abs<'y', XYApp>, []]>>,
  Expect<Equal<TParse<'x y'>, [XYApp, []]>>,
  Expect<Equal<TParse<'x (y)'>, [XYApp, []]>>,
  Expect<Equal<TParse<'(x) y'>, [XYApp, []]>>,
  Expect<Equal<TParse<'λy.y x'>, [App<Id, X>, []]>>,
  Expect<Equal<TParse<'λy.y λy.y'>, [App<Id, Id>, []]>>,
  Expect<Equal<TParse<'(x x) y'>, [App<XApp, Y>, []]>>,
  Expect<Equal<TParse<'y (x x)'>, [App<Y, XApp>, []]>>,
  Expect<Equal<TParse<'x λy.y'>, [App<X, Id>, []]>>,
  Expect<Equal<TParse<'(x x) (x x)'>, [App<XApp, XApp>, []]>>,
  Expect<Equal<TParse<'λy.y y'>, [YAbs, []]>>,
  Expect<Equal<TParse<'(λy.y y) λy.y y'>, [YCombinator, []]>>,
  Expect<Equal<TParse<'λx.λy.x x'>, [Abs<'x', Abs<'y', XApp>>, []]>>,
  Expect<Equal<TParse<'λx.(x λy.y)'>, [Abs<'x', App<X, Id>>, []]>>,
  Expect<Equal<TParse<'λx.(x (x y))'>, [Abs<'x', App<X, XYApp>>, []]>>
];
