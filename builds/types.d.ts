export as namespace nlp

// a key-value object of words, terms
declare interface Lexicon {
  [key: string]: string
}
// documents indexed by a string
declare interface DocIndex<
  Ext extends object = {},
  W extends nlp.World = nlp.World,
  Ph extends nlp.Phrase = nlp.Phrase
> {
  [key: string]: nlp.ExtendedDocument<Ext, W, Ph>
}

declare interface nlp<D extends object, W extends object, Ph extends Object> {
  /** normal usage */
  (text?: string, lexicon?: Lexicon): nlp.ExtendedDocument<D, W, Ph>
  /** tokenize string */
  tokenize(text: string, lexicon?: Lexicon): nlp.ExtendedDocument<D, W, Ph>
  /** mix in a compromise-plugin */
  extend<P>(
    plugin: P
  ): nlp<
    P extends nlp.Plugin<infer PD, infer PW, infer PPh>
      ? { [k in keyof (PD & D)]: (PD & D)[k] }
      : { [k in keyof D]: D[k] },
    P extends nlp.Plugin<infer PD, infer PW, infer PPh>
      ? { [k in keyof (PW & W)]: (PW & W)[k] }
      : { [k in keyof W]: W[k] },
    P extends nlp.Plugin<infer PD, infer PW, infer PPh>
      ? { [k in keyof (PPh & Ph)]: (PPh & Ph)[k] }
      : { [k in keyof Ph]: Ph[k] }
  >

  /** re-generate a Doc object from .json() results */
  fromJSON(json: any): nlp.ExtendedDocument<D, W, Ph>
  /**  log our decision-making for debugging */
  verbose(bool?: boolean): nlp.ExtendedDocument<D, W, Ph>
  /** create instance using global world*/
  clone(): nlp<D, W, Ph>
  /**  current semver version of the library */
  version: nlp.ExtendedDocument<D, W, Ph>
  /** grab the document's context data */
  world(): W
  /** pre-parse a match statement, for faster lookups*/
  parseMatch(str: string, options?:object): nlp<D, W, Ph>
}

declare function nlp(text?: string, lexicon?: Lexicon): nlp.DefaultDocument
declare function nlp<D extends object = {}, W extends object = {}, Ph extends object = {}>(
  text?: string
): nlp.ExtendedDocument<D, W, Ph>

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

// Cleaner plugin types
type PluginWorld<D extends object, W extends object, Ph extends object> = {
  // Override post process type
  postProcess(process: (Doc: nlp.ExtendedDocument<D, W, Ph>) => void): nlp.ExtendedWorld<W>
} & nlp.ExtendedWorld<W>

type PluginDocument<D extends object, W extends object, Ph extends object> = nlp.ExtendedDocument<D, W, Ph> & {
  prototype: nlp.ExtendedDocument<D, W, Ph>
}

type PluginPhrase<Ph extends object> = nlp.ExtendedPhrase<Ph> & { prototype: nlp.ExtendedPhrase<Ph> }
type PluginTerm = nlp.Term & PluginConstructor
type PluginPool = nlp.Pool & PluginConstructor

// Make these available, full support tbd
type PluginConstructor = {
  prototype: Record<string, any>
}

// Constructor
declare module nlp {
  export function tokenize(text?: string, lexicon?: Lexicon): DefaultDocument
  /** mix in a compromise-plugin */
  export function extend<P>(
    plugin: P
  ): nlp<
    P extends Plugin<infer D, infer W, infer Ph> ? D : {},
    P extends Plugin<infer D, infer W, infer Ph> ? W : {},
    P extends Plugin<infer D, infer W, infer Ph> ? Ph : {}
  >
  /** re-generate a Doc object from .json() results */
  export function fromJSON(json: any): DefaultDocument
  /**  log our decision-making for debugging */
  export function verbose(bool?: boolean): DefaultDocument
  /** create instance using global world */
  export function clone(): nlp<{}, {}, {}>
  /**  current semver version of the library */
  export const version: number

  type Plugin<D extends object = {}, W extends object = {}, Ph extends object = {}> = (
    Doc: PluginDocument<D, W, Ph>,
    world: PluginWorld<D, W, Ph>,
    nlp: nlp<D, W, Ph>,
    Phrase: PluginPhrase<Ph>,
    Term: PluginTerm, // @todo Add extend support
    Pool: PluginPool
  ) => void

  type ExtendedWorld<W extends object> = nlp.World & W
  type ExtendedDocument<D extends object, W extends object, Ph extends object> = {
    [k in keyof (nlp.Document<D, ExtendedWorld<W>, ExtendedPhrase<Ph>> & D)]: (nlp.Document<
      D,
      ExtendedWorld<W>,
      ExtendedPhrase<Ph>
    > &
      D)[k]
  }
  type ExtendedPhrase<Ph extends object> = nlp.Phrase & Ph
  type DefaultDocument = {
    [k in keyof nlp.Document]: nlp.Document[k]
  }

  class Document<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase> {
    // Utils
    /** return the whole original document ('zoom out') */
    all(): ExtendedDocument<Ext, W, Ph>
    /** is this document empty? */
    found: boolean
    /** return the previous result */
    parent(): ExtendedDocument<Ext, W, Ph>
    /** return all of the previous results */
    parents(): ExtendedDocument<Ext, W, Ph>[]
    /**  (re)run the part-of-speech tagger on this document */
    tagger(): ExtendedDocument<Ext, W, Ph>
    /**  count the # of terms in each match */
    wordCount(): number
    /**  count the # of characters of each match */
    length(): number
    /**  deep-copy the document, so that no references remain */
    clone(shallow?: boolean): ExtendedDocument<Ext, W, Ph>
    /** freeze the current state of the document, for speed-purposes */
    cache(options?: object): ExtendedDocument<Ext, W, Ph>
    /** un-freezes the current state of the document, so it may be transformed */
    uncache(options?: object): ExtendedDocument<Ext, W, Ph>
    /** the current world */
    world: W

    // Accessors
    /**  use only the first result(s) */
    first(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  use only the last result(s) */
    last(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  grab a subset of the results */
    slice(start: number, end?: number): ExtendedDocument<Ext, W, Ph>
    /**  use only the nth result */
    eq(n: number): ExtendedDocument<Ext, W, Ph>
    /** get the first word in each match */
    firstTerms(): ExtendedDocument<Ext, W, Ph>
    /** get the end word in each match */
    lastTerms(): ExtendedDocument<Ext, W, Ph>
    /** return a flat list of all Term objects in match */
    termList(): Term[]
    /** grab a specific named capture group */
    groups(name: string): ExtendedDocument<Ext, W, Ph>
    /** grab all named capture groups */
    groups(): DocIndex<Ext, W, Ph>
    /** Access Phrase list */
    list: Ph[]
    /** Access pool */
    pool(): Pool

    // Match
    /**  return matching patterns in this doc */
    match(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /**  return a named group in a match */
    match(match: string | ExtendedDocument<Ext, W, Ph>, group:string|number): ExtendedDocument<Ext, W, Ph>
    /**  return all results except for this */
    not(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /**  return only the first match */
    matchOne(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /**  return each current phrase, only if it contains this match */
    if(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /**  Filter-out any current phrases that have this match */
    ifNo(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /**  Return a boolean if this match exists */
    has(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): boolean
    /**  search through earlier terms, in the sentence */
    lookBehind(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /**  search through following terms, in the sentence */
    lookAhead(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /**  return the terms before each match */
    before(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /**  return the terms after each match */
    after(match: string | ExtendedDocument<Ext, W, Ph>, options?:any): ExtendedDocument<Ext, W, Ph>
    /** quick find for an array of string matches */
    lookup(matches: string[]): ExtendedDocument<Ext, W, Ph>
    /** quick find for an object of key-value matches */
    lookup(matches: Lexicon): DocIndex<W>

    // Case
    /**  turn every letter of every term to lower-cse */
    toLowerCase(): ExtendedDocument<Ext, W, Ph>
    /**  turn every letter of every term to upper case */
    toUpperCase(): ExtendedDocument<Ext, W, Ph>
    /**  upper-case the first letter of each term */
    toTitleCase(): ExtendedDocument<Ext, W, Ph>
    /**  remove whitespace and title-case each term */
    toCamelCase(): ExtendedDocument<Ext, W, Ph>

    // Whitespace
    /** add this punctuation or whitespace before each match */
    pre(str: string, concat: boolean): ExtendedDocument<Ext, W, Ph>
    /** add this punctuation or whitespace after each match */
    post(str: string, concat: boolean): ExtendedDocument<Ext, W, Ph>
    /**  remove start and end whitespace */
    trim(): ExtendedDocument<Ext, W, Ph>
    /**  connect words with hyphen, and remove whitespace */
    hyphenate(): ExtendedDocument<Ext, W, Ph>
    /**  remove hyphens between words, and set whitespace */
    dehyphenate(): ExtendedDocument<Ext, W, Ph>

    // Tag
    /**  Give all terms the given tag */
    tag(tag: string, reason?: string): ExtendedDocument<Ext, W, Ph>
    /**  Only apply tag to terms if it is consistent with current tags */
    tagSafe(tag: string, reason?: string): ExtendedDocument<Ext, W, Ph>
    /**  Remove this term from the given terms */
    unTag(tag: string, reason?: string): ExtendedDocument<Ext, W, Ph>
    /**  return only the terms that can be this tag */
    canBe(tag: string): ExtendedDocument<Ext, W, Ph>

    // Loops
    /** run each phrase through a function, and create a new document */
    map(fn: (p: ExtendedPhrase<Ph>) => void): ExtendedDocument<Ext, W, Ph> | []
    /**  run a function on each phrase, as an individual document */
    forEach(fn: (doc: ExtendedDocument<Ext, W, Ph>) => void): ExtendedDocument<Ext, W, Ph>
    /**  return only the phrases that return true */
    filter(fn: (p: ExtendedPhrase<Ph>) => boolean): ExtendedDocument<Ext, W, Ph>
    /**  return a document with only the first phrase that matches */
    find(fn: (p: ExtendedPhrase<Ph>) => boolean): ExtendedDocument<Ext, W, Ph> | undefined
    /**  return true or false if there is one matching phrase */
    some(fn: (p: ExtendedPhrase<Ph>) => boolean): ExtendedDocument<Ext, W, Ph>
    /**  sample a subset of the results */
    random(n?: number): ExtendedDocument<Ext, W, Ph>

    // Insert
    /**  substitute-in new content */
    replaceWith(text: string | Function, keepTags?: boolean | object, keepCase?: boolean): ExtendedDocument<Ext, W, Ph>
    /**  search and replace match with new content */
    replace(
      match: string,
      text?: string | Function,
      keepTags?: boolean | object,
      keepCase?: boolean
    ): ExtendedDocument<Ext, W, Ph>
    /**  fully remove these terms from the document */
    delete(match: string): ExtendedDocument<Ext, W, Ph>
    /**  add these new terms to the end (insertAfter) */
    append(text: string): ExtendedDocument<Ext, W, Ph>
    /**  add these new terms to the front (insertBefore) */
    prepend(text: string): ExtendedDocument<Ext, W, Ph>
    /**  add these new things to the end */
    concat(text: string): ExtendedDocument<Ext, W, Ph>

    // transform
    /**re-arrange the order of the matches (in place) */
    sort(method?: string | Function): ExtendedDocument<Ext, W, Ph>
    /**reverse the order of the matches, but not the words */
    reverse(): ExtendedDocument<Ext, W, Ph>
    /** clean-up the document, in various ways */
    normalize(options?: string | object): ExtendedDocument<Ext, W, Ph>
    /** remove any duplicate matches */
    unique(): ExtendedDocument<Ext, W, Ph>
    /**  return a Document with three parts for every match ('splitOn') */
    split(match?: string): ExtendedDocument<Ext, W, Ph>
    /**  separate everything after the match as a new phrase */
    splitBefore(match?: string): ExtendedDocument<Ext, W, Ph>
    /**  separate everything before the word, as a new phrase */
    splitAfter(match?: string): ExtendedDocument<Ext, W, Ph>
    /** split a document into labeled sections  */
    segment(regs: object, options?: object): ExtendedDocument<Ext, W, Ph>
    /** make all phrases into one phrase  */
    join(str?: string): ExtendedDocument<Ext, W, Ph>

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
    out(format: 'debug'): ExtendedDocument<Ext, W, Ph>
    out(format: 'topk'): Array<{ normal: string; count: number; percent: number }>
    /**  pretty-print the current document and its tags */
    debug(): ExtendedDocument<Ext, W, Ph>
    /** store a parsed document for later use  */
    export(): any

    // Selections
    /**  split-up results by each individual term */
    terms(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  split-up results into multi-term phrases */
    clauses(n?: number): ExtendedDocument<Ext, W, Ph>
    /** return all terms connected with a hyphen or dash like `'wash-out'`*/
    hyphenated(n?: number): ExtendedDocument<Ext, W, Ph>
    /** add quoation marks around each match */
    toQuoations(start?: string, end?: string): ExtendedDocument<Ext, W, Ph>
    /** add brackets around each match */
    toParentheses(start?: string, end?: string): ExtendedDocument<Ext, W, Ph>
    /** return things like `'(939) 555-0113'` */
    phoneNumbers(n?: number): ExtendedDocument<Ext, W, Ph>
    /** return things like `'#nlp'` */
    hashTags(n?: number): ExtendedDocument<Ext, W, Ph>
    /** return things like `'hi@compromise.cool'` */
    emails(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return  things like `:)` */
    emoticons(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return things like `💋` */
    emoji(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return things like `'@nlp_compromise'`*/
    atMentions(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return things like `'compromise.cool'` */
    urls(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return things like `'quickly'` */
    adverbs(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return things like `'he'` */
    pronouns(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return things like `'but'`*/
    conjunctions(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return things like `'of'`*/
    prepositions(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return person names like `'John A. Smith'`*/
    people(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return location names like `'Paris, France'`*/
    places(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return companies and org names like `'Google Inc.'`*/
    organizations(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return people, places, and organizations */
    topics(n?: number): ExtendedDocument<Ext, W, Ph>

    // Subsets
    /** get the whole sentence for each match */
    sentences(n?: number): ExtendedDocument<Ext, W, Ph>
    /**  return things like `'Mrs.'`*/
    abbreviations(n?: number): Abbreviations<Ext, W, Ph>
    /** return any multi-word terms, like "didn't"  */
    contractions(n?: number): Contractions<Ext, W, Ph>
    /** contract words that can combine, like "did not" */
    contract(): ExtendedDocument<Ext, W, Ph>
    /**  return anything inside (parentheses) */
    parentheses(n?: number): Parentheses<Ext, W, Ph>
    /**  return things like "Spencer's" */
    possessives(n?: number): Possessives<Ext, W, Ph>
    /**  return any terms inside 'quotation marks' */
    quotations(n?: number): Quotations<Ext, W, Ph>
    /**  return things like `'FBI'` */
    acronyms(n?: number): Acronyms<Ext, W, Ph>
    /**  return things like `'eats, shoots, and leaves'` */
    lists(n?: number): Lists<Ext, W, Ph>
    /**  return any subsequent terms tagged as a Noun */
    nouns(n?: number, opts?: object): Nouns<Ext, W, Ph>
    /**  return any subsequent terms tagged as a Verb */
    verbs(n?: number): Verbs<Ext, W, Ph>
  }

  // Nouns class
  interface Nouns<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /** get any adjectives describing this noun*/
    adjectives(): ExtendedDocument<Ext, W, Ph>
    /** return only plural nouns */
    isPlural(): ExtendedDocument<Ext, W, Ph>
    /** return only nouns that _can be_ inflected as plural */
    hasPlural(): ExtendedDocument<Ext, W, Ph>
    /** 'football captain' → 'football captains' */
    toPlural(setArticle?: boolean): ExtendedDocument<Ext, W, Ph>
    /** 'turnovers' → 'turnover' */
    toSingular(setArticle?: boolean): ExtendedDocument<Ext, W, Ph>
    /** add a `'s` to the end, in a safe manner. */
    toPossessive(): ExtendedDocument<Ext, W, Ph>
  }

  // Verbs class
  interface Verbs<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /** return the adverbs describing this verb */
    adverbs(): ExtendedDocument<Ext, W, Ph>
    /** return only plural nouns */
    isPlural(): ExtendedDocument<Ext, W, Ph>
    /** return only singular nouns */
    isSingular(): ExtendedDocument<Ext, W, Ph>
    /** return all forms of these verbs */
    conjugate(): ExtendedDocument<Ext, W, Ph>
    /** 'will go' → 'went' */
    toPastTense(): ExtendedDocument<Ext, W, Ph>
    /** 'walked' → 'walks' */
    toPresentTense(): ExtendedDocument<Ext, W, Ph>
    /** 'walked' → 'will walk' */
    toFutureTense(): ExtendedDocument<Ext, W, Ph>
    /** 'walks' → 'walk' */
    toInfinitive(): ExtendedDocument<Ext, W, Ph>
    /** 'walks' → 'walking' */
    toGerund(): ExtendedDocument<Ext, W, Ph>
    /** 'drive' → 'driven' if it exists, otherwise past-tense */
    toParticiple(): ExtendedDocument<Ext, W, Ph>
    /** return verbs with 'not' */
    isNegative(): ExtendedDocument<Ext, W, Ph>
    /** only verbs without 'not'*/
    isPositive(): ExtendedDocument<Ext, W, Ph>
    /** 'went' → 'did not go'*/
    toNegative(): ExtendedDocument<Ext, W, Ph>
    /** "didn't study" → 'studied' */
    toPositive(): ExtendedDocument<Ext, W, Ph>
    /** only verbs that are instructions*/
    isImperative(): ExtendedDocument<Ext, W, Ph>
  }

  interface Abbreviations<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /**  */
    stripPeriods(): ExtendedDocument<Ext, W, Ph>
    /**  */
    addPeriods(): ExtendedDocument<Ext, W, Ph>
  }

  interface Acronyms<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /**  */
    stripPeriods(): ExtendedDocument<Ext, W, Ph>
    /**  */
    addPeriods(): ExtendedDocument<Ext, W, Ph>
  }

  interface Contractions<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /**  */
    expand(): ExtendedDocument<Ext, W, Ph>
  }

  interface Parentheses<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /**  */
    unwrap(): ExtendedDocument<Ext, W, Ph>
  }

  interface Possessives<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /**  */
    strip(): ExtendedDocument<Ext, W, Ph>
  }

  interface Quotations<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /**  */
    unwrap(): ExtendedDocument<Ext, W, Ph>
  }

  interface Lists<Ext extends object = {}, W extends World = World, Ph extends Phrase = Phrase>
    extends ExtendedDocument<{}, W, Ph> {
    /**  */
    conjunctions(): ExtendedDocument<Ext, W, Ph>
    /**  */
    parts(): ExtendedDocument<Ext, W, Ph>
    /**  */
    items(): ExtendedDocument<Ext, W, Ph>
    /**  */
    add(): ExtendedDocument<Ext, W, Ph>
    /**  */
    remove(): ExtendedDocument<Ext, W, Ph>
    /**  */
    hasOxfordComma(): ExtendedDocument<Ext, W, Ph>
  }

  class World {
    /** more logs for debugging */
    verbose(on?: boolean): this
    isVerbose(): boolean

    /** get all terms in our lexicon with this tag */
    getByTag(tag: string): Record<string, true>

    /** put new words into our lexicon, properly */
    addWords(words: Record<string, string>): void

    /** extend the compromise tagset */
    addTags(
      tags: Record<
        string,
        {
          isA?: string | string[]
          notA?: string | string[]
        }
      >
    ): void

    /** call methods after tagger runs */
    postProcess<D extends Document = Document>(process: (Doc: D) => void): this
  }

  class Pool {
    /** throw a new term object in */
    add(term: Term): this
    /** find a term by it's id */
    get(id: string): Term
    /** find a term by it's id */
    remove(id: string): void
    /** merge with another pool */
    merge(pool: Pool): this
    /** size of pool */
    stats(): number
  }

  class Cache {
    terms: Term[]
    words: any
    tags: Record<string, true>
    set: boolean
  }

  class Phrase {
    isA: 'Phrase' // Get Type
    start: string // id of start Term
    length: number // number of terms in phrase
    pool: Pool // global pool
    cache: Cache // global cache

    /** return a flat array of Term objects */
    terms(): Term[]
  }

  // @todo
  interface RegSyntax {
    [index: string]: any
  }

  type TextOutOptions =
    | 'reduced'
    | 'root'
    | 'implicit'
    | 'normal'
    | 'unicode'
    | 'titlecase'
    | 'lowercase'
    | 'acronyms'
    | 'whitespace'
    | 'punctuation'
    | 'abbreviations'

  type JsonOutOptions = 'text' | 'normal' | 'tags' | 'clean' | 'id' | 'offset' | 'implicit' | 'whitespace' | 'bestTag'

  class Term {
    isA: 'Term' // Get Type
    id: string

    // main data
    text: string
    tags: Record<string, boolean>

    // alternative forms of this.text
    root: string | null
    implicit: string | null
    clean?: string
    reduced?: string

    // additional surrounding information
    prev: string | null // id of prev term
    next: string | null // id of next term
    pre?: string // character before e.g. ' ' ','
    post?: string // character after e.g. ' ' ','

    // support alternative matches
    alias?: string

    constructor(text?: string)
    set(text: string): this

    /** clone contents to new term */
    clone(): Term

    /** convert all text to uppercase */
    toUpperCase(): this

    /** convert all text to lowercase */
    toLowerCase(): this

    /** only set the first letter to uppercase
     * leave any existing uppercase alone
     */
    toTitleCase(): this

    /** if all letters are uppercase */
    isUpperCase(): this

    /** if the first letter is uppercase, and the rest are lowercase */
    isTitleCase(): this
    titleCase(): this

    /** search the term's 'post' punctuation  */
    hasPost(): boolean

    /** search the term's 'pre' punctuation  */
    hasPre(): boolean

    /** does it have a quotation symbol?  */
    hasQuote(): boolean
    hasQuotation(): boolean

    /** does it have a comma?  */
    hasComma(): boolean

    /** does it end in a period? */
    hasPeriod(): boolean

    /** does it end in an exclamation */
    hasExclamation(): boolean

    /** does it end with a question mark? */
    hasQuestionMark(): boolean

    /** is there a ... at the end? */
    hasEllipses(): boolean

    /** is there a semicolon after this word? */
    hasSemicolon(): boolean

    /** is there a slash '/' in this word? */
    hasSlash(): boolean

    /** a hyphen connects two words like-this */
    hasHyphen(): boolean

    /** a dash separates words - like that */
    hasDash(): boolean

    /** is it multiple words combined */
    hasContraction(): boolean

    /** try to sensibly put this punctuation mark into the term */
    addPunctuation(punct: string): this

    doesMatch(reg: RegSyntax, index: number, length: number): boolean

    /** does this term look like an acronym? */
    isAcronym(): boolean

    /** is this term implied by a contraction? */
    isImplicit(): boolean

    /** does the term have at least one good tag? */
    isKnown(): boolean

    /** cache the root property of the term */
    setRoot(world: World): void

    /** return various text formats of this term */
    textOut(options?: Record<TextOutOptions, boolean>, showPre?: boolean, showPost?: boolean): string

    /** return various metadata for this term */
    // @todo create output type from options...
    json(options?: Record<JsonOutOptions, boolean>, world?: World): object

    /** add a tag or tags, and their descendents to this term */
    tag(tags: string | string[], reason?: string, world?: World): this

    /** only tag this term if it's consistent with it's current tags */
    tagSafe(tags: string | string[], reason?: string, world?: World): this

    /** remove a tag or tags, and their descendents from this term */
    unTag(tags: string | string[], reason?: string, world?: World): this

    /** is this tag consistent with the word's current tags? */
    canBe(tags: string | string[], world?: World): boolean
  }
}

export default nlp
