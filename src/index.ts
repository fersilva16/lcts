import type { Expr } from './expr';
import type { Interp } from './interp';
import type { Assert, Parse } from './parse';
import { PrettyPrint } from './prettyPrint';
import type { Tokenize } from './tokenize';

export type LambdaCalculus<Code extends string> =
  // @ts-expect-error
  PrettyPrint<Interp<Parse<Tokenize<Code>>[0]>>;
