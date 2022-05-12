import type { Equal, Expect, NotEqual } from '@type-challenges/utils';

type cases = [Expect<Equal<1, 1>>, Expect<NotEqual<1, 2>>];
