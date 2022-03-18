import { Document, Pointer, Groups, Term, JsonOptions, Lexicon } from './misc'

class View {
  // Utils
  /** is this document empty? */
  found: boolean
  /** get a list of term objects for this view */
  docs: Term[][]
  /** .docs [alias] */
  termList: () => Term[][]
  /** get the full parsed text */
  document: Term[][]
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
  /** count the # of terms in each match */
  wordCount: () => number
  /** count the # of characters of each match */
  length: () => number
  /** deep-copy the document, so that no references remain */
  clone: (shallow?: boolean) => View
  /** freeze the current state of the document, for speed-purposes */
  cache: (options?: object) => View
  /** un-freezes the current state of the document, so it may be transformed */
  uncache: (options?: object) => View
  /** run a named operation on the document */
  compute: (method: string | string[]) => View

  // Accessors    
  /** return the whole original document ('zoom out') */
  all: () => View
  /** return an empty view */
  none: () => View
  /** return the full original sentence for each match */
  fullSentences: () => View
  /** use only the first result(s) */
  first: (n?: number) => View
  /** use only the last result(s) */
  last: (n?: number) => View
  /** grab a subset of the results */
  slice: (start: number, end?: number) => View
  /** use only the nth result */
  eq: (n: number) => View
  /** get the first word in each match */
  firstTerms: () => View
  /** get the end word in each match */
  lastTerms: () => View
  /** grab a specific named capture group */
  groups: (name?: string) => View | Groups
  /** */
  isDoc: (view?: View) => boolean

  // Match
  /** return matching patterns in this doc */
  match: (match: string | View, options?: any, group?: string | number) => View
  /** return all results except for this */
  not: (match: string | View, options?: any) => View
  /** return only the first match */
  matchOne: (match: string | View, options?: any) => View
  /** return each current phrase, only if it contains this match */
  if: (match: string | View, options?: any) => View
  /** Filter-out any current phrases that have this match */
  ifNo: (match: string | View, options?: any) => View
  /** Return a boolean if this match exists */
  has: (match: string | View, options?: any) => boolean
  /** search through earlier terms, in the sentence */
  lookBehind: (match: string | View, options?: any) => View
  /** search through following terms, in the sentence */
  lookAhead: (match: string | View, options?: any) => View
  /** return the terms before each match */
  before: (match: string | View, options?: any) => View
  /** return the terms after each match */
  after: (match: string | View, options?: any) => View

  /** add any immediately-following matches to the view*/
  growRight: (match: string | View, options?: any) => View
  /** add any immediately-preceding matches to the view*/
  growLeft: (match: string | View, options?: any) => View
  /** expand the view with any left-or-right matches*/
  grow: (match: string | View, options?: any) => View

  /** quick find for an array of string matches */
  lookup: (matches: string[]) => View

  // Case
  /** turn every letter of every term to lower-cse */
  toLowerCase: () => View
  /** turn every letter of every term to upper case */
  toUpperCase: () => View
  /** upper-case the first letter of each term */
  toTitleCase: () => View
  /** remove whitespace and title-case each term */
  toCamelCase: () => View

  // Whitespace
  /** add this punctuation or whitespace before each match */
  pre: (str: string, concat: boolean) => View
  /** add this punctuation or whitespace after each match */
  post: (str: string, concat: boolean) => View
  /** remove start and end whitespace */
  trim: () => View
  /** connect words with hyphen, and remove whitespace */
  hyphenate: () => View
  /** remove hyphens between words, and set whitespace */
  dehyphenate: () => View

  // Tag
  /** Give all terms the given tag */
  tag: (tag: string, reason?: string) => View
  /** Only apply tag to terms if it is consistent with current tags */
  tagSafe: (tag: string, reason?: string) => View
  /** Remove this term from the given terms */
  unTag: (tag: string, reason?: string) => View
  /** return only the terms that can be this tag */
  canBe: (tag: string) => View

  // Loops
  /** run each phrase through a function, and create a new document */
  map: (fn: (m: View) => any) => View | any
  /** run a function on each phrase, as an individual document */
  forEach: (fn: (m: View) => void) => View
  /** return only the phrases that return true */
  filter: (fn: (m: View) => boolean) => View
  /** return a document with only the first phrase that matches */
  find: (fn: (m: View) => boolean) => View | undefined
  /** return true or false if there is one matching phrase */
  some: (fn: (m: View) => boolean) => View
  /** sample a subset of the results */
  random: (n?: number) => View

  // Insert
  /** substitute-in new content */
  replaceWith: (text: string | Function, keepTags?: boolean | object, keepCase?: boolean) => View
  /** search and replace match with new content */
  replace: (match: string | View, text?: string | Function, keepTags?: boolean | object, keepCase?: boolean) => View
  /** fully remove these terms from the document */
  remove: (match: string | View) => View
  /** .remove() [alias] */
  delete: (match: string | View) => View
  /** add these new terms to the end (insertAfter) */
  append: (text: string | View) => View
  /** .append() [alias] */
  insertAfter: (text: string | View) => View
  /** .append() [alias] */
  insert: (text: string | View) => View
  /** add these new terms to the front (insertBefore) */
  prepend: (text: string | View) => View
  /** .prepend() [alias] */
  insertBefore: (input: string | View) => View
  /** add these new things to the end */
  concat: (input: string | View) => View
  /** smart-replace root forms */
  swap: (fromLemma: string, toLemma: string, guardTag?: string) => View

  // transform
  /**re-arrange the order of the matches (in place) */
  sort: (method?: string | Function) => View
  /**reverse the order of the matches, but not the words */
  reverse: () => View
  /** clean-up the document, in various ways */
  normalize: (options?: string | object) => View
  /** remove any duplicate matches */
  unique: () => View
  /** return a Document with three parts for every match ('splitOn') */
  split: (match?: string) => View
  /** .split() [alias] */
  splitOn: (match?: string) => View
  /** separate everything after the match as a new phrase */
  splitBefore: (match?: string) => View
  /** separate everything before the word, as a new phrase */
  splitAfter: (match?: string) => View
  /** split a document into labeled sections  */
  segment: (regs: object, options?: object) => View
  /** make all phrases into one phrase  */
  join: (str?: string) => View

  // Output
  /** return the document as text */
  text: (options?: string | object) => string
  /** pull out desired metadata from the document */
  json: (options?: JsonOptions | string) => any
  /** some named output formats */
  out: (format?: 'text' | 'normal' | 'offset' | 'terms') => string
  // out: (format: 'array') => string[]
  // out: (format: 'tags' | 'terms') => Array<{ normal: string; text: string; tags: string[] }>
  // out: (format: 'json') => Array<{ normal: string; text: string; tags: () => void }>[]
  // out: (format: 'debug') => View
  // out: (format: 'topk') => Array<{ normal: string; count: number; percent: number }>
  /** pretty-print the current document and its tags */
  debug: () => View
  /** store a parsed document for later use  */
  export: () => any

  // Selections
  /** split-up results by each individual term */
  terms: (n?: number) => View
  /** split-up results into multi-term phrases */
  clauses: (n?: number) => View
  /** return all terms connected with a hyphen or dash like `'wash-out'`*/
  hyphenated: (n?: number) => View
  /** add quoation marks around each match */
  toQuoations: (start?: string, end?: string) => View
  /** add brackets around each match */
  toParentheses: (start?: string, end?: string) => View
  /** return terms like `'(939) 555-0113'` */
  phoneNumbers: (n?: number) => View
  /** return terms like `'#nlp'` */
  hashTags: (n?: number) => View
  /** return terms like `'hi@compromise.cool'` */
  emails: (n?: number) => View
  /** return  terms like `:)` */
  emoticons: (n?: number) => View
  /** return terms like `💋` */
  emoji: (n?: number) => View
  /** return terms like `'@nlp_compromise'`*/
  atMentions: (n?: number) => View
  /** return terms like `'compromise.cool'` */
  urls: (n?: number) => View
  /** return terms like `'he'` */
  pronouns: (n?: number) => View
  /** return terms like `'but'`*/
  conjunctions: (n?: number) => View
  /** return terms like `'of'`*/
  prepositions: (n?: number) => View
  /** return person names like `'John A. Smith'`*/
  people: (n?: number) => People
  /** return location names like `'Paris, France'`*/
  places: (n?: number) => View
  /** return companies and org names like `'Google Inc.'`*/
  organizations: (n?: number) => View
  /** return people, places, and organizations */
  topics: (n?: number) => View
  /** remove any people, places, and organizations */
  redact: (opts?: object) => View

  // Subsets
  /** return terms like `'Mrs.'`*/
  abbreviations: (n?: number) => View
  /** return terms like `'FBI'` */
  acronyms: (n?: number) => View
  /** return any multi-word terms, like "didn't"  */
  contractions: (n?: number) => Contractions
  /** contract words that can combine, like "did not" */
  contract: () => View
  /** return anything inside (parentheses) */
  parentheses: (n?: number) => Parentheses
  /** return words like "clean" */
  adjectives: (n?: number) => Adjectives
  /** return words like "quickly" */
  adverbs: (n?: number) => Adverbs
  /** return terms like "Spencer's" */
  possessives: (n?: number) => Possessives
  /** return any terms inside 'quotation marks' */
  quotations: (n?: number) => Quotations
  /** return noun phrases in the view */
  nouns: (n?: number, opts?: object) => Nouns
  /** return full sentences in the view */
  sentences: (n?: number, opts?: object) => Sentences
  /** find full sentences of any questions in the view */
  questions: (n?: number, opts?: object) => View
  /** return any subsequent terms tagged as a Verb */
  verbs: (n?: number) => Verbs
  /** return any numbers in the view */
  numbers: (n?: number, opts?: object) => Numbers
  /** return any money in the view */
  money: (n?: number, opts?: object) => Numbers
  /** return any percentages in the view */
  percentages: (n?: number, opts?: object) => Numbers
  /** return any fractions in the view */
  fractions: (n?: number, opts?: object) => Fractions
}


// Sentences class
interface Sentences extends View {
  /** grab the parsed sentence */
  parse: (n?: number) => object[]
  /** 'will go' → 'went' */
  toPastTense: () => View
  /** 'walked' → 'walks' */
  toPresentTense: () => View
  /** 'walked' → 'will walk' */
  toFutureTense: () => View
  /** 'walks' → 'walk' */
  toInfinitive: () => View
  /** 'walks' → 'walking' */
  toGerund: () => View
  /** 'he is cool' → 'he is not cool' */
  toNegative: () => View
}

// Nouns class
interface Nouns extends View {
  /** grab the parsed noun-phrase */
  parse: (n?: number) => object[]
  /** get any adjectives describing this noun*/
  adjectives: () => View
  /** return only plural nouns */
  isPlural: () => View
  /** return only nouns that _can be_ inflected as plural */
  hasPlural: () => View
  /** 'football captain' → 'football captains' */
  toPlural: (setArticle?: boolean) => View
  /** 'turnovers' → 'turnover' */
  toSingular: (setArticle?: boolean) => View
  /** add a `'s` to the end, in a safe manner. */
  toPossessive: () => View
}

interface Numbers extends View {
  /** grab the parsed number */
  get: (n?: number) => number | number[]
  /** grab the parsed number */
  parse: (n?: number) => object[]
  /** grab 'kilos' from `25 kilos' */
  units: () => View
  /** convert number to `five` or `fifth` */
  toText: () => View
  /** convert number to `5` or `5th` */
  toNumber: () => View
  /** convert number to `fifth` or `5th` */
  toOrdinal: () => View
  /** convert number to `five` or `5` */
  toCardinal: () => View
  /** set number to n */
  set: (n: number) => View
  /** increase number by n */
  add: (n: number) => View
  /** decrease number by n*/
  subtract: (n: number) => View
  /** increase number by 1 */
  increment: () => View
  /** decrease number by 1*/
  decrement: () => View
  /** return numbers with this value */
  isEqual: () => View
  /** return numbers bigger than n */
  greaterThan: (min: number) => View
  /** return numbers smaller than n */
  lessThan: (max: number) => View
  /** return numbers between min and max */
  between: (min: number, max: number) => View
  /** return only ordinal numbers */
  isOrdinal: () => View
  /** return only cardinal numbers */
  isCardinal: () => View
  /** add commas, or nicer formatting for numbers */
  toLocaleString: () => View
}

interface Fractions extends View {
  /** grab the parsed number */
  get: (n?: number) => number | number[]
  /** grab the parsed number */
  parse: (n?: number) => object[]
  /** convert '1/4' to '1/4th' */
  toOrdinal: () => View
  /** convert '1/4th' to '1/4' */
  toCardinal: () => View
  /** convert '1/4' to `0.25` */
  toDecimal: () => View
  /** convert '1/4' to `25%` */
  toPercentage: () => View
  /** convert 'one fourth' to `1/4` */
  toFraction: () => View
}

// Verbs class
interface Verbs extends View {
  /** grab the parsed verb-phrase */
  parse: (n?: number) => object[]
  /** grab what [doing] the verb */
  subjects: () => View
  /** return the adverbs describing this verb */
  adverbs: () => View
  /** return only plural nouns */
  isPlural: () => View
  /** return only singular nouns */
  isSingular: () => View
  /** return all forms of these verbs */
  conjugate: () => View
  /** 'will go' → 'went' */
  toPastTense: () => View
  /** 'walked' → 'walks' */
  toPresentTense: () => View
  /** 'walked' → 'will walk' */
  toFutureTense: () => View
  /** 'walks' → 'walk' */
  toInfinitive: () => View
  /** 'walks' → 'walking' */
  toGerund: () => View
  /** 'drive' → 'driven' if it exists, otherwise past-tense */
  toParticiple: () => View
  /** return verbs with 'not' */
  isNegative: () => View
  /** only verbs without 'not'*/
  isPositive: () => View
  /** 'went' → 'did not go'*/
  toNegative: () => View
  /** "didn't study" → 'studied' */
  toPositive: () => View
  /** only verbs that are instructions*/
  isImperative: () => View
}

interface People extends View {
  /** get first/last/middle names */
  parse: () => object[]
}

interface Contractions extends View {
  /** turn "i've" into "i have" */
  expand: () => View
}

interface Parentheses extends View {
  /** remove ( and ) punctuation */
  strip: () => View
}

interface Adjectives extends View { }
interface Adverbs extends View { }

interface Possessives extends View {
  /** "spencer's" -> "spencer" */
  strip: () => View
}

interface Quotations extends View {
  /** remove leading and trailing quotation marks */
  strip: () => View
}

export default View
