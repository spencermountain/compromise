### Constructor
* **tokenize** - parse text into a compromise object, without running POS-tagging
* **extend** - mix in a compromise-plugin
* **clone** - make a deep-copy of the library state
* **fromJSON** - re-generate a Doc object from .json() results
* **verbose**  -  log our decision-making for debugging
* **version**  -  current semver version of the library

### Utils
* **all** - return the whole original document ('zoom out')
* **found** - is this document empty? \[getter\]
* **clone**  -  deep-copy the document, so that no references remain
* **wordCount**  -  count the # of terms in each match
* **length**  - count the # of characters of each match  (string length)
* **debug**  -  pretty-print the current document and its tags

### Accessors
* **get**  -  use only the nth result
* **first**  -  use only the first result(s)
* **last**  -  use only the last result(s)
* **slice**  -  grab a subset of the results
<!-- * **firstTerms**  -  undefined 
* **lastTerms**  -  undefined
* **termList**  -  return a flat array of term objects
-->

### Output
* **text**  -  return the document as text
* **json**  -  pull out desired metadata from the document
* **out**  -  some named output formats
* **normal**  -  normalized text -  out('normal')

### Case
* **toLowerCase**  -  turn every letter of every term to lower-cse
* **toUpperCase**  -  turn every letter of every term to upper case
* **toTitleCase**  -  upper-case the first letter of each term
* **toCamelCase**  -  remove whitespace and title-case each term

### Whitespace
* **trim**  -  remove start and end whitespace
* **hyphenate**  -  connect words with hyphen, and remove whitespace
* **dehyphenate**  -  remove hyphens between words, and set whitespace
  
### Insert
* **append**  -  add these new terms to the end (insertAfter)
* **prepend**  -  add these new terms to the front (insertBefore)
* **split**  -  return a Document with three parts for every match ('splitOn')
* **splitAfter**  -  separate everything before the word, as a new phrase
* **splitBefore**  -  separate everything after the match as a new phrase
* **concat**  -  add these new things to the end
* **replaceWith**  -  substitute-in new content
* **replace**  -  search and replace match with new content
* **delete**  -  fully remove these terms from the document

### Loops
* **forEach**  -  run a function on each phrase, as an individual document
* **map** - run each phrase through a function, and create a new document
* **filter**  -  return only the phrases that return true
* **find**  -  return a document with only the first phrase that matches
* **some**  -  return true or false if there is one matching phrase
* **sort**  -  re-arrange the order of the matches (in place)
* **random**  -  sample a subset of the results

### Match
* **match**  -  return a new Doc, with this one as a parent
* **not**  -  return all results except for this
* **matchOne**  -  return only the first match
* **if**  -  return each current phrase, only if it contains this match
* **ifNo**  -  Filter-out any current phrases that have this match
* **has**  -  Return a boolean if this match exists
* **before**  -  return all terms before a match, in each phrase
* **after**  -  return all terms after a match, in each phrase

### Tag
* **tag**  -  Give all terms the given tag
* **tagSafe**  -  Only apply tag to terms if it is consistent with current tags
* **unTag**  -  Remove this term from the given terms
* **canBe**  -  return only the terms that can be this tag

### Helpers
* **terms**  -  split-up results by each individual term
* **clauses**  -  split-up results into multi-term phrases
* **hashTags**  -  return anything tagged as a hashtag
* **organizations**  -  return anything tagged as an organization
* **phoneNumbers**  -  return anything tagged as a phone number
* **places**  -  return anything tagged as a Place
* **urls**  -  return anything tagged as a URL
* **parentheses**  -  return anything inside parentheses
* **questions**  -  return any sentences that ask a question
* **statements**  -  return any sentences that are not a question or exclamation
* **exclamations**  -  return any sentences that are not a question

---

### text:
  * **text**  -  
  * **normal**  -  
  * **clean**  -  

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
 
### json:
  * text
  * normal
  * wordCount
  * offset
  * terms
    * text
    * tags
    * normal

