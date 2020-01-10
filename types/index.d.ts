export as namespace nlp

declare interface nlp<D extends object, W extends object> {
  /** normal usage */
  (text: string): nlp.ExtendedDocument<D, W>
  /** tozenize string */
  tokenize(text: string): nlp.ExtendedDocument<D, W>
  /** mix in a compromise-plugin */
  extend<P>(
    plugin: P
  ): nlp<
    P extends nlp.Plugin<infer PD, infer PW> ? { [k in keyof (PD & D)]: (PD & D)[k] } : { [k in keyof D]: D[k] },
    P extends nlp.Plugin<infer PD, infer PW> ? { [k in keyof (PW & W)]: (PW & W)[k] } : { [k in keyof W]: W[k] }
  >

  /** re-generate a Doc object from .json() results */
  load(json: any): nlp.ExtendedDocument<D, W>
  /**  log our decision-making for debugging */
  verbose(bool: boolean): nlp.ExtendedDocument<D, W>
  /**  current semver version of the library */
  version: nlp.ExtendedDocument<D, W>
}

declare function nlp(text: string): nlp.DefaultDocument
declare function nlp<D extends object, W extends object>(text: string): nlp.ExtendedDocument<D, W>

// possible values to .json()
declare interface JsonOptions {
  /**  a perfect copy of the input text */
  text?: boolean
  /** normalized whitespace, case, unicode, punctuation */
  normal?: boolean
  /** lowercase, trimmed, contractions expanded. */
  reduced?: boolean
  /** cleanup whitespace */
  trim?: boolean
  /** character-position where this begins */
  offset?: boolean
  /** frequency of this match in the document */
  count?: boolean
  /**  remove duplicate results*/
  unique?: boolean
  /** starting term # in document */
  index?: boolean
  /** options for each term */
  terms?: {
    text?: boolean
    normal?: boolean
    clean?: boolean
    implicit?: boolean
    tags?: boolean
    whitespace?: boolean
    id?: boolean
    offset?: boolean
    bestTag?: boolean
  }
}

// Constructor
declare module nlp {
  export function tokenize(text: string): DefaultDocument
  /** mix in a compromise-plugin */
  export function extend<P>(
    plugin: P
  ): nlp<P extends Plugin<infer D, infer W> ? D : {}, P extends Plugin<infer D, infer W> ? W : {}>
  /** re-generate a Doc object from .json() results */
  export function load(json: any): DefaultDocument
  /**  log our decision-making for debugging */
  export function verbose(bool: boolean): DefaultDocument
  /**  current semver version of the library */
  export const version: number

  type Plugin<D extends object, W extends object> = (
    Doc: Document<World & W> & D & { prototype: D },
    world: World & W
  ) => void

  type ExtendedWorld<W extends object> = nlp.World & W
  type ExtendedDocument<D extends object, W extends object> = {
    [k in keyof (nlp.Document<ExtendedWorld<W>> & D)]: (nlp.Document<ExtendedWorld<W>> & D)[k]
  }
  type DefaultDocument = {
    [k in keyof nlp.Document]: nlp.Document[k]
  }

  class Document<W extends World = World> {
    // Utils
    /** return the whole original document ('zoom out') */
    all(): Document<W>
    /** is this document empty? */
    found: boolean
    /** return the previous result */
    parent(): Document<W>
    /** return all of the previous results */
    parents(): Document<W>[]
    /**  (re)run the part-of-speech tagger on this document */
    tagger(): Document<W>
    /**  count the # of terms in each match */
    wordCount(): number
    /**  count the # of characters of each match */
    length(): number
    /**  deep-copy the document, so that no references remain */
    clone(shallow?: boolean): Document<W>
    /** freeze the current state of the document, for speed-purposes */
    cache(options?: object): Document<W>
    /** un-freezes the current state of the document, so it may be transformed */
    uncache(options?: object): Document<W>
    /** the current world */
    world: W

    // Accessors
    /**  use only the first result(s) */
    first(n?: number): Document<W>
    /**  use only the last result(s) */
    last(n?: number): Document<W>
    /**  grab a subset of the results */
    slice(start: number, end?: number): Document<W>
    /**  use only the nth result */
    eq(n: number): Document<W>
    /** get the first word in each match */
    firstTerm(): Document<W>
    /** get the end word in each match */
    lastTerm(): Document<W>
    /** return a flat list of all Term objects in match */
    termList(): any

    // Match
    /**  return a new Doc, with this one as a parent */
    match(match: string | Document<W>): Document<W>
    /**  return all results except for this */
    not(match: string | Document<W>): Document<W>
    /**  return only the first match */
    matchOne(match: string | Document<W>): Document<W>
    /**  return each current phrase, only if it contains this match */
    if(match: string | Document<W>): Document<W>
    /**  Filter-out any current phrases that have this match */
    ifNo(match: string | Document<W>): Document<W>
    /**  Return a boolean if this match exists */
    has(match: string | Document<W>): boolean
    /**  search through earlier terms, in the sentence */
    lookBehind(match: string | Document<W>): Document<W>
    /**  search through following terms, in the sentence */
    lookAhead(match: string | Document<W>): Document<W>
    /**  return the terms before each match */
    before(match: string | Document<W>): Document<W>
    /**  return the terms after each match */
    after(match: string | Document<W>): Document<W>
    /** quick find for an array of string matches */
    lookup(matches: string[]): Document<W>

    // Case
    /**  turn every letter of every term to lower-cse */
    toLowerCase(): Document<W>
    /**  turn every letter of every term to upper case */
    toUpperCase(): Document<W>
    /**  upper-case the first letter of each term */
    toTitleCase(): Document<W>
    /**  remove whitespace and title-case each term */
    toCamelCase(): Document<W>

    // Whitespace
    /** add this punctuation or whitespace before each match */
    pre(str: string, concat: boolean): Document<W>
    /** add this punctuation or whitespace after each match */
    post(str: string, concat: boolean): Document<W>
    /**  remove start and end whitespace */
    trim(): Document<W>
    /**  connect words with hyphen, and remove whitespace */
    hyphenate(): Document<W>
    /**  remove hyphens between words, and set whitespace */
    dehyphenate(): Document<W>

    // Tag
    /**  Give all terms the given tag */
    tag(tag: string, reason?: string): Document<W>
    /**  Only apply tag to terms if it is consistent with current tags */
    tagSafe(tag: string, reason?: string): Document<W>
    /**  Remove this term from the given terms */
    unTag(tag: string, reason?: string): Document<W>
    /**  return only the terms that can be this tag */
    canBe(tag: string): Document<W>

    // Loops
    /** run each phrase through a function, and create a new document */
    map(fn: Function): Document<W> | []
    /**  run a function on each phrase, as an individual document */
    forEach(fn: Function): Document<W>
    /**  return only the phrases that return true */
    filter(fn: Function): Document<W>
    /**  return a document with only the first phrase that matches */
    find(fn: Function): Document<W> | undefined
    /**  return true or false if there is one matching phrase */
    some(fn: Function): Document<W>
    /**  sample a subset of the results */
    random(n?: number): Document<W>

    // Insert
    /**  substitute-in new content */
    replaceWith(text: string | Function, keepTags?: boolean | object, keepCase?: boolean): Document<W>
    /**  search and replace match with new content */
    replace(match: string, text?: string | Function, keepTags?: boolean | object, keepCase?: boolean): Document<W>
    /**  fully remove these terms from the document */
    delete(match: string): Document<W>
    /**  add these new terms to the end (insertAfter) */
    append(text: string): Document<W>
    /**  add these new terms to the front (insertBefore) */
    prepend(text: string): Document<W>
    /**  add these new things to the end */
    concat(text: string): Document<W>

    // transform
    /**re-arrange the order of the matches (in place) */
    sort(method?: string | Function): Document<W>
    /**reverse the order of the matches, but not the words */
    reverse(): Document<W>
    /** clean-up the document, in various ways */
    normalize(options?: string | object): string
    /** remove any duplicate matches */
    unique(): Document<W>
    /**  return a Document with three parts for every match ('splitOn') */
    split(match?: string): Document<W>
    /**  separate everything after the match as a new phrase */
    splitBefore(match?: string): Document<W>
    /**  separate everything before the word, as a new phrase */
    splitAfter(match?: string): Document<W>
    /** split a document into labeled sections  */
    segment(regs: object, options?: object): Document<W>
    /** make all phrases into one phrase  */
    join(str?: string): Document<W>

    // Output
    /**  return the document as text */
    text(options?: string | object): string
    /**  pull out desired metadata from the document */
    json(options?: JsonOptions | string): any
    /** some named output formats */
    out(format?: 'text' | 'normal' | 'offset' | 'terms'): string
    out(format: 'array'): string[]
    out(format: 'tags' | 'terms'): Array<{ normal: string; text: string; tags: string[] }>
    out(format: 'json'): Array<{ normal: string; text: string; tags: () => void }>[]
    out(format: 'debug'): Text
    out(format: 'topk'): Array<{ normal: string; count: number; percent: number }>
    /**  pretty-print the current document and its tags */
    debug(): Document<W>
    /** store a parsed document for later use  */
    export(): any

    // Selections
    /**  split-up results by each individual term */
    terms(n?: number): Document<W>
    /**  split-up results into multi-term phrases */
    clauses(n?: number): Document<W>
    /** return all terms connected with a hyphen or dash like `'wash-out'`*/
    hyphenated(n?: number): Document<W>
    /** add quoation marks around each match */
    toQuoations(start?: string, end?: string): Document<W>
    /** add brackets around each match */
    toParentheses(start?: string, end?: string): Document<W>
    /** return things like `'(939) 555-0113'` */
    phoneNumbers(n?: number): Document<W>
    /** return things like `'#nlp'` */
    hashTags(n?: number): Document<W>
    /** return things like `'hi@compromise.cool'` */
    emails(n?: number): Document<W>
    /**  return  things like `:)` */
    emoticons(n?: number): Document<W>
    /**  return athings like `💋` */
    emoji(n?: number): Document<W>
    /**  return things like `'@nlp_compromise'`*/
    atMentions(n?: number): Document<W>
    /**  return things like `'compromise.cool'` */
    urls(n?: number): Document<W>
    /**  return things like `'quickly'` */
    adverbs(n?: number): Document<W>
    /**  return things like `'he'` */
    pronouns(n?: number): Document<W>
    /**  return things like `'but'`*/
    conjunctions(n?: number): Document<W>
    /**  return things like `'of'`*/
    prepositions(n?: number): Document<W>
    /**  return person names like `'John A. Smith'`*/
    people(n?: number): Document<W>
    /**  return location names like `'Paris, France'`*/
    places(n?: number): Document<W>
    /**  return companies and org names like `'Google Inc.'`*/
    organizations(n?: number): Document<W>
    /**  return people, places, and organizations */
    topics(n?: number): Document<W>

    // Subsets
    /** alias for .all(), until plugin overloading  */
    sentences(): Document<W>
    /**  return things like `'Mrs.'`*/
    abbreviations(n?: number): Abbreviations<W>
    /** return any multi-word terms, like "didn't"  */
    contractions(n?: number): Contractions<W>
    /** contract words that can combine, like "did not" */
    contract(): Document<W>
    /**  return anything inside (parentheses) */
    parentheses(n?: number): Parentheses<W>
    /**  return things like "Spencer's" */
    possessives(n?: number): Possessives<W>
    /**  return any terms inside 'quotation marks' */
    quotations(n?: number): Quotations<W>
    /**  return things like `'FBI'` */
    acronyms(n?: number): Acronyms<W>
    /**  return things like `'eats, shoots, and leaves'` */
    lists(n?: number): Lists<W>
    /**  return any subsequent terms tagged as a Noun */
    nouns(n?: number): Nouns<W>
    /**  return any subsequent terms tagged as a Verb */
    verbs(n?: number): Verbs<W>
  }

  // Nouns class
  interface Nouns<W extends World = World> extends ExtendedDocument<{}, W> {
    /** get any adjectives describing this noun*/
    adjectives(): Document<W>
    /** return only plural nouns */
    isPlural(): Document<W>
    /** return only nouns that _can be_ inflected as plural */
    hasPlural(): Document<W>
    /** 'football captain' → 'football captains' */
    toPlural(setArticle?: boolean): Document<W>
    /** 'turnovers' → 'turnover' */
    toSingular(setArticle?: boolean): Document<W>
    /** add a `'s` to the end, in a safe manner. */
    toPossessive(): Document<W>
  }

  // Verbs class
  interface Verbs<W extends World = World> extends Document<W> {
    /** return the adverbs describing this verb */
    adverbs(): Document<W>
    /** return only plural nouns */
    isPlural(): Document<W>
    /** return only singular nouns */
    isSingular(): Document<W>
    /** return all forms of these verbs */
    conjugate(): Document<W>
    /** 'will go' → 'went' */
    toPastTense(): Document<W>
    /** 'walked' → 'walks' */
    toPresentTense(): Document<W>
    /** 'walked' → 'will walk' */
    toFutureTense(): Document<W>
    /** 'walks' → 'walk' */
    toInfinitive(): Document<W>
    /** 'walks' → 'walking' */
    toGerund(): Document<W>
    /** return verbs with 'not' */
    isNegative(): Document<W>
    /** only verbs without 'not'*/
    isPositive(): Document<W>
    /** 'went' → 'did not go'*/
    toNegative(): Document<W>
    /** "didn't study" → 'studied' */
    toPositive(): Document<W>
  }

  interface Abbreviations<W extends World = World> extends Document<W> {
    /**  */
    stripPeriods(): Document<W>
    /**  */
    addPeriods(): Document<W>
  }

  interface Acronyms<W extends World = World> extends Document<W> {
    /**  */
    stripPeriods(): Document<W>
    /**  */
    addPeriods(): Document<W>
  }

  interface Contractions<W extends World = World> extends Document<W> {
    /**  */
    expand(): Document<W>
  }

  interface Parentheses<W extends World = World> extends Document<W> {
    /**  */
    unwrap(): Document<W>
  }

  interface Possessives<W extends World = World> extends Document<W> {
    /**  */
    strip(): Document<W>
  }

  interface Quotations<W extends World = World> extends Document<W> {
    /**  */
    unwrap(): Document<W>
  }

  interface Lists<W extends World = World> extends Document<W> {
    /**  */
    conjunctions(): Document<W>
    /**  */
    parts(): Document<W>
    /**  */
    items(): Document<W>
    /**  */
    add(): Document<W>
    /**  */
    remove(): Document<W>
    /**  */
    hasOxfordComma(): Document<W>
  }

  class World {}
}

export default nlp
