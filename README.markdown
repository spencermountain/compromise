**nlp_compromise** is a quick and light Natural-Language-Processing library in javascript that is small enough to be used in the browser, and quick enough and run on keypress.

It uniquely trades the 'last 15%' accuracy for speed, slightness, and ease-of-use. You can roll it into anything, without thinking, and get competitive results. No training, no configuring, no prolog.

Instead, it's a single javascript file that's smaller than jQuery, with results in the mid-80% range. You win.

[demo](https://s3.amazonaws.com/spencermounta.in/nlp_comprimise/index.html)

this library is under active and reckless development, use a tag for sure. (April-May 2014)

#Justification
A working NLP library can be satisfactory with a breathtaking lightness.
By [Zipfs law](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10):
>The [top 10 words](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10) account for 25% of our language.

>The top 100 words account for 50% of our language.

>The top 50,000 words account for 95% of our language.

The trade-offs for processing english are quite aggressive.

On the [Penn treebank](http://www.cis.upenn.edu/~treebank/), for example, the following is possible:

* choosing all nouns: **33% correct**
* using a 1 thousand word lexicon: **45% correct**
* using a 1 thousand word lexicon, and falling back to nouns: **70% correct**
* using a 1 thousand word lexicon, common suffix regexes, and falling back to nouns: **74% correct**

The process has been to get the curated data, find the patterns, list the exceptions.
bada-bing, bada-BOOM.

#Usage
## Server-side
```bash
npm install nlp_compromise
```
```javascript
nlp = require("nlp_comprimise")
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## Client-side
```javascript
<script src="https://rawgit.com/spencermountain/nlp_comprimise/master/client_side/nlp.js"></script>
<script>
  nlp.pluralize("dinosaur")
  //dinosaurs
</script>
```

# API

## Sentence segmentation
1.7k
```javascript
nlp.sentences("Hi Dr. Joe et al. the price is 4.59 for the N.A.S.A. Ph.Ds and astronauts.").length
//1
```
##Word tokenization
```javascript
nlp.tokenize("she sells sea-shells").length
//3
```

## Part-of-speech
80% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
```javascript
nlp.pos("Tony Hawk walked quickly to the store.")
// ["NN","NN","VBD","RB","TO","DT","NN"]

nlp.pos("the obviously good swim")
//["DT", "RB", "JJ", "NN"]
```

the [industry-standard parts-of-speech](https://github.com/spencermountain/nlp_comprimise/blob/master/lib/pos/data/parts_of_speech.js)

<!-- ### Named-Entity Recognizing
```javascript
nlp.spot("Tony Hawk said he was very happy")
// ["Tony Hawk"]
```
-->

## Syllable hyphenization
70% on the [moby hyphenization corpus](http://www.gutenberg.org/dirs/etext02/mhyph10.zip)  0.5k
```javascript
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

##Conjugation

### Inflection
```javascript
nlp.noun.singularize("earthquakes")
//earthquake
nlp.noun.pluralize("earthquake")
//earthquakes
```

### Adjective->Noun conjugation
```javascript
nlp.adjective.to_noun("clean")
// cleanliness
```
### Verb conjugation
```javascript
nlp.verb.to_noun("walked")
//{ infinitive: 'walk',
//  present: 'walks',
//  past: 'walked',
//  gerund: 'walking' }
```

## US-UK Localization
```javascript
nlp.americanize("favourite")
//favorite
nlp.britishize("synthesized")
//synthesised
```
## N-gram
```javascript
nlp.ngram("She sells seashells by the seashore. The shells she sells are surely seashells.", {min_count:1, max_size:5})
// [{ word: 'she sells', count: 2, size: 2 }, ...
options.min_count // throws away seldom-repeated grams. defaults to 1
options.max_gram // prevents the result from becoming gigantic. defaults to 5
```

### Date extraction
```javascript
exports.dates("I married April for the 2nd time on June 5th 1998 ")
// { text: 'June 5th 1998',
//   from: { year: '1998', month: '06', day: '05' },
//   to: {} }
```
### Unicode Normalisation
a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
```javascript
nlp.normalise("Björk")
//Bjork

nlp.denormalise("The quick brown fox jumps over the lazy dog", {percentage:50})
// The ɋӈїck brown fox juӎÞs over tӊe laζy dog
```



## Licence
[go-fer-it.](http://www.wtfpl.net/txt/copying/)
