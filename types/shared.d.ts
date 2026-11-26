import type { Plugin } from './misc.d.ts'

export interface SpecCheckFailure {
  /** zero-based term position */
  index: number
  word: string
  want: string
  bestTag: string
}
export interface SpecCheck {
  line: number
  text: string
  /** one string per slot, or null when the line has no tag block */
  tags: string[] | null
  comment: string
  status: 'pass' | 'fail' | 'skip'
  failures: SpecCheckFailure[]
}
/**
 * plugin adding nlp.checkSpec(spec), which returns one SpecCheck per spec line,
 * and nlp.assertSpec(t, spec, prefix?), which calls t.pass() or t.fail() once per line
 */
export const checkSpec: Plugin
/** plugin adding .redact(), which uses whichever finders (.people(), .places(), ...) the build has */
export const redact: Plugin
/** plugin adding nlp.lazy(text, match), which only tags sentences that may match */
export const lazy: Plugin
/** plugin adding .people(), .places(), .organizations() and .topics() */
export const topics: Plugin
/** plugin adding .acronyms(), .parentheses(), .possessives(), .quotations(), .slashes(), .emails() ... */
export const misc: Plugin
/** plugin adding .clauses() - splits on parentheses and quotations when the misc plugin is present */
export const clauses: Plugin
/** the english tagset, for use in a plugin as { tags: { ...tagSet } } */
export const tagSet: { [tag: string]: { is?: string; not?: string[]; also?: string[]; aliases?: (string | null)[]; color?: string } }
export interface EuropeanLocale {
  /** the decimal mark - ',' (default) or '.' */
  decimal?: string
  /** the mark written between thousands - '.' (default), ' ', ',' */
  group?: string
  /** regex-source for the ending of a numeric ordinal - '[ºª°]' */
  ordinal?: string
  /** read a lone decimal-mark before three digits as thousands - '7,938' */
  loose?: boolean
  /** the words for a percentage, after a number - 'per cento' */
  percent?: string[]
  /** the names of currencies, after a number - 'euro' */
  currencies?: string[]
}
export interface EuropeanStyle {
  prefix?: string
  suffix?: string
  /** are thousands grouped? */
  hasComma?: boolean
  decimal?: string | null
  group?: string | null
}
export interface EuropeanNumber extends Required<EuropeanStyle> {
  /** null when the text is not one number */
  num: number | null
  /** the ending of a numeric ordinal - 'ª' */
  ordinal: string | null
  /** a currency symbol found on either side - '€', 'R$' */
  currency: string | null
  isPercent: boolean
  isFraction: boolean
}
/** found at methods.two.europeanNumbers - the locale is model.two.europeanNumbers */
export interface EuropeanNumberMethods {
  /** '1.234,56 €' → { num: 1234.56, .. } - `pre` is the punctuation in front of the term */
  read: (str: string, pre?: string, locale?: EuropeanLocale) => EuropeanNumber
  /** 1234.56 → '1.234,56' - pass a read() result to write it back the same way */
  write: (num: number, how?: EuropeanStyle, locale?: EuropeanLocale) => string
  /** tagging rules, as [regex, tags, example] - to be tested on a term's text */
  regexes: (locale?: EuropeanLocale) => [RegExp, string[], string][]
}
/**
 * plugin for numbers written with a decimal-comma - '1.234,56', '3,5%', '5,30€'.
 * tags them, and adds methods.two.europeanNumbers. A language sets its marks in model.two.europeanNumbers
 */
export const europeanNumbers: Plugin
/** efrt-packed names of people and places, keyed by tag - read each with efrt's unpack() */
export const properNouns: {
  ProperNoun: string
  Organization: string
  City: string
  Place: string
  Region: string
  FemaleName: string
  FirstName: string
  LastName: string
  MaleName: string
  Person: string
}
