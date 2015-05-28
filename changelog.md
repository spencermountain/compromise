Uses semvar, with casual releases to npm and bower.

'Major' is considered an api change, while 'Minor' is considered a performance change.

#v1.1.0 - May 2015
smarter handling of ambiguous contractions ("he's" -> ["he is", "he has"])

#v1.0.0 - May 2015
added name genders and beginning of co-reference resolution ('Tony' -> 'he') API.
small breaking change on ```Noun.is_plural``` and ```Noun.is_entity```, affording significant pos() speedup. Bumped Major version for these changes.

#v0.5.2 - May 2015
Phrasal verbs ('step up'), firstnames and .people()

#v0.4.0 - May 2015
Major file-size reduction through refactoring

#v0.3.0 - Jan 2015
New NER choosing algorithm, better capitalisation logic, consolidated tests

#v0.2.0 - Nov 2014
Sentence class methods, client-side demos
