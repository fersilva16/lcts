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

type TY = [TVar<'y'>];
type Y = Var<'y'>;

type TX = [TVar<'x'>];
type X = Var<'x'>;

type TAbs<E1 extends Token[], E2 extends Token[]> = [
  TLambda,
  ...E1,
  TDot,
  ...E2
];

type TId = TAbs<TY, TY>;
type Id = Abs<'y', Y>;

type TApp<E1 extends Token[], E2 extends Token[]> = [
  TLeftPar,
  ...E1,
  TRightPar,
  TSpace,
  ...E2
];

type TYAbs = TAbs<TY, TApp<TY, TY>>;
type YAbs = Abs<'y', App<Y, Y>>;

type TYCombinator = TApp<TYAbs, TYAbs>;
type YCombinator = App<YAbs, YAbs>;

type BetweenPar<T extends Token[]> = [TLeftPar, ...T, TRightPar];

type cases = [
  Expect<Equal<Parse<TY>, [Y, []]>>,
  Expect<Equal<Parse<BetweenPar<TY>>, [Y, []]>>,
  Expect<Equal<Parse<TId>, [Id, []]>>,
  Expect<Equal<Parse<BetweenPar<TId>>, [Id, []]>>,
  Expect<Equal<Parse<TApp<TId, TX>>, [App<Id, X>, []]>>,
  Expect<Equal<Parse<TYAbs>, [YAbs, []]>>,
  Expect<Equal<Parse<TYCombinator>, [YCombinator, []]>>
];
