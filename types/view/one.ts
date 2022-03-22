import { Document, Pointer, Groups, JsonProps, outMethods } from '../misc'

class View {
  // Utils
  /** is this document empty? */
  found: boolean
  /** get a list of term objects for this view */
  docs: Document
  /** get the full parsed text */
  document: Document
  /** the indexes for the current view */
  pointer: Pointer[] | null
  /** explicit indexes for the current view */
  fullPointer: Pointer[]
  /** access internal library methods */
  methods: object
  /** access internal library data */
  model: object
  /** which compute methods run by default */
  hooks: string[]
  /** helper for detecting a compromise object */
  isView: boolean
  /** count the # of characters of each match */
  length: number

  /** create a new view, from this document */
  update: (pointer: Pointer | null) => View
  /** turn a Verb or Noun view into a normal one */
  toView: (pointer: Pointer | null) => View
  /** create a new document */
  fromText: (text: string) => View
  /** .docs [alias] */
  termList: () => Document

  /** run a named operation on the document */
  compute: (method: string | string[]) => View
  /** deep-copy the document, so that no references remain */
  clone: (shallow?: boolean) => View

  // Loops
  /** run a function on each phrase, as an individual document */
  forEach: (fn: (m: View) => void) => View
  /** run each phrase through a function, and create a new document */
  map: (fn: (m: View) => any) => View | any
  /** return only the phrases that return true */
  filter: (fn: (m: View) => boolean) => View
  /** return a document with only the first phrase that matches */
  find: (fn: (m: View) => boolean) => View | undefined
  /** return true or false if there is one matching phrase */
  some: (fn: (m: View) => boolean) => View
  /** sample a subset of the results */
  random: (n?: number) => View

  // Accessors    
  /** split-up results by each individual term */
  terms: (n?: number) => View
  /** grab a specific named capture group */
  groups: (name?: string) => View | Groups
  /** use only the nth result */
  eq: (n: number) => View
  /** use only the first result(s) */
  first: (n?: number) => View
  /** use only the last result(s) */
  last: (n?: number) => View
  /** get the first word in each match */
  firstTerms: () => View
  /** get the end word in each match */
  lastTerms: () => View
  /** grab a subset of the results */
  slice: (start: number, end?: number) => View
  /** return the whole original document ('zoom out') */
  all: () => View
  /** return the full original sentence for each match */
  fullSentences: () => View
  /** return an empty view */
  none: () => View
  /** are these two views of the same document? */
  isDoc: (view?: View) => boolean
  /** count the # of terms in each match */
  wordCount: () => number

  // Match
  /** return matching patterns in this doc */
  match: (match: string | View, options?: any, group?: string | number) => View
  /** return only the first match */
  matchOne: (match: string | View, options?: any) => View
  /** Return a boolean if this match exists */
  has: (match: string | View, options?: any) => boolean
  /** return each current phrase, only if it contains this match */
  if: (match: string | View, options?: any) => View
  /** Filter-out any current phrases that have this match */
  ifNo: (match: string | View, options?: any) => View

  /** return the terms before each match */
  before: (match: string | View, options?: any) => View
  /** return the terms after each match */
  after: (match: string | View, options?: any) => View
  /** add any immediately-preceding matches to the view*/
  growLeft: (match: string | View, options?: any) => View
  /** add any immediately-following matches to the view*/
  growRight: (match: string | View, options?: any) => View
  /** expand the view with any left-or-right matches*/
  grow: (match: string | View, options?: any) => View

  /** .split() [alias] */
  splitOn: (match?: string) => View
  /** separate everything after the match as a new phrase */
  splitBefore: (match?: string) => View
  /** separate everything before the word, as a new phrase */
  splitAfter: (match?: string) => View

  // Case
  /** turn every letter of every term to lower-cse */
  toLowerCase: () => View
  /** turn every letter of every term to upper case */
  toUpperCase: () => View
  /** upper-case the first letter of each term */
  toTitleCase: () => View
  /** remove whitespace and title-case each term */
  toCamelCase: () => View

  // Insert
  /** add these new things to the end */
  concat: (input: string | View) => View
  /** .prepend() [alias] */
  insertBefore: (input: string | View) => View
  /** .append() [alias] */
  insertAfter: (text: string | View) => View
  /** fully remove these terms from the document */
  remove: (match: string | View) => View
  /** search and replace match with new content */
  replace: (match: string | View, text?: string | Function, keepTags?: boolean | object, keepCase?: boolean) => View
  /** substitute-in new content */
  replaceWith: (text: string | Function, keepTags?: boolean | object, keepCase?: boolean) => View

  /** remove any duplicate matches */
  unique: () => View
  /**reverse the order of the matches, but not the words */
  reverse: () => View
  /**re-arrange the order of the matches (in place) */
  sort: (method?: string | Function) => View

  // Whitespace
  /** add this punctuation or whitespace before each match */
  pre: (str?: string, concat?: boolean) => View
  /** add this punctuation or whitespace after each match */
  post: (str?: string, concat?: boolean) => View
  /** remove start and end whitespace */
  trim: () => View
  /** connect words with hyphen, and remove whitespace */
  hyphenate: () => View
  /** remove hyphens between words, and set whitespace */
  dehyphenate: () => View
  /** add quotation marks around selections */
  toQuotations: (start?: string, end?: string) => View
  /** add parentheses around selections */
  toParentheses: (start?: string, end?: string) => View


  // Output
  /** return the document as text */
  text: (options?: string | object) => string
  /** pull out desired metadata from the document */
  json: (options?: JsonProps | string) => any
  /** pretty-print the current document and its tags */
  debug: () => View
  /** some named output formats */
  out: (format?: outMethods) => any
  /** produce an html string */
  html: (toHighlight: object) => string
  /** produce an html string */
  wrap: (matches: object) => string


  // ### Pointers
  /** return all matches without duplicates */
  union: (match: string | View) => View
  /** return only duplicate matches */
  intersection: (match: string | View) => View
  /** return all results except for this */
  not: (match: string | View, options?: any) => View
  /** get everything that is not a match */
  complement: (match: string | View) => View
  /** remove overlaps in matches */
  settle: (match: string | View) => View


  // Tag
  /** Give all terms the given tag */
  tag: (tag: string, reason?: string) => View
  /** Only apply tag to terms if it is consistent with current tags */
  tagSafe: (tag: string, reason?: string) => View
  /** Remove this term from the given terms */
  unTag: (tag: string, reason?: string) => View
  /** return only the terms that can be this tag */
  canBe: (tag: string) => View

  // Cache
  /** freeze the current state of the document, for speed-purposes */
  cache: (options?: object) => View
  /** un-freezes the current state of the document, so it may be transformed */
  uncache: (options?: object) => View

  /** quick find for an array of string matches */
  lookup: (trie: object | string[]) => View
  /** assume any type-ahead prefixes */
  autoFill: () => View

}

export default View