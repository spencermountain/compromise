import { Document, Pointer, Groups, Term, JsonOptions, Lexicon } from './misc'
import View from './view'
export as namespace nlp

declare interface nlp<D extends object, W extends object, Ph extends Object> {
  /** normal usage */
  (text?: string, lexicon?: Lexicon): View
  /** tokenize string */
  tokenize(text: string, lexicon?: Lexicon): View
  /**  current semver version of the library */
  version: string
  /** grab library internal data & methods */
  world(): object
  /** grab internal library methods */
  methods(): object
  /** grab internal library linguistic data */
  model(): object
  /** re-generate a Doc object from .json() results */
  fromJSON(json: any): View
  /**  log our decision-making for debugging */
  verbose(section?: string | boolean): View
  /** pre-parse a match statement, for faster lookups*/
  parseMatch(str: string, options?: object): object[]
  /** create instance using global world*/
  fork(): nlp<D, W, Ph>
  /** mix in a compromise-plugin */
  extend(plugin: object): nlp<D, W, Ph>
}

declare function nlp(text?: string, lexicon?: Lexicon): View
declare function nlp(text?: string): View

// Constructor
declare module nlp {
  export function tokenize(text?: string, lexicon?: Lexicon): View
  /** mix in a compromise-plugin */
  export function extend(plugin: object): nlp<{}, {}, {}>
  /** re-generate a Doc object from .json() results */
  export function fromJSON(json: any): View
  /**  log our decision-making for debugging */
  export function verbose(bool?: boolean): View
  /** create instance using global world */
  export function clone(): nlp<{}, {}, {}>
  /**  current semver version of the library */
  export const version: number
}

export default nlp
