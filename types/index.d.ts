export as namespace nlp

declare interface nlp<CurrentDocumentExtension extends object, CurrentWorldExtension extends object> {
  /** normal usage */
  (text: string): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
  /** tozenize string */
  tokenize(text: string): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
  /** mix in a compromise-plugin */
  extend<P>(
    plugin: P
  ): nlp<
    P extends nlp.Plugin<infer D, infer W> ? D & CurrentDocumentExtension : CurrentDocumentExtension,
    P extends nlp.Plugin<infer D, infer W> ? W & CurrentWorldExtension : CurrentWorldExtension
  >

  /** re-generate a Doc object from .json() results */
  load(json: any): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
  /**  log our decision-making for debugging */
  verbose(bool: boolean): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
  /**  current semver version of the library */
  version: nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
}

declare function nlp<CurrentDocumentExtension extends object, CurrentWorldExtension extends object>(
  text: string
): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension

// Constructor
declare module nlp {
  export function tokenize(text: string): Document
  /** mix in a compromise-plugin */
  export function extend<P>(
    plugin: P
  ): nlp<P extends Plugin<infer D, infer W> ? D : {}, P extends Plugin<infer D, infer W> ? W : {}>
  /** re-generate a Doc object from .json() results */
  export function load(json: any): Document
  /**  log our decision-making for debugging */
  export function verbose(bool: boolean): Document
  /**  current semver version of the library */
  export const version: number

  type Plugin<DocumentExtension extends object, WorldExtension extends object> = (
    Doc: Document<World & WorldExtension> & DocumentExtension & { prototype: DocumentExtension },
    world: World & WorldExtension
  ) => void

  class Document<World extends nlp.World = nlp.World> {
    // Utils
    /** return the whole original document ('zoom out') */
    all(): Document<World>
    /** is this document empty? */
    found: boolean
    /** return the previous result */
    parent(): Document<World>
    /** return all of the previous results */
    parents(): Document<World>[]
    /**  (re)run the part-of-speech tagger on this document */
    tagger(): Document<World>
    /**  count the # of terms in each match */
    wordCount(): number
    /**  count the # of characters of each match */
    length(): number
    /**  deep-copy the document, so that no references remain */
    clone(shallow?: boolean): Document<World>
    /** freeze the current state of the document, for speed-purposes */
    cache(options?: object): Document<World>
    /** un-freezes the current state of the document, so it may be transformed */
    uncache(options?: object): Document<World>
    /** the current world */
    world: World

    // Accessors
    /**  use only the first result(s) */
    first(n?: number): Document<World>
    /**  use only the last result(s) */
    last(n?: number): Document<World>
    /**  grab a subset of the results */
    slice(start: number, end?: number): Document<World>
    /**  use only the nth result */
    eq(n: number): Document<World>
    /** get the first word in each match */
    firstTerm(): Document<World>
    /** get the end word in each match */
    lastTerm(): Document<World>
    /** return a flat list of all Term objects in match */
    termList(): any

    // Match
    /**  return a new Doc, with this one as a parent */
    match(match: string | Document): Document<World>
    /**  return all results except for this */
    not(match: string | Document): Document<World>
    /**  return only the first match */
    matchOne(match: string | Document): Document<World>
    /**  return each current phrase, only if it contains this match */
    if(match: string | Document): Document<World>
    /**  Filter-out any current phrases that have this match */
    ifNo(match: string | Document): Document<World>
    /**  Return a boolean if this match exists */
    has(match: string | Document): Document<World>
    /**  search through earlier terms, in the sentence */
    lookBehind(match: string | Document): Document<World>
    /**  search through following terms, in the sentence */
    lookAhead(match: string | Document): Document<World>
    /**  return the terms before each match */
    before(match: string | Document): Document<World>
    /**  return the terms after each match */
    after(match: string | Document): Document<World>
    /** quick find for an array of string matches */
    lookup(matches: string[]): Document<World>

    // Case
    /**  turn every letter of every term to lower-cse */
    toLowerCase(): Document<World>
    /**  turn every letter of every term to upper case */
    toUpperCase(): Document<World>
    /**  upper-case the first letter of each term */
    toTitleCase(): Document<World>
    /**  remove whitespace and title-case each term */
    toCamelCase(): Document<World>

    // Whitespace
    /** add this punctuation or whitespace before each match */
    pre(str: string, concat: boolean): Document<World>
    /** add this punctuation or whitespace after each match */
    post(str: string, concat: boolean): Document<World>
    /**  remove start and end whitespace */
    trim(): Document<World>
    /**  connect words with hyphen, and remove whitespace */
    hyphenate(): Document<World>
    /**  remove hyphens between words, and set whitespace */
    dehyphenate(): Document<World>

    // Tag
    /**  Give all terms the given tag */
    tag(tag: string, reason?: string): Document<World>
    /**  Only apply tag to terms if it is consistent with current tags */
    tagSafe(tag: string, reason?: string): Document<World>
    /**  Remove this term from the given terms */
    unTag(tag: string, reason?: string): Document<World>
    /**  return only the terms that can be this tag */
    canBe(tag: string): Document<World>

    // Loops
    /** run each phrase through a function, and create a new document */
    map(fn: Function): Document<World> | []
    /**  run a function on each phrase, as an individual document */
    forEach(fn: Function): Document<World>
    /**  return only the phrases that return true */
    filter(fn: Function): Document<World>
    /**  return a document with only the first phrase that matches */
    find(fn: Function): Document<World> | undefined
    /**  return true or false if there is one matching phrase */
    some(fn: Function): Document<World>
    /**  sample a subset of the results */
    random(n?: number): Document<World>

    // Insert
    /**  substitute-in new content */
    replaceWith(text: string | Function, keepTags?: boolean | object, keepCase?: boolean): Document<World>
    /**  search and replace match with new content */
    replace(match: string, text?: string | Function, keepTags?: boolean | object, keepCase?: boolean): Document<World>
    /**  fully remove these terms from the document */
    delete(match: string): Document<World>
    /**  add these new terms to the end (insertAfter) */
    append(text: string): Document<World>
    /**  add these new terms to the front (insertBefore) */
    prepend(text: string): Document<World>
    /**  add these new things to the end */
    concat(text: string): Document<World>

    // transform
    /**re-arrange the order of the matches (in place) */
    sort(method?: string | Function): Document<World>
    /**reverse the order of the matches, but not the words */
    reverse(): Document<World>
    /** clean-up the document, in various ways */
    normalize(options?: string | object): string
    /** remove any duplicate matches */
    unique(): Document<World>
    /**  return a Document with three parts for every match ('splitOn') */
    split(match?: string): Document<World>
    /**  separate everything after the match as a new phrase */
    splitBefore(match?: string): Document<World>
    /**  separate everything before the word, as a new phrase */
    splitAfter(match?: string): Document<World>
    /** split a document into labeled sections  */
    segment(regs: object, options?: object): Document<World>
    /** make all phrases into one phrase  */
    join(str?: string): Document<World>

    // Output
    /**  return the document as text */
    text(options?: string | object): string
    /**  pull out desired metadata from the document */
    json(options?: string | object): any
    /** some named output formats */
    out(format?: string): string
    /**  pretty-print the current document and its tags */
    debug(): Document<World>
    /** store a parsed document for later use  */
    export(): any

    // Selections
    /**  split-up results by each individual term */
    terms(n?: number): Document<World>
    /**  split-up results into multi-term phrases */
    clauses(n?: number): Document<World>
    /** return all terms connected with a hyphen or dash like `'wash-out'`*/
    hyphenated(n?: number): Document<World>
    /** add quoation marks around each match */
    toQuoations(start?: string, end?: string): Document<World>
    /** add brackets around each match */
    toParentheses(start?: string, end?: string): Document<World>
    /** return things like `'(939) 555-0113'` */
    phoneNumbers(n?: number): Document<World>
    /** return things like `'#nlp'` */
    hashTags(n?: number): Document<World>
    /** return things like `'hi@compromise.cool'` */
    emails(n?: number): Document<World>
    /**  return  things like `:)` */
    emoticons(n?: number): Document<World>
    /**  return athings like `💋` */
    emoji(n?: number): Document<World>
    /**  return things like `'@nlp_compromise'`*/
    atMentions(n?: number): Document<World>
    /**  return things like `'compromise.cool'` */
    urls(n?: number): Document<World>
    /**  return things like `'quickly'` */
    adverbs(n?: number): Document<World>
    /**  return things like `'he'` */
    pronouns(n?: number): Document<World>
    /**  return things like `'but'`*/
    conjunctions(n?: number): Document<World>
    /**  return things like `'of'`*/
    prepositions(n?: number): Document<World>
    /**  return person names like `'John A. Smith'`*/
    people(n?: number): Document<World>
    /**  return location names like `'Paris, France'`*/
    places(n?: number): Document<World>
    /**  return companies and org names like `'Google Inc.'`*/
    organizations(n?: number): Document<World>
    /**  return people, places, and organizations */
    topics(n?: number): Document<World>

    // Subsets
    /** alias for .all(), until plugin overloading  */
    sentences(): Document<World>
    /**  return things like `'Mrs.'`*/
    abbreviations(n?: number): Abbreviations
    /** return any multi-word terms, like "didn't"  */
    contractions(n?: number): Contractions
    /** contract words that can combine, like "did not" */
    contract(): Document<World>
    /**  return anything inside (parentheses) */
    parentheses(n?: number): Parentheses
    /**  return things like "Spencer's" */
    possessives(n?: number): Possessives
    /**  return any terms inside 'quotation marks' */
    quotations(n?: number): Quotations
    /**  return things like `'FBI'` */
    acronyms(n?: number): Acronyms
    /**  return things like `'eats, shoots, and leaves'` */
    lists(n?: number): Lists
    /**  return any subsequent terms tagged as a Noun */
    nouns(n?: number): Nouns
    /**  return any subsequent terms tagged as a Verb */
    verbs(n?: number): Verbs
  }

  // Nouns class
  interface Nouns extends Document {
    /** get any adjectives describing this noun*/
    adjectives(): Document
    /** return only plural nouns */
    isPlural(): Document
    /** return only nouns that _can be_ inflected as plural */
    hasPlural(): Document
    /** 'football captain' → 'football captains' */
    toPlural(setArticle?: boolean): Document
    /** 'turnovers' → 'turnover' */
    toSingular(setArticle?: boolean): Document
    /** add a `'s` to the end, in a safe manner. */
    toPossessive(): Document
  }

  // Verbs class
  interface Verbs extends Document {
    /** return the adverbs describing this verb */
    adverbs(): Document
    /** return only plural nouns */
    isPlural(): Document
    /** return only singular nouns */
    isSingular(): Document
    /** return all forms of these verbs */
    conjugate(): Document
    /** 'will go' → 'went' */
    toPastTense(): Document
    /** 'walked' → 'walks' */
    toPresentTense(): Document
    /** 'walked' → 'will walk' */
    toFutureTense(): Document
    /** 'walks' → 'walk' */
    toInfinitive(): Document
    /** 'walks' → 'walking' */
    toGerund(): Document
    /** return verbs with 'not' */
    isNegative(): Document
    /** only verbs without 'not'*/
    isPositive(): Document
    /** 'went' → 'did not go'*/
    toNegative(): Document
    /** "didn't study" → 'studied' */
    toPositive(): Document
  }

  interface Abbreviations extends Document {
    /**  */
    stripPeriods(): Document
    /**  */
    addPeriods(): Document
  }

  interface Acronyms extends Document {
    /**  */
    stripPeriods(): Document
    /**  */
    addPeriods(): Document
  }

  interface Contractions extends Document {
    /**  */
    expand(): Document
  }

  interface Parentheses extends Document {
    /**  */
    unwrap(): Document
  }

  interface Possessives extends Document {
    /**  */
    strip(): Document
  }

  interface Quotations extends Document {
    /**  */
    unwrap(): Document
  }

  interface Lists extends Document {
    /**  */
    conjunctions(): Document
    /**  */
    parts(): Document
    /**  */
    items(): Document
    /**  */
    add(): Document
    /**  */
    remove(): Document
    /**  */
    hasOxfordComma(): Document // Can we change all the unfinished types to 'any' instead? Not sure which ones are placeholders
  }

  class World {}
}

export default nlp
