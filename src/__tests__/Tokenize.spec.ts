import type { Equal, Expect } from '@type-challenges/utils';
import type {
  TDot,
  TLambda,
  TLeftPar,
  TRightPar,
  TSpace,
  TVar,
} from '../Token';
import type { Tokenize } from '../Tokenize';

type cases = [
  Expect<Equal<Tokenize<'y'>, [TVar<'y'>]>>,
  Expect<Equal<Tokenize<'λy.y'>, [TLambda, TVar<'y'>, TDot, TVar<'y'>]>>,
  Expect<
    Equal<
      Tokenize<'(λy.y) x'>,
      [
        TLeftPar,
        TLambda,
        TVar<'y'>,
        TDot,
        TVar<'y'>,
        TRightPar,
        TSpace,
        TVar<'x'>
      ]
    >
  >
];
