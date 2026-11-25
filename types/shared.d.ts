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
