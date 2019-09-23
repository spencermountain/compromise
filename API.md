### Utils
* **found** - is this document empty?
* **all** - return the whole original document ('zoom out')
* **wordCount**  -  count the # of terms in each match
* **length**  -  count the # of characters of each match
* **clone**  -  deep-copy the document, so that no references remain
* **debug**  -  pretty-print the current document and its tags
* **verbose**  -  turn on logging for decision-debugging
  
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
* **slice**  -  grab a subset of the results
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
* **untag**  -  Remove this term from the given terms
* **canBe**  -  return only the terms that can be this tag


#### ????
* **firstTerm**  -  undefined
* **lastTerm**  -  undefined
* **first**  -  use only the first result(s)
* **last**  -  use only the last result(s)
* **termList**  -  return a flat array of term objects
* **get**  -  use only the nth result

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


### json:
  * text
  * normal
  * offset
  * terms
    * text
    * tags
    * normal
  
### text:
  * **text**  -  
  * **normal**  -  
  * **clean**  -  

### sort:
  * **alpha**  -  alphabetical order
  * **chron**  -  the 'chronological', or original document sort order 
  * **byFreq**  -  sort by # of duplicates in the document

 


