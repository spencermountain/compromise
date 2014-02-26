#nlp-node
It's not always about being pretty.

NlPjs is a rule-based natural-language-processing library in javascript that is small-and-fast-enough to be used in the browser. It's not a fancy statistical nlp-suite, like the others; It trades the 'last 15%' accuracy for speed, slightness, and ease-of-use. You can roll it into anything, without thinking, and get quite reasonable results.



## Installation

 $ npm install nlp-node


## Show off
* sentence parser
arr = nlp.sentences("Hi there Dr. Joe, the price is 4.59 for the N.A.S.A. Ph.Ds. I hope that's fine, etc. and you can attend Feb. 8th.")
arr.length
//2


* Named-entity-recognition
nlp.tag("Tony Hawk said he was very happy")
// ["Tony Hawk"]

* Part-of-speech Tagging
nlp.tag("the obviously good swim")
//["DT", "RB", "JJ", "NN"]
nlp.tag("Tony Hawk walked quickly to the store.")
// ["NN","NN","VBD","RB","TO","DT","NN"]

* Singularize
nlp.singularize("earthquakes")
//earthquake

* Adjective->Noun conjugation
nlp.adj_to_noun("clean")
// cleanliness


* Date extractor
nlp.dates('my wife left me on the 9th of april, 2005.')
>{
>  text: '9th of april, 2005',
>  from: { year: '2005', month: '04', day: '09' },
>  to: {}
>}
