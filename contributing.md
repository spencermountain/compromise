#WElcome, good person

I am very welcoming to all pull requests, and feature requests in all forms.
NLP is a solvable problem in scale, and all forms of input are gracious and lovely. I am also friendly and approachable. There is lots of work to be done.

* code is in ```/src```
* text is broken into 'Section' -> 'Sentence' -> 'Token', each with their relevant methods
* the various parts-of-speech have a 'parent form' of [noun, verb, adverb, adjective, or value], each with their relevant methods (in ```/src/parents```)
* unit tests are in ```/tests/unit_test.js``` and can be run with 'npm test'
* 'grunt' command joins all various scripts into a client-side js file

#stuff to achieve
* co-reference resolution (he/she/its). ```pronoun.reference(), noun.references()```
* api cleanup, implicit pos-parsing with optimized parameters (nlp.pos().method -> nlp().method)
* better americanization, with tests, like britishization
* caching by sentence, so unchanged-sentences aren't re-parsed on keystroke
* somehow integrate the bigger tests with the unit tests, to better catch regressions
* more advanced negation, sentence.is_negative() - or sentence.make_positive() .. or sentence.is_contrary(s2)?
* speedup work, some kind of speed-profile (where are the slowest parts?) Throw a novel or two in and see what bottlenecks. Some knowledge of parse speed of library in browser.
* ```sentence.pluralize() sentence.singularize() sentence.is_plural()``` ?
* ```sentence.britishize() sentence.americanize() sentence.is_british()``` ?
* some kind of thorough memory-leak test. Setting values to JSON objects is pass-by-reference. With lexicon, various verb lists, there is bound to be some pointers being set, which would appear with concurrency-testing.
* some kind of more specific auto-documentation for each public method. Something better than a readme. Basic human-explanations of ideas + assumptions.
* some smaller and more specific subset builds from grunt.
* better nlp.value() parsing, and identification. that 5kg-> 5 kilograms. some knowledgable representation of times, speeds, lengths, etc.
*perfect 'have walked' & pluperfect 'had walked' & future perfect 'will have walked' support
* habitual aspect support 'used to walk'

proposed api change:
```javascript
nlp= new NLP();
nlp.add('some text');
nlp.pluralize().text() // "some texts"
```
check out ```./known_issues.md``` or the unit tests that have been  commented out.

# release build script:
casual versioning/publishing with semvar:

```bash
npm test #ensure unit tests pass
node ./tests/pos_test/pos_test.js  #make sure changes to pos results are sane

grunt  #build client-side scripts
node ./tests/pos_test/bump_latest.js  #set current pos results as reference data
npm publish #push npm version
#bump bower
git tag -a v1.0.0 -m "tag bower release"
git push origin master --tags
```

#file size
of minimized clientside build:
* April 2015 - 109kb
* May 1st - 103kb
* May 8th - 79kb
* May 10th - 88kb
* May 18th - 99kb

#speed
benchmarked unit tests on backend + frontend
* May 2015  520ms front, 315ms back

have a nice day
