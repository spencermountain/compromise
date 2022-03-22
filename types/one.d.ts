import { Lexicon, Plugin } from './misc'
import View from './view/one'

/** parse a given text */
declare function nlp(text: string, lexicon?: Lexicon): View

// Constructor
declare module nlp {
  /** interpret text without tagging */
  export function tokenize(text: string, lexicon?: Lexicon): View
  /** mix in a compromise-plugin */
  export function plugin(plugin: Plugin): any
  /** turn a match-string into json */
  export function parseMatch(): object[]
  /** grab library internals */
  export function world(): object
  /** grab library metadata */
  export function model(): object
  /** grab exposed library methods */
  export function methods(): object
  /** which compute functions run automatically */
  export function hooks(): string[]
  /**  log our decision-making for debugging */
  export function verbose(bool?: boolean): any
  /**  current semver version of the library */
  export const version: string
}

export default nlp

