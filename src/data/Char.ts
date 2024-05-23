export type CLetter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export type CLambda = 'λ';

export type CLeftPar = '(';

export type CRightPar = ')';

export type CDot = '.';

export type CSpace = ' ' | '\n' | '\r' | '\t';

export type Char = CLetter | CLambda | CLeftPar | CRightPar | CDot | CSpace;
