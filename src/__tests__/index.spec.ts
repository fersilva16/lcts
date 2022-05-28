import type { Equal, Expect } from '@type-challenges/utils';

import type { LambdaCalculus } from '..';

type cases = [
  Expect<Equal<LambdaCalculus<'x'>, 'x'>>,
  Expect<Equal<LambdaCalculus<'(λy.y)'>, 'λy.y'>>,
  Expect<Equal<LambdaCalculus<'(λy.y) x'>, 'x'>>,
  Expect<Equal<LambdaCalculus<'(λy.y) (λy.y)'>, 'λy.y'>>
];
