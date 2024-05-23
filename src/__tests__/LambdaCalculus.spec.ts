import type { Equal, Expect } from '@type-challenges/utils';

import type { LambdaCalculus } from '..';

type cases = [
  Expect<Equal<LambdaCalculus<'y'>, 'y'>>,
  Expect<Equal<LambdaCalculus<'x'>, 'x'>>,
  Expect<Equal<LambdaCalculus<'λy.y'>, 'λy.y'>>,
  Expect<Equal<LambdaCalculus<'λy.λy.y'>, 'λy.λy.y'>>,
  Expect<Equal<LambdaCalculus<'λy.y y'>, 'λy.y y'>>,
  Expect<Equal<LambdaCalculus<'λy.y λy.y y'>, 'λy.(y λy.y y)'>>,
  Expect<Equal<LambdaCalculus<'λy.y (λy.y y)'>, 'λy.(y λy.y y)'>>,
  Expect<Equal<LambdaCalculus<'x y'>, 'x y'>>,
  Expect<Equal<LambdaCalculus<'x λy.y'>, 'x λy.y'>>,
  Expect<Equal<LambdaCalculus<'y (x x)'>, 'y (x x)'>>,
  Expect<Equal<LambdaCalculus<'(x x) y'>, '(x x) y'>>,
  Expect<Equal<LambdaCalculus<'(x x) (x x)'>, '(x x) (x x)'>>,
  Expect<Equal<LambdaCalculus<'(λy.y) x'>, 'x'>>,
  Expect<Equal<LambdaCalculus<'(λy.y) λy.y'>, 'λy.y'>>,
  Expect<Equal<LambdaCalculus<'(λx.x y) (λx.x)'>, 'y'>>,
  Expect<Equal<LambdaCalculus<'λx.(λy.x) z'>, 'λx.x'>>,
  Expect<Equal<LambdaCalculus<'((λx.x) (λx.y x)) x'>, 'y x'>>,
  Expect<Equal<LambdaCalculus<'(λx.λx.x) y'>, 'λx.x'>>,
  Expect<Equal<LambdaCalculus<'(λx.λy.x) y'>, "λy'.y">>,
  Expect<Equal<LambdaCalculus<'(λx.λy.x y) λz.y'>, "λy'.y">>,
  Expect<Equal<LambdaCalculus<'(λx.λy.x) (y x)'>, "λy'.y x">>,
  Expect<Equal<LambdaCalculus<'(λx.λy.x y) y'>, "λy'.y y'">>,
  Expect<Equal<LambdaCalculus<'(λx.λy.y x) λz.y'>, "λy'.(y' λz.y)">>,
  Expect<Equal<LambdaCalculus<'(λx.λy.y x) (y x)'>, "λy'.(y' (y x))">>
];
