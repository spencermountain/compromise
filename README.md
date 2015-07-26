#No training, no prolog.
a Natural-Language-Processing library *in Javascript*, small-enough for the browser, and quick-enough to run on keypress :two_men_holding_hands:

it does [tons of clever things](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/basic_demo/index.html). it's smaller than jquery, and scores 86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/).
```javascript
nlp.pos('she sells seashells by the seashore').to_past().text()
//she sold seashells by the seashore
```
[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](http://badge.fury.io/js/nlp_compromise)
##Check it out

* [Long Text Demo](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/long_demo/index.html)
* [Specific Methods](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/basic_demo/index.html)
* [Realtime Demo](http://rawgit.com/spencermountain/nlp_compromise/master/client_side/cute_demo/index.html)
* [Angular Demo](http://rawgit.com/kroid/angular-nlp-compromise/master/example/index.html)

[![Video](http://i.vimeocdn.com/video/493948602_640.jpg)](https://vimeo.com/109880250)

##Justification
If the 80-20 rule applies for most things, the ''94-6 rule'' applies when working with language - by [Zipfs law](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10):
>The **[top 10 words](http://www.businessinsider.com/zipfs-law-and-the-most-common-words-in-english-2013-10)** account for 25% of used language.

>The **top 100 words** account for 50% of used language.

>The **top 50,000 words** account for 95% of used language.

On the [Penn treebank](http://www.cis.upenn.edu/~treebank/), for example, this is possible:

* just a 1 thousand word lexicon: **45% accuracy**
* ... then falling back to nouns: **70% accuracy**
* ... then some suffix regexes: **74% accuracy**
* ... then some sentence-level postprocessing: **81% accuracy**

The process is to get some curated data, find the patterns, and list the exceptions. Bada bing, bada boom.
In this way a satisfactory NLP library can be built with breathtaking lightness.

Namely, it can be run right on the user's computer instead of a server.

## Client-side
```javascript
<script src="https://rawgit.com/spencermountain/nlp_compromise/master/client_side/nlp.min.js"> </script>
<script>
  nlp.noun("dinosaur").pluralize()
  //dinosaurs
</script>
```
or, use the [angular module](https://github.com/Kroid/angular-nlp-compromise)

## Server-side
```javascript
$ npm install nlp_compromise

nlp = require("nlp_compromise")
nlp.syllables("hamburger")
//[ 'ham', 'bur', 'ger' ]
```

## API


## Licence
MIT
