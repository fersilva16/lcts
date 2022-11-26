import type { Equal, Expect } from '@type-challenges/utils';

import type { CLetter } from '../data/Char';
import type {
  TkDot,
  TkLambda,
  TkLeftPar,
  Token,
  TkRightPar,
  TkSpace,
  TkVar,
} from '../data/Token';
import type { Tokenize } from '../Tokenize';

type TPar<TS extends Token[]> = [TkLeftPar, ...TS, TkRightPar];
type TAbs<P extends CLetter, TS extends Token[]> = [
  TkLambda,
  TkVar<P>,
  TkDot,
  ...TS
];
type TApp<FTS extends Token[], ATS extends Token[]> = [...FTS, TkSpace, ...ATS];

type TY = [TkVar<'y'>];
type TX = [TkVar<'x'>];
type TId = TAbs<'y', TY>;
type TXYApp = TPar<TApp<TX, TY>>;
type TXApp = TPar<TApp<TX, TX>>;
type TYAbs = TAbs<'y', TApp<TY, TY>>;
type TYCombinator = TApp<TPar<TYAbs>, TYAbs>;

type cases = [
  Expect<Equal<Tokenize<'y'>, TY>>,
  Expect<Equal<Tokenize<'x'>, TX>>,
  Expect<Equal<Tokenize<'(y)'>, TPar<TY>>>,
  Expect<Equal<Tokenize<'λy.y'>, TId>>,
  Expect<Equal<Tokenize<'(λy.y)'>, TPar<TId>>>,
  Expect<Equal<Tokenize<'y (λy.y)'>, TApp<TY, TPar<TId>>>>,
  Expect<Equal<Tokenize<'(y) (λy.y)'>, TApp<TPar<TY>, TPar<TId>>>>,
  Expect<Equal<Tokenize<'y (x y)'>, TApp<TY, TXYApp>>>,
  Expect<Equal<Tokenize<'(y) (x y)'>, TApp<TPar<TY>, TXYApp>>>,
  Expect<Equal<Tokenize<'x y'>, TApp<TX, TY>>>,
  Expect<Equal<Tokenize<'x (y)'>, TApp<TX, TPar<TY>>>>,
  Expect<Equal<Tokenize<'(x) y'>, TApp<TPar<TX>, TY>>>,
  Expect<Equal<Tokenize<'λy.y x'>, TApp<TId, TX>>>,
  Expect<Equal<Tokenize<'λy.y λy.y'>, TApp<TId, TId>>>,
  Expect<Equal<Tokenize<'(x x) y'>, TApp<TXApp, TY>>>,
  Expect<Equal<Tokenize<'y (x x)'>, TApp<TY, TXApp>>>,
  Expect<Equal<Tokenize<'x λy.y'>, TApp<TX, TId>>>,
  Expect<Equal<Tokenize<'(x x) (x x)'>, TApp<TXApp, TXApp>>>,
  Expect<Equal<Tokenize<'λy.y y'>, TYAbs>>,
  Expect<Equal<Tokenize<'(λy.y y) λy.y y'>, TYCombinator>>,
  Expect<Equal<Tokenize<'λx.λy.x x'>, TAbs<'x', TAbs<'y', TApp<TX, TX>>>>>,
  Expect<Equal<Tokenize<'λx.(x λy.y)'>, TAbs<'x', TPar<TApp<TX, TId>>>>>,
  Expect<Equal<Tokenize<'λx.(x (x y))'>, TAbs<'x', TPar<TApp<TX, TXYApp>>>>>
];
