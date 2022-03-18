import { Lexicon } from './misc'
import View from './View'
export as namespace nlp

export interface Plugin {
  methods?: object,
  model?: object,
  compute?: object,
  hooks?: string[],
  tags?: object,
  words?: object,
  lib?: () => object,
  api?: (view: View) => void,
  mutate?: (world: object) => void,
}

declare interface nlp {
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
  fork(): nlp
  /** mix in a compromise-plugin */
  extend(plugin: Plugin): nlp
}

/** parse a given text */
declare function nlp(text: string, lexicon?: Lexicon): View

// Constructor
declare module nlp {
  export function tokenize(text: string, lexicon?: Lexicon): View
  /** mix in a compromise-plugin */
  export function extend(plugin: Plugin): nlp
  /** re-generate a Doc object from .json() results */
  export function fromJSON(json: any): View
  /**  log our decision-making for debugging */
  export function verbose(bool?: boolean): View
  /** create instance using global world */
  export function clone(): nlp
  /**  current semver version of the library */
  export const version: number
}

export default nlp
