### Utils
* found
* length
* all
* debug
* clone
  
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
* insertAt
* **prepend**  -  add these new terms to the front (insertBefore)
* **append**  -  add these new terms to the end (insertAfter)
* **concat**  -  add these new things to the end


* splitOn
* splitBefore
* splitAfter
* slice
* concat
* **replaceWith**  -  substitute-in new content
* **replace**  -  search and replace match with new content
* **delete**  -  fully remove these terms from the document



### Loops

* **forEach**  -  run a function on each phrase
* **filter**  -  return only the phrases that return true
* **find**  -  return a document with only the first phrase that matches
* **some**  -  return true or false if there is one matching phrase
* map
* sort
* random


### Match
* match
* not
* if
* ifNo
* has
* before
* after

### Tag
* **tag**  -  Give all terms the given tag
* **tagSafe**  -  Only apply tag to terms if it is consistent with current tags
* **untag**  -  Remove this term from the given terms





* **term**  -  create a Doc from the first Term of each phrase
* **firstTerm**  -  undefined
* **lastTerm**  -  undefined
* **first**  -  use only the first result(s)
* **last**  -  use only the last result(s)
* **termList**  -  return a flat array of term objects
* 
* **slice**  -  grab a subset of the results
* **get**  -  use only the nth result
* **random**  -  sample a subset of the results
* **wordCount**  -  how many seperate terms does the document have?

* **verbose**  -  turn on logging for decision-debugging
* 

* **alpha**  -  alphabetical order
* **chron**  -  the 'chronological', or original document sort order
* 
* **length**  -  count the # of characters of each match
* **wordCount**  -  count the # of terms in each match
* **byFreq**  -  sort by # of duplicates in the document
* **sort**  -  re-arrange the order of the matches (in place)

 
* **clone**  -  deep-copy the document, so that no references remain
* **debug**  -  pretty-print the current document and its tags

* **normalize**  -  common ways to clean-up the document, and reduce noise
