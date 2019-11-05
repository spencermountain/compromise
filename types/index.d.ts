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
  export function load(json: any): Document
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
    clone(shallow?: Boolean): Document
    /** freeze the current state of the document, for speed-purposes */
    cache(options?: Object): Document
    /** un-freezes the current state of the document, so it may be transformed */
    uncache(options?: Object): Document

    // Accessors
    /**  use only the first result(s) */
    first(n?: Number): Document
    /**  use only the last result(s) */
    last(n?: Number): Document
    /**  grab a subset of the results */
    slice(start: Number, end?: Number): Document
    /**  use only the nth result */
    eq(n: Number): Document
    /** get the first word in each match */
    firstTerm(): Document
    /** get the end word in each match */
    lastTerm(): Document
    /** return a flat list of all Term objects in match */
    termList(): any

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
    /**  search through earlier terms, in the sentence */
    lookBehind(match: String): Document
    /**  search through following terms, in the sentence */
    lookAhead(match: String): Document
    /**  return the terms before each match */
    before(match: String): Document
    /**  return the terms after each match */
    after(match: String): Document

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
    /** add this punctuation or whitespace before each match */
    pre(str: String): Document
    /** add this punctuation or whitespace after each match */
    post(str: String): Document
    /**  remove start and end whitespace */
    trim(): Document
    /**  connect words with hyphen, and remove whitespace */
    hyphenate(): Document
    /**  remove hyphens between words, and set whitespace */
    dehyphenate(): Document

    // Tag
    /**  Give all terms the given tag */
    tag(tag: String): Document
    /**  Only apply tag to terms if it is consistent with current tags */
    tagSafe(tag: String): Document
    /**  Remove this term from the given terms */
    unTag(tag: String): Document
    /**  return only the terms that can be this tag */
    canBe(tag: String): Document

    // Loops
    /** run each phrase through a function, and create a new document */
    map(fn: Function): Document
    /**  run a function on each phrase, as an individual document */
    forEach(fn: Function): Document
    /**  return only the phrases that return true */
    filter(fn: Function): Document
    /**  return a document with only the first phrase that matches */
    find(fn: Function): Document
    /**  return true or false if there is one matching phrase */
    some(fn: Function): Document
    /**  sample a subset of the results */
    random(n: Number): Document

    // Insert
    /**  substitute-in new content */
    replaceWith(text: String): Document
    /**  search and replace match with new content */
    replace(match: String, text: String): Document
    /**  fully remove these terms from the document */
    delete(match: String): Document
    /**  add these new terms to the end (insertAfter) */
    append(text: String): Document
    /**  add these new terms to the front (insertBefore) */
    prepend(text: String): Document
    /**  add these new things to the end */
    concat(text: String): Document

    /**re-arrange the order of the matches (in place) */
    sort(method: String): Document
    /**reverse the order of the matches, but not the words */
    reverse(): Document
    /** remove any duplicate matches */
    unique(): Document
    /**  return a Document with three parts for every match ('splitOn') */
    splitOn(match: String): Document
    /**  separate everything before the word, as a new phrase */
    splitAfter(match: String): Document
    /**  separate everything after the match as a new phrase */
    splitBefore(match: String): Document
    /** split a document into labeled sections  */
    segment(regs: Object, options?: Object): Document
    /** make all phrases into one phrase  */
    join(match: String): Document

    // Output
    /**  return the document as text */
    text(options?: Object): String
    /**  pull out desired metadata from the document */
    json(options?: Object): any
    /** some named output formats */
    out(format?: string): String
    /**  pretty-print the current document and its tags */
    debug(): Document
    /** clean-up the document, in various ways */
    normalize(options?: Object): String
    /** store a parsed document for later use  */
    export(): any

    // Helpers
    /**  split-up results by each individual term */
    terms(n?: Number): Document
    /**  split-up results into multi-term phrases */
    clauses(n?: Number): Document
    /**  all terms connected with a hyphen or dash */
    hyphenated(n?: Number): Document

    /**  return anything tagged as a HashTag */
    hashTags(n?: Number): Document
    /**  return anything tagged as a Email */
    emails(n?: Number): Document
    /**  return anything tagged as an AtMention*/
    atMentions(n?: Number): Document
    /**  return anything tagged as a Url */
    urls(n?: Number): Document

    /**  return anything tagged as a Fraction*/
    fractions(n?: Number): Document
    /**  return anything tagged as a phone number */
    phoneNumbers(n?: Number): Document
    /**  return anything tagged as Money*/
    money(n?: Number): Document

    /**  return anything tagged as an Adverb */
    adverbs(n?: Number): Document
    /**  return anything tagged as a Pronoun*/
    pronouns(n?: Number): Document
    /**  return anything tagged as a Conjunction*/
    conjunctions(n?: Number): Document
    /**  return anything tagged as a Preposition*/
    prepositions(n?: Number): Document
    /**  return anything tagged as a Abbreviation*/
    abbreviations(n?: Number): Document
    /**  return anything tagged as a RomanNumeral*/
    romanNumerals(n?: Number): Document

    /**  return anything tagged as an Acronym, like 'FBI.' */
    acronyms(n?: Number): Document
    /** return any multi-word terms, like "didn't"  */
    contractions(n?: Number): Document
    /**  return all comma-seperated lists */
    lists(n?: Number): Document
    /**  return any subsequent terms tagged as a Noun*/
    nouns(n?: Number): Document
    /**  return anything inside parentheses */
    parentheses(n?: Number): Document
    /**  return anything tagged as a Possessive noun, like "Spencer's" */
    possessives(n?: Number): Document
    /**  return any terms inside quotation marks */
    quotations(n?: Number): Document
    /**  return any subsequent terms tagged as a Verb*/
    verbs(n?: Number): Document
  }
}

export default nlp
