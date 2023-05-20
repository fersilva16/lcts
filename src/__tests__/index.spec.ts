import type { Equal, Expect } from '@type-challenges/utils';

import type { LambdaCalculus } from '..';

type cases = [
  Expect<Equal<LambdaCalculus<'y'>, 'y'>>,
  Expect<Equal<LambdaCalculus<'x'>, 'x'>>,
  Expect<Equal<LambdaCalculus<'λy.y'>, 'λy.y'>>,
  Expect<Equal<LambdaCalculus<'x y'>, 'x y'>>,
  Expect<Equal<LambdaCalculus<'λy.λy.y'>, 'λy.λy.y'>>,
  Expect<Equal<LambdaCalculus<'λx.x y'>, 'λx.x y'>>,
  Expect<Equal<LambdaCalculus<'(λy.y) x'>, 'x'>>,
  Expect<Equal<LambdaCalculus<'(λy.y) λy.y'>, 'λy.y'>>,
  Expect<Equal<LambdaCalculus<'λy.y y'>, 'λy.y y'>>,
  Expect<Equal<LambdaCalculus<'(x x) y'>, '(x x) y'>>,
  Expect<Equal<LambdaCalculus<'x λy.y'>, 'x λy.y'>>,
  Expect<Equal<LambdaCalculus<'y (x x)'>, 'y (x x)'>>,
  Expect<Equal<LambdaCalculus<'(x x) (x x)'>, '(x x) (x x)'>>,
  Expect<Equal<LambdaCalculus<'λx.λy.x x'>, 'λx.λy.x x'>>,
  Expect<Equal<LambdaCalculus<'λx.(x λy.y)'>, 'λx.(x λy.y)'>>,
  Expect<Equal<LambdaCalculus<'λx.(x (x y))'>, 'λx.(x (x y))'>>,
  Expect<Equal<LambdaCalculus<'(λx.x y) (λx.x)'>, 'y'>>,
  Expect<Equal<LambdaCalculus<'((λx.λx.x) y) z'>, 'z'>>,
  Expect<Equal<LambdaCalculus<'λx.(λy.x) z'>, 'λx.x'>>,

  // infinite
  // Expect<Equal<LambdaCalculus<'(λy.y y) λy.y y'>, '(λy.y y) λy.y y'>>,
];
