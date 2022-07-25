import type { Equal, Expect } from '@type-challenges/utils';

import type { TakeLast } from '../TakeLast';

type cases = [
  Expect<Equal<TakeLast<[]>, never>>,
  Expect<Equal<TakeLast<[1]>, [[], 1]>>,
  Expect<Equal<TakeLast<[1, 2, 3, 4, 5]>, [[1, 2, 3, 4], 5]>>
];
