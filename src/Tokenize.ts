import type {
  CDot,
  CLambda,
  CLeftPar,
  CLetter,
  CRightPar,
  CSpace,
} from './data/Char';
import type {
  TkDot,
  TkLambda,
  TkLeftPar,
  TkRightPar,
  TkVar,
} from './data/Token';

export type Tokenize<Chars extends string> =
  Chars extends `${infer Char}${infer Rest}`
    ? [
        ...(Char extends CLetter
          ? [TkVar<Char>]
          : Char extends CLambda
          ? [TkLambda]
          : Char extends CLeftPar
          ? [TkLeftPar]
          : Char extends CRightPar
          ? [TkRightPar]
          : Char extends CDot
          ? [TkDot]
          : Char extends CSpace
          ? []
          : never),
        ...Tokenize<Rest>
      ]
    : [];
