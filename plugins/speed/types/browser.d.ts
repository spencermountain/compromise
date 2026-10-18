import type nlp from 'compromise'
import type { Lexicon, Net } from 'compromise/misc'

type View = ReturnType<typeof nlp>

export interface KeyPressOptions {
  /** Log which sentences are parsed and how many remain cached. */
  verbose?: boolean
  /** Reuse a separate object for each editor's cache. */
  cache?: object
  /** Discard this editor's cached sentences before parsing. */
  reset?: boolean
}

export interface SpeedMethods {
  /** Reuse cached sentences while parsing edited text. */
  keyPress(text: string, lexicon?: Lexicon, options?: KeyPressOptions): View
  /** Tokenize first, then tag only sentences that could contain the match. */
  lazy(text: string, match: string | Net): View
}

export type SpeedNlp = Omit<typeof nlp, keyof SpeedMethods> & SpeedMethods & {
  <PluginTypes = {}>(text: string, lexicon?: Lexicon): View & PluginTypes
}

export interface SpeedPlugin<Methods extends object = SpeedMethods> {
  lib: Methods
}

export const keyPress: SpeedPlugin<Pick<SpeedMethods, 'keyPress'>>
export const lazyParse: SpeedPlugin<Pick<SpeedMethods, 'lazy'>>

declare const nlpSpeed: SpeedPlugin & { version: string }
export default nlpSpeed
