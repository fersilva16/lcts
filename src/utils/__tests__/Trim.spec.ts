import type { Equal, Expect } from '@type-challenges/utils';

import type { Trim } from '../Trim';

type cases = [
  Expect<Equal<Trim<'something'>, 'something'>>,
  Expect<Equal<Trim<'  something      '>, 'something'>>,
  Expect<Equal<Trim<'  s  o m  e thi  ng     '>, 's  o m  e thi  ng'>>
];
