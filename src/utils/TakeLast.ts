import type { Assert } from './Assert';

export type TakeLast<XS extends unknown[]> = XS extends [infer X, ...infer YS]
  ? YS extends []
    ? [[], X]
    : TakeLast<YS> extends [infer ZS extends unknown[], infer R]
    ? [[X, ...ZS], R]
    : never
  : never;
