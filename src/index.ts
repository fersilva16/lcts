import type { Interp } from './Interp';
import type { Parse } from './Parse';
import type { PrettyPrint } from './PrettyPrint';
import type { Tokenize } from './Tokenize';

export type LambdaCalculus<Str extends string> = PrettyPrint<
  Interp<Parse<Tokenize<Str>>[0]>
>;
