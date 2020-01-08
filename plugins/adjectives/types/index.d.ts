import nlp from 'compromise'

declare class Adjectives {
  /** overloaded output with adjective metadata **/
  json(n?: number): any
  /** return all conjugated forms of this adjective **/
  conjugate(n?: number): nlp.Document
  /** convert `quick` to `quickest` **/
  toSuperlative(): nlp.Document
  /** convert `quick` to `quicker` **/
  toComparative(): nlp.Document
  /** convert `quick` to `quickly` **/
  toAdverb(): nlp.Document
  /** convert `quick` to `quicken` **/
  toVerb(): nlp.Document
  /** convert `quick` to `quickness`**/
  toNoun(): nlp.Document
}

/** words like 'quick' or 'cool' **/
declare const nlpAdjectives: nlp.Plugin<{ adjectives(n?: number): Adjectives }, {}>

export default nlpAdjectives
