import { Assert } from "./Assert";

export type Overwrite<O, K extends string, V> = {
  [P in keyof O | K]: P extends K ? V : O[Assert<P, keyof O>]
};
