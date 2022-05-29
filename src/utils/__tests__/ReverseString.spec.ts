import type { Equal, Expect } from '@type-challenges/utils';

import type { ReverseString } from '../ReverseString';

type cases = [
  Expect<Equal<ReverseString<'something'>, 'gnihtemos'>>,
  Expect<Equal<ReverseString<'hello world'>, 'dlrow olleh'>>,
  Expect<Equal<ReverseString<'The quick brown fox'>, 'xof nworb kciuq ehT'>>
];
