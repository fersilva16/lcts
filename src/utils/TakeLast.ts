import type { Assert } from './Assert';

export type TakeLast<XS extends unknown[]> = XS extends [infer X, ...infer YS]
  ? YS extends []
    ? [[], X]
    : TakeLast<YS> extends [infer ZS, infer R]
    ? [[X, ...Assert<ZS, unknown[]>], R]
    : never
  : never;
