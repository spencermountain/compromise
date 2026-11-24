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
