import type { Interp } from './Interp';
import type { Parse } from './Parse';
import type { PrettyPrint } from './PrettyPrint';
import type { Tokenize } from './Tokenize';
import type { Trim } from './utils/Trim';

export type LambdaCalculus<Code extends string> = PrettyPrint<
  Interp<Parse<Tokenize<Trim<Code>>>[0]>
>;
