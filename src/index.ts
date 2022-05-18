import type { Expr } from './Expr';
import type { Interp } from './Interp';
import type { Assert, Parse } from './Parse';
import { PrettyPrint } from './PrettyPrint';
import type { Tokenize } from './Tokenize';

export type LambdaCalculus<Code extends string> =
  // @ts-expect-error
  PrettyPrint<Interp<Parse<Tokenize<Code>>[0]>>;
