export type ReverseString<S extends string> = S extends `${infer C}${infer R}`
  ? `${ReverseString<R>}${C}`
  : '';
