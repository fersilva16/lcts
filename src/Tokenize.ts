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

export type Tokenize<CS extends string> = CS extends `${infer C}${infer R}`
  ? [
      ...(C extends CLetter
        ? [TkVar<C>]
        : C extends CLambda
        ? [TkLambda]
        : C extends CLeftPar
        ? [TkLeftPar]
        : C extends CRightPar
        ? [TkRightPar]
        : C extends CDot
        ? [TkDot]
        : C extends CSpace
        ? []
        : never),
      ...Tokenize<R>
    ]
  : [];
