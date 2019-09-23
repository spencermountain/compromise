export as namespace nlp

declare function nlp(text: string): nlp.Document

// Constructor
declare module nlp {
  /** parse text into a compromise object, without running POS-tagging */
  export function tokenize(text: string): Document
  /** mix in a compromise-plugin */
  export function extend(plugin: any): Document
  /** make a deep-copy of the library state */
  export function clone(): Document
  /** re-generate a Doc object from .json() results */
  export function fromJSON(json: any): Document
  /**  log our decision-making for debugging */
  export function verbose(bool: boolean): Document
  /**  current semver version of the library */
  export const version: Document

  class Document {
    // Utils
    /** is this document empty? */
    found: Boolean
    /** return the whole original document ('zoom out') */
    all(): Document
    /** return the previous result */
    parent(): Document
    /** return all of the previous results */
    parents(): Document[]
    /**  (re)run the part-of-speech tagger on this document */
    tagger(): Document
    /**  count the # of terms in each match */
    wordCount(): Number
    /**  count the # of characters of each match */
    length(): Number
    /**  deep-copy the document, so that no references remain */
    clone(): Document
    /**  pretty-print the current document and its tags */
    debug(): Document

    // Accessors
    /**  use only the nth result */
    get(n: Number): Document
    /**  use only the first result(s) */
    first(): Document
    /**  use only the last result(s) */
    last(): Document
    /**  grab a subset of the results */
    slice(start: Number, end?: Number): Document
    // ????
    // firstTerm(): Document
    // lastTerm(): Document
    // termList(): Document

    // Case
    /**  turn every letter of every term to lower-cse */
    toLowerCase(): Document
    /**  turn every letter of every term to upper case */
    toUpperCase(): Document
    /**  upper-case the first letter of each term */
    toTitleCase(): Document
    /**  remove whitespace and title-case each term */
    toCamelCase(): Document

    // Whitespace
    /**  remove start and end whitespace */
    trim(): Document
    /**  connect words with hyphen, and remove whitespace */
    hyphenate(): Document
    /**  remove hyphens between words, and set whitespace */
    dehyphenate(): Document

    // Insert
    /**  add these new terms to the end (insertAfter) */
    append(text: String): Document
    /**  add these new terms to the front (insertBefore) */
    prepend(text: String): Document
    /**  return a Document with three parts for every match ('splitOn') */
    split(match: String): Document
    /**  separate everything before the word, as a new phrase */
    splitAfter(match: String): Document
    /**  separate everything after the match as a new phrase */
    splitBefore(match: String): Document
    /**  add these new things to the end */
    concat(text: String): Document
    /**  substitute-in new content */
    replaceWith(text: String): Document
    /**  search and replace match with new content */
    replace(match: String, text: String): Document
    /**  fully remove these terms from the document */
    delete(match: String): Document

    // Output
    /**  return the document as text */
    text(options?: any): String
    /**  pull out desired metadata from the document */
    json(options?: any): any
    /**  some named output formats */
    out(options?: any): any

    // Loops
    /**  run a function on each phrase, as an individual document */
    forEach(fn: Function): Document
    /** run each phrase through a function, and create a new document */
    map(fn: Function): Document
    /**  return only the phrases that return true */
    filter(fn: Function): Document
    /**  return a document with only the first phrase that matches */
    find(fn: Function): Document
    /**  return true or false if there is one matching phrase */
    some(fn: Function): Document
    /**  re-arrange the order of the matches (in place) */
    sort(fn: Function): Document
    /**  sample a subset of the results */
    random(n: Number): Document

    // Match
    /**  return a new Doc, with this one as a parent */
    match(match: String): Document
    /**  return all results except for this */
    not(match: String): Document
    /**  return only the first match */
    matchOne(match: String): Document
    /**  return each current phrase, only if it contains this match */
    if(match: String): Document
    /**  Filter-out any current phrases that have this match */
    ifNo(match: String): Document
    /**  Return a boolean if this match exists */
    has(match: String): Document
    /**  return all terms before a match, in each phrase */
    before(match: String): Document
    /**  return all terms after a match, in each phrase */
    after(match: String): Document

    // Tag
    /**  Give all terms the given tag */
    tag(tag: String): Document
    /**  Only apply tag to terms if it is consistent with current tags */
    tagSafe(tag: String): Document
    /**  Remove this term from the given terms */
    unTag(tag: String): Document
    /**  return only the terms that can be this tag */
    canBe(tag: String): Document

    // Helpers
    /**  split-up results by each individual term */
    terms(n?: Number): Document
    /**  split-up results into multi-term phrases */
    clauses(n?: Number): Document
    /**  return anything tagged as a hashtag */
    hashTags(n?: Number): Document
    /**  return anything tagged as an organization */
    organizations(n?: Number): Document
    /**  return anything tagged as a phone number */
    phoneNumbers(n?: Number): Document
    /**  return anything tagged as a Place */
    places(n?: Number): Document
    /**  return anything tagged as a URL */
    urls(n?: Number): Document
    /**  return any sentences that ask a question */
    questions(n?: Number): Document
    /**  return anything inside parentheses */
    parentheses(n?: Number): Document
    /**  return any sentences that are not a question or exclamation */
    statements(n?: Number): Document
    /**  return any sentences that are not a question */
    exclamations(n?: Number): Document
  }
}

export default nlp
