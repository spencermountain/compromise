##### Constructor
* **[.tokenize()](http://docs.compromise.cool/compromise-tokenize)** - parse text without running POS-tagging
* **[.extend()]()** - mix in a compromise-plugin
* **[.clone()]()** - make a deep-copy of the library state
* **[.load()]()** - re-generate a Doc object from .export() results
* **[.verbose()]()**  -  log our decision-making for debugging
* **[.version()]()**  -  current semver version of the library

##### Utils
* **[.all()]()** - return the whole original document ('zoom out')
* **[.found]()** [getter] - is this document empty?
* **[.parent()]()** - return the previous result
* **[.parents()]()** - return all of the previous results
* **[.tagger()]()** - (re-)run the part-of-speech tagger on this document
* **[.wordCount()]()**  -  count the # of terms in each match
* **[.length]()** [getter] - count the # of characters of each match  (string length)
* **[.clone()]()**  -  deep-copy the document, so that no references remain
* **[.cache({})]()**  -  freeze the current state of the document, for speed-purposes 
* **[.uncache()]()**  -  un-freezes the current state of the document, so it may be transformed

##### Accessors
* **[.first(n)]()**  -  use only the first result(s)
* **[.last(n)]()**  -  use only the last result(s)
* **[.slice(n,n)]()**  -  grab a subset of the results
* **[.eq(n)]()**  -  use only the nth result
* **[.firstTerm()]()**  -  get the first word in each match
* **[.lastTerm()]()**  -  get the end word in each match
* **[.termList()]()**  -  return a flat list of all Term objects in match 

##### Match
all match methods use the [match-syntax](https://beta.observablehq.com/@spencermountain/compromise-match-syntax).
* **[.match('')]()**  -  return a new Doc, with this one as a parent
* **[.not('')]()**  -  return all results except for this
* **[.matchOne('')]()**  -  return only the first match
* **[.if('')]()**  -  return each current phrase, only if it contains this match ('only')
* **[.ifNo()]()**  -  Filter-out any current phrases that have this match ('notIf')
* **[.has()]()**  -  Return a boolean if this match exists
* **[.lookBehind('')]()**  -  search through earlier terms, in the sentence
* **[.lookAhead('')]()**  -  search through following terms, in the sentence
* **[.before('')]()**  -  return all terms before a match, in each phrase
* **[.after('')]()**  -  return all terms after a match, in each phrase

##### Case
* **[.toLowerCase()]()**  -  turn every letter of every term to lower-cse
* **[.toUpperCase()]()**  -  turn every letter of every term to upper case
* **[.toTitleCase()]()**  -  upper-case the first letter of each term
* **[.toCamelCase()]()**  -  remove whitespace and title-case each term

##### Whitespace
* **[.pre('')]()**  -  add this punctuation or whitespace before each match 
* **[.post('')]()**  -  add this punctuation or whitespace after each match
* **[.trim()]()**  -  remove start and end whitespace
* **[.hyphenate()]()**  -  connect words with hyphen, and remove whitespace
* **[.dehyphenate()]()**  -  remove hyphens between words, and set whitespace
  
##### Tag
* **[.tag('')]()**  -  Give all terms the given tag
* **[.tagSafe('')]()**  -  Only apply tag to terms if it is consistent with current tags
* **[.unTag('')]()**  -  Remove this term from the given terms
* **[.canBe('')]()**  -  return only the terms that can be this tag

##### Loops
* **[.map(fn)]()** - run each phrase through a function, and create a new document
* **[.forEach(fn)]()**  -  run a function on each phrase, as an individual document
* **[.filter(fn)]()**  -  return only the phrases that return true
* **[.find(fn)]()**  -  return a document with only the first phrase that matches
* **[.some(fn)]()**  -  return true or false if there is one matching phrase
* **[.random(fn)]()**  -  sample a subset of the results

##### Insert
* **[.replace(match, replace)]()**  -  search and replace match with new content
* **[.replaceWith(replace)]()**  -  substitute-in new text
* **[.delete()]()**  -  fully remove these terms from the document
* **[.append(str)]()**  -  add these new terms to the end (insertAfter)
* **[.prepend(str)]()**  -  add these new terms to the front (insertBefore)
* **[.concat()]()**  -  add these new things to the end

##### Transform
* **[.sort('alpha|chron|freq')]()**  -  re-arrange the order of the matches (in place)
* **[.reverse()]()**  -  reverse the order of the matches, but not the words
* **[.unique()]()**  -  remove any duplicate matches
  
* **[.split('')]()**  -  return a Document with three parts for every match ('splitOn')
* **[.splitBefore('')]()**  -  separate everything after the match as a new phrase
* **[.splitAfter('')]()**  -  separate everything before the word, as a new phrase 

* **[.normalize({})]()** - clean-up the text in various ways
* **[.segment({})]()** - split a document into labeled sections
* **[.join('')]()** - make all phrases into one phrase 

##### Output
* **[.text('text|normal|reduced|root')]()**  -  return the document as text
* **[.json({})]()**  -  pull out desired metadata from the document
* **[.out('array|offset|terms')]()**  -  some named output formats
* **[.debug()]()**  -  pretty-print the current document and its tags
* **[.export()]()**  -  store a parsed document for later use
  
##### Selections
* **[.terms()]()**  -  split-up results by each individual term
* **[.clauses()]()**  -  split-up sentences into multi-term phrases
* **[.hyphenated()]()**  -   all terms connected with a hyphen or dash

* **[.hashTags()]()**  -  return things like '#nlp'
* **[.emails()]()**  -  return things like 'hi@compromise.cool'
* **[.atMentions()]()**  -  return things like '@nlp_compromise'
* **[.urls()]()**  -  return things like 'compromise.cool'

* **[.fractions()]()**  -  return anything tagged as a Fraction
* **[.phoneNumbers()]()**  -  return things like '(939) 555-0113'
* **[.money()]()**  -  return things like '$2.50'

* **[.adverbs()]()**  -  return things like 'quickly'
* **[.pronouns()]()**  -  return anything tagged as a Pronoun
* **[.conjunctions()]()**  -  return things like 
* **[.prepositions()]()**  -  return things like 
* **[.abbreviations()]()**  -  return things like 'Mrs.'

* **[.acronyms()]()**  -  return things like 'FBI'  
* **[.contractions()]()**  -  return things like "didn't" and "would not"
* **[.lists()]()**  -  return all comma-seperated lists
* **[.nouns()]()**  -   return any subsequent terms tagged as a Noun
* **[.parentheses()]()**  -  return anything inside (parentheses)
* **[.possessives()]()**  -  return things like "Spencer's"
* **[.quotations()]()**  -  return any terms inside quotation marks
* **[.verbs()]()**  -  return any subsequent terms tagged as a Verb

---

### text:
  * **text**  -  
  * **normal**  -  
  * **clean**  -  
  * **reduced**  -  
  * **root**  -  

### sort:
  * **alpha**  -  alphabetical order
  * **chron**  -  the 'chronological', or original document sort order 
  * **byFreq**  -  sort by # of duplicates in the document

### match-methods:
  * **@hasComma**  -  does it have a comma?
  * **@hasPeriod**  -  does it end in a period?
  * **@hasExclamation**  -  does it end in an exclamation
  * **@hasQuestionMark**  -  does it end with a question mark?
  * **@hasEllipses**  -  is there a ... at the end?
  * **@hasSemicolon**  -  is there a semicolon after this word?
  * **@hasSlash**  -  is there a slash after this word?
  * **@hasContraction**  -  is it multiple words combined?
  * **@isAcronym**  -  does this term look like an acronym?
  * **@isKnown**  -  does the term have at least one good tag?
  * **@isImplicit**  -  is this term implied by a contraction?
 
### json:
  * text
  * normal
  * wordCount
  * offset
  * terms
    * text
    * tags
    * normal
    * offset
    * id

