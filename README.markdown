#nlp-comprimise
NlP-comprimise is a quick and light natural-language-processing library in javascript that is small-and-fast-enough to be used in the browser and run on keypress().

nlp_comprimise trades the 'last 15%' accuracy for speed, slightness, and ease-of-use. You can roll it into anything, without thinking, and get competitive results. No training, no configuring, under 50k.


## Installation

 $ npm install nlp_comprimise


## Showing off

### sentence parser
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
### Named-entity-recognition
```javascript
    nlp.tag("Tony Hawk said he was very happy")
    // ["Tony Hawk"]
```
### Part-of-speech Tagging
```javascript
    nlp.tag("the obviously good swim")
    //["DT", "RB", "JJ", "NN"]

    nlp.tag("Tony Hawk walked quickly to the store.")
    // ["NN","NN","VBD","RB","TO","DT","NN"]
```
### Singularize
```javascript
    nlp.singularize("earthquakes")
    //earthquake
```
### Adjective->Noun conjugation
```javascript
    nlp.adj_to_noun("clean")
    // cleanliness
```

### Date extractor
```javascript
    nlp.dates('my wife left me on the 9th of april, 2005.')
		//{
		//  text: '9th of april, 2005',
		//  from: { year: '2005', month: '04', day: '09' },
		//  to: {}
		//}
```