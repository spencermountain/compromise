#nlp_comprimise
NLP_comprimise is a quick and light natural-language-processing library in javascript that is small-and-fast-enough to be used in the browser and run on keypress.

nlp_comprimise trades the 'last 15%' accuracy for speed, slightness, and ease-of-use. You can roll it into anything, without thinking, and get competitive results. No training, no configuring, no python. under 50k.

It's basically just a zillion regexes, but very sensitive and thoughtful ones ;)

## Server-side Installation

 $ npm install nlp_comprimise


## Showing off

### sentence segmenting
1.7k
```javascript
arr = nlp.sentences("Hi there Dr. Joe, the price is 4.59 for the N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th.")
arr.length
//2
```
### Syllable hyphenization

70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)  0.5k
```javascript
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```
### Named-Entity Recognizing
```javascript
nlp.spot("Tony Hawk said he was very happy")
// ["Tony Hawk"]
```
### Part-of-speech Tagging
```javascript
nlp.tag("Tony Hawk walked quickly to the store.")
// ["NN","NN","VBD","RB","TO","DT","NN"]

nlp.tag("the obviously good swim")
//["DT", "RB", "JJ", "NN"]
```
### Singularization
```javascript
nlp.singularize("earthquakes")
//earthquake

### N-gram
```javascript
nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.", {min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 }, ...
```
'min_count' throws away seldom-repeated grams. defaults to 1
'max_gram' prevents the result from becoming gigantic. defaults to 5

### Adjective->Noun conjugation
```javascript
nlp.adj_to_noun("clean")
// cleanliness
```

### Date extraction
```javascript
nlp.dates('my wife left me on the 9th of april, 2005.')
//{
//  text: '9th of april, 2005',
//  from: { year: '2005', month: '04', day: '09' },
//  to: {}
//}
```

## Licence
[go-fer-it.](http://www.wtfpl.net/txt/copying/)