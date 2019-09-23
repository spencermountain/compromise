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
    found(): Document
    /** return the whole original document ('zoom out') */
    all(): Document
    /**  count the # of terms in each match */
    wordCount(): Document
    /**  count the # of characters of each match */
    length(): Document
    /**  deep-copy the document, so that no references remain */
    clone(): Document
    /**  pretty-print the current document and its tags */
    debug(): Document

    // Accessors
    /**  use only the nth result */
    get(): Document
    /**  use only the first result(s) */
    first(): Document
    /**  use only the last result(s) */
    last(): Document
    /**  grab a subset of the results */
    slice(): Document
    // ????
    // firstTerm(): Document
    // lastTerm(): Document
    // termList(): Document

    // Output
    /**  return the document as text */
    text(): Document
    /**  pull out desired metadata from the document */
    json(): Document
    /**  some named output formats */
    out(): Document
    /**  normalized text -  out('normal') */
    normal(): Document

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
    append(): Document
    /**  add these new terms to the front (insertBefore) */
    prepend(): Document
    /**  return a Document with three parts for every match ('splitOn') */
    split(): Document
    /**  separate everything before the word, as a new phrase */
    splitAfter(): Document
    /**  separate everything after the match as a new phrase */
    splitBefore(): Document
    /**  add these new things to the end */
    concat(): Document
    /**  substitute-in new content */
    replaceWith(): Document
    /**  search and replace match with new content */
    replace(): Document
    /**  fully remove these terms from the document */
    delete(): Document

    // Loops
    /**  run a function on each phrase, as an individual document */
    forEach(): Document
    /** run each phrase through a function, and create a new document */
    map(): Document
    /**  return only the phrases that return true */
    filter(): Document
    /**  return a document with only the first phrase that matches */
    find(): Document
    /**  return true or false if there is one matching phrase */
    some(): Document
    /**  re-arrange the order of the matches (in place) */
    sort(): Document
    /**  sample a subset of the results */
    random(): Document

    // Match
    /**  return a new Doc, with this one as a parent */
    match(): Document
    /**  return all results except for this */
    not(): Document
    /**  return only the first match */
    matchOne(): Document
    /**  return each current phrase, only if it contains this match */
    if(): Document
    /**  Filter-out any current phrases that have this match */
    ifNo(): Document
    /**  Return a boolean if this match exists */
    has(): Document
    /**  return all terms before a match, in each phrase */
    before(): Document
    /**  return all terms after a match, in each phrase */
    after(): Document

    // Tag
    /**  Give all terms the given tag */
    tag(): Document
    /**  Only apply tag to terms if it is consistent with current tags */
    tagSafe(): Document
    /**  Remove this term from the given terms */
    unTag(): Document
    /**  return only the terms that can be this tag */
    canBe(): Document

    // Helpers
    /**  split-up results by each individual term */
    terms(): Document
    /**  split-up results into multi-term phrases */
    clauses(): Document
    /**  return anything tagged as a hashtag */
    hashTags(): Document
    /**  return anything tagged as an organization */
    organizations(): Document
    /**  return anything tagged as a phone number */
    phoneNumbers(): Document
    /**  return anything tagged as a Place */
    places(): Document
    /**  return anything tagged as a URL */
    urls(): Document
    /**  return any sentences that ask a question */
    questions(): Document
    /**  return anything inside parentheses */
    parentheses(): Document
    /**  return any sentences that are not a question or exclamation */
    statements(): Document
    /**  return any sentences that are not a question */
    exclamations(): Document
  }
}

export default nlp
