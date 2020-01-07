export as namespace nlp

declare interface nlp<CurrentDocumentExtension extends object = {}, CurrentWorldExtension extends object = {}> {
  /** normal usage */
  (text: string): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
  /** tozenize string */
  tokenize(text: string): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
  /** mix in a compromise-plugin */
  extend<P extends nlp.Plugin>(
    plugin: P
  ): nlp<
    P extends nlp.Plugin<infer D> ? D & CurrentDocumentExtension : CurrentDocumentExtension,
    P extends nlp.Plugin<infer D, infer W> ? W & CurrentWorldExtension : CurrentWorldExtension
  >

  /** re-generate a Doc object from .json() results */
  load(json: any): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
  /**  log our decision-making for debugging */
  verbose(bool: boolean): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
  /**  current semver version of the library */
  version: nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension
}

declare function nlp<CurrentDocumentExtension extends object = {}, CurrentWorldExtension extends object = {}>(
  text: string
): nlp.Document<nlp.World & CurrentWorldExtension> & CurrentDocumentExtension

// Constructor
declare module nlp {
  export function tokenize(text: string): Document
  /** mix in a compromise-plugin */
  export function extend<P extends Plugin>(
    plugin: P
  ): nlp<P extends Plugin<infer D> ? D : {}, P extends Plugin<infer D, infer W> ? W : {}>
  /** re-generate a Doc object from .json() results */
  export function load(json: any): Document
  /**  log our decision-making for debugging */
  export function verbose(bool: boolean): Document
  /**  current semver version of the library */
  export const version: number

  type Plugin<DocumentExtension extends object = {}, WorldExtension extends object = {}> = (
    Doc: Document<World & WorldExtension> & DocumentExtension,
    world: World & WorldExtension
  ) => void

  class Document<World extends nlp.World = nlp.World> {
    // Utils
    /** return the whole original document ('zoom out') */
    all(): Document<World>
    /** is this document empty? */
    found: Boolean
    /** return the previous result */
    parent(): Document<World>
    /** return all of the previous results */
    parents(): Document<World>[]
    /**  (re)run the part-of-speech tagger on this document */
    tagger(): Document<World>
    /**  count the # of terms in each match */
    wordCount(): Number
    /**  count the # of characters of each match */
    length(): Number
    /**  deep-copy the document, so that no references remain */
    clone(shallow?: Boolean): Document<World>
    /** freeze the current state of the document, for speed-purposes */
    cache(options?: Object): Document<World>
    /** un-freezes the current state of the document, so it may be transformed */
    uncache(options?: Object): Document<World>
    /** the current world */
    world: World

    // Accessors
    /**  use only the first result(s) */
    first(n?: Number): Document<World>
    /**  use only the last result(s) */
    last(n?: Number): Document<World>
    /**  grab a subset of the results */
    slice(start: Number, end?: Number): Document<World>
    /**  use only the nth result */
    eq(n: Number): Document<World>
    /** get the first word in each match */
    firstTerm(): Document<World>
    /** get the end word in each match */
    lastTerm(): Document<World>
    /** return a flat list of all Term objects in match */
    termList(): any

    // Match
    /**  return a new Doc, with this one as a parent */
    match(match: String | Document): Document<World>
    /**  return all results except for this */
    not(match: String | Document): Document<World>
    /**  return only the first match */
    matchOne(match: String | Document): Document<World>
    /**  return each current phrase, only if it contains this match */
    if(match: String | Document): Document<World>
    /**  Filter-out any current phrases that have this match */
    ifNo(match: String | Document): Document<World>
    /**  Return a boolean if this match exists */
    has(match: String | Document): Document<World>
    /**  search through earlier terms, in the sentence */
    lookBehind(match: String | Document): Document<World>
    /**  search through following terms, in the sentence */
    lookAhead(match: String | Document): Document<World>
    /**  return the terms before each match */
    before(match: String | Document): Document<World>
    /**  return the terms after each match */
    after(match: String | Document): Document<World>
    /** quick find for an array of string matches */
    lookup(matches: String[]): Document<World>

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
    pre(str: String, concat: Boolean): Document<World>
    /** add this punctuation or whitespace after each match */
    post(str: String, concat: Boolean): Document<World>
    /**  remove start and end whitespace */
    trim(): Document<World>
    /**  connect words with hyphen, and remove whitespace */
    hyphenate(): Document<World>
    /**  remove hyphens between words, and set whitespace */
    dehyphenate(): Document<World>

    // Tag
    /**  Give all terms the given tag */
    tag(tag: String, reason?: String): Document<World>
    /**  Only apply tag to terms if it is consistent with current tags */
    tagSafe(tag: String, reason?: String): Document<World>
    /**  Remove this term from the given terms */
    unTag(tag: String, reason?: String): Document<World>
    /**  return only the terms that can be this tag */
    canBe(tag: String): Document<World>

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
    random(n?: Number): Document<World>

    // Insert
    /**  substitute-in new content */
    replaceWith(text: String | Function, keepTags?: Boolean | Object, keepCase?: Boolean): Document<World>
    /**  search and replace match with new content */
    replace(match: String, text?: String | Function, keepTags?: Boolean | Object, keepCase?: Boolean): Document<World>
    /**  fully remove these terms from the document */
    delete(match: String): Document<World>
    /**  add these new terms to the end (insertAfter) */
    append(text: String): Document<World>
    /**  add these new terms to the front (insertBefore) */
    prepend(text: String): Document<World>
    /**  add these new things to the end */
    concat(text: String): Document<World>

    // transform
    /**re-arrange the order of the matches (in place) */
    sort(method?: String | Function): Document<World>
    /**reverse the order of the matches, but not the words */
    reverse(): Document<World>
    /** clean-up the document, in various ways */
    normalize(options?: String | Object): String
    /** remove any duplicate matches */
    unique(): Document<World>
    /**  return a Document with three parts for every match ('splitOn') */
    split(match?: String): Document<World>
    /**  separate everything after the match as a new phrase */
    splitBefore(match?: String): Document<World>
    /**  separate everything before the word, as a new phrase */
    splitAfter(match?: String): Document<World>
    /** split a document into labeled sections  */
    segment(regs: Object, options?: Object): Document<World>
    /** make all phrases into one phrase  */
    join(str?: String): Document<World>

    // Output
    /**  return the document as text */
    text(options?: String | Object): String
    /**  pull out desired metadata from the document */
    json(options?: String | Object): any
    /** some named output formats */
    out(format?: string): String
    /**  pretty-print the current document and its tags */
    debug(): Document<World>
    /** store a parsed document for later use  */
    export(): any

    // Selections
    /**  split-up results by each individual term */
    terms(n?: Number): Document<World>
    /**  split-up results into multi-term phrases */
    clauses(n?: Number): Document<World>
    /** return all terms connected with a hyphen or dash like `'wash-out'`*/
    hyphenated(n?: Number): Document<World>
    /** add quoation marks around each match */
    toQuoations(start?: String, end?: String): Document<World>
    /** add brackets around each match */
    toParentheses(start?: String, end?: String): Document<World>
    /** return things like `'(939) 555-0113'` */
    phoneNumbers(n?: Number): Document<World>
    /** return things like `'#nlp'` */
    hashTags(n?: Number): Document<World>
    /** return things like `'hi@compromise.cool'` */
    emails(n?: Number): Document<World>
    /**  return  things like `:)` */
    emoticons(n?: Number): Document<World>
    /**  return athings like `💋` */
    emoji(n?: Number): Document<World>
    /**  return things like `'@nlp_compromise'`*/
    atMentions(n?: Number): Document<World>
    /**  return things like `'compromise.cool'` */
    urls(n?: Number): Document<World>
    /**  return things like `'quickly'` */
    adverbs(n?: Number): Document<World>
    /**  return things like `'he'` */
    pronouns(n?: Number): Document<World>
    /**  return things like `'but'`*/
    conjunctions(n?: Number): Document<World>
    /**  return things like `'of'`*/
    prepositions(n?: Number): Document<World>
    /**  return person names like `'John A. Smith'`*/
    people(n?: Number): Document<World>
    /**  return location names like `'Paris, France'`*/
    places(n?: Number): Document<World>
    /**  return companies and org names like `'Google Inc.'`*/
    organizations(n?: Number): Document<World>
    /**  return people, places, and organizations */
    topics(n?: Number): Document<World>

    // Subsets
    /** alias for .all(), until plugin overloading  */
    sentences(): Document<World>
    /**  return things like `'Mrs.'`*/
    abbreviations(n?: Number): Abbreviations
    /** return any multi-word terms, like "didn't"  */
    contractions(n?: Number): Contractions
    /** contract words that can combine, like "did not" */
    contract(): Document<World>
    /**  return anything inside (parentheses) */
    parentheses(n?: Number): Parentheses
    /**  return things like "Spencer's" */
    possessives(n?: Number): Possessives
    /**  return any terms inside 'quotation marks' */
    quotations(n?: Number): Quotations
    /**  return things like `'FBI'` */
    acronyms(n?: Number): Acronyms
    /**  return things like `'eats, shoots, and leaves'` */
    lists(n?: Number): Lists
    /**  return any subsequent terms tagged as a Noun */
    nouns(n?: Number): Nouns
    /**  return any subsequent terms tagged as a Verb */
    verbs(n?: Number): Verbs
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
    toPlural(setArticle?: Boolean): Document
    /** 'turnovers' → 'turnover' */
    toSingular(setArticle?: Boolean): Document
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
    hasOxfordComma(): Document
  }

  class World {}
}

export default nlp
