declare function compromise(text: string, lexicon?: { [word: string]: string }): compromise.Text;
declare namespace compromise {
  const version: string;
  function verbose(str: any): void;
  function tokenize(str: string): any;
  function plugin(obj: any): any;
  function clone(): any;
  function unpack(...args: any[]): void;
  function addWords(...args: any[]): void;
  function addTags(...args: any[]): void;
  function addRegex(...args: any[]): void;
  function addPatterns(...args: any[]): void;
  function addPlurals(...args: any[]): void;
  function addConjugations(conj: { [verb: string]: Conjugation }): void;

  interface Conjugation {
    Gerund?: string;
    PresentTense?: string;
    PastTense?: string;
    PerfectTense?: string;
    PluPerfectTense?: string;
    FuturePerfect?: string;
    Actor?: string;
  }

  interface Text {
    /** did it find anything? */
    readonly found: boolean;
    /** just a handy wrap */
    readonly parent: Text;
    /** how many Texts are there? */
    readonly length: number;
    /** nicer than constructor.call.name or whatever */
    readonly isA: 'Text';
    /** the whitespace before and after this match */
    readonly whitespace: {
      before(str: string): Text,
      after(str: string): Text
    };

    acronyms(...args: any[]): any;
    adjectives(...args: any[]): any;
    adverbs(...args: any[]): any;
    contractions(...args: any[]): any;
    dates(...args: any[]): any;
    nouns(...args: any[]): any;
    people(...args: any[]): any;
    sentences(...args: any[]): any;
    terms(...args: any[]): any;
    possessives(...args: any[]): any;
    values(...args: any[]): any;
    verbs(...args: any[]): any;
    ngrams(...args: any[]): any;
    startGrams(...args: any[]): any;
    endGrams(...args: any[]): any;
    words(...args: any[]): any;

    // misc
    all(...args: any[]): any;
    index(...args: any[]): any;
    wordCount(...args: any[]): any;
    data(...args: any[]): any;
    /* javascript array loop-wrappers */
    map(...args: any[]): any;
    forEach(...args: any[]): any;
    filter(...args: any[]): any;
    reduce(...args: any[]): any;
    find(...args: any[]): any;
    /** copy data properly so later transformations will have no effect */
    clone(...args: any[]): any;

    /** get the nth term of each result */
    term(...args: any[]): any;
    firstTerm(...args: any[]): any;
    lastTerm(...args: any[]): any;

    /** grab a subset of the results */
    slice(...args: any[]): any;

    /** use only the nth result */
    get(...args: any[]): any;
    /** use only the first result */
    first(...args: any[]): any;
    /** use only the last result */
    last(...args: any[]): any;

    concat(...args: any[]): any;

    /** make it into one sentence/termlist */
    flatten(...args: any[]): any;

    /** see if these terms can become this tag */
    canBe(...args: any[]): any;

    /** sample part of the array */
    random(...args: any[]): any;
    setPunctuation(...args: any[]): any;
    getPunctuation(...args: any[]): any;
    // jquery-like api aliases
    offset(...args: any[]): any;
    text(...args: any[]): any;
    eq(...args: any[]): any;
    join(...args: any[]): any;

    // loops
    toTitleCase(...args: any[]): any;
    toUpperCase(...args: any[]): any;
    toLowerCase(...args: any[]): any;
    toCamelCase(...args: any[]): any;

    hyphenate(...args: any[]): any;
    dehyphenate(...args: any[]): any;
    trim(...args: any[]): any;

    insertBefore(...args: any[]): any;
    insertAfter(...args: any[]): any;
    insertAt(...args: any[]): any;

    replace(...args: any[]): any;
    replaceWith(...args: any[]): any;

    delete(...args: any[]): any;
    lump(...args: any[]): any;

    tagger(...args: any[]): any;

    tag(...args: any[]): any;
    unTag(...args: any[]): any;

    // match
    /** do a regex-like search through terms and return a subset */
    match(...args: any[]): any;

    not(...args: any[]): any;

    if(...args: any[]): any;

    ifNo(...args: any[]): any;

    has(...args: any[]): any;

    /** find a match and return everything in front of it */
    before(...args: any[]): any;

    /** find a match and return everything after it */
    after(...args: any[]): any;
    // alias 'and'
    and(...args: any[]): any;
    notIf(...args: any[]): any;
    only(...args: any[]): any;
    onlyIf(...args: any[]): any;

    // out
    out(...args: any[]): any;
    debug(...args: any[]): any;

    // sort
    /** reorder result.list alphabetically */
    sort(...args: any[]): any;
    /** reverse the order of result.list */
    reverse(...args: any[]): any;
    unique(...args: any[]): any;

    // split
    /** turn result into two seperate results */
    splitAfter(...args: any[]): any;
    /** turn result into two seperate results */
    splitBefore(...args: any[]): any;
    /** turn result into two seperate results */
    splitOn(...args: any[]): any;

    // normalize
    normalize(...args: any[]): any;

    // subsets
    clauses(...args: any[]): any;
    hashTags(...args: any[]): any;
    organizations(...args: any[]): any;
    phoneNumbers(...args: any[]): any;
    places(...args: any[]): any;
    quotations(...args: any[]): any;
    topics(...args: any[]): any;
    urls(...args: any[]): any;
    questions(...args: any[]): any;
    statements(...args: any[]): any;
    parentheses(...args: any[]): any;
  }
}
export = compromise;
