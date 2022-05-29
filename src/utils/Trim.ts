import type { Space } from '../data/Char';
import type { ReverseString } from './ReverseString';

export type TrimStart<S extends string> = S extends `${Space}${infer R}`
  ? TrimStart<R>
  : S;

export type Trim<S extends string> = TrimStart<
  ReverseString<TrimStart<ReverseString<S>>>
>;
