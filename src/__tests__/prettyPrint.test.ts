import type { Equal, Expect } from '@type-challenges/utils';
import type { Abs, App, Var } from '../expr';
import type { PrettyPrint } from '../prettyPrint';

type Y = Var<'y'>;
type X = Var<'x'>;
type Id = Abs<'y', Y>;
type YAbs = Abs<'y', App<Y, Y>>;
type YCombinator = App<YAbs, YAbs>;

type cases = [
  Expect<Equal<PrettyPrint<Y>, 'y'>>,
  Expect<Equal<PrettyPrint<X>, 'x'>>,
  Expect<Equal<PrettyPrint<Id>, 'λy.(y)'>>,
  Expect<Equal<PrettyPrint<App<Id, X>>, '(λy.(y)) (x)'>>,
  Expect<Equal<PrettyPrint<YAbs>, 'λy.((y) (y))'>>
  // Expect<Equal<PrettyPrint<YCombinator>, '(λy.((y) (y))) (λy.((y) (y)))'>> -- It's breaking
];
