#nlp-node
Some cool rule-based tools for working with natural language in Nodejs.


## Installation

 $ npm install nlp-node


* sentence parser

   var paragraph='Mr. Abraham J. Simpson is the father since Sept. 5th 1995. This is the second sentence.';
 
   var sentences=sentence(paragraph);
   console.log(sentences);


* singularize

   console.log(singularize('earthquakes'));
   console.log(singularize("mama cass"));

* date extractor

   console.log(date_extractor('my wife left me on the 9th of april, 2005. now i just programz the computerz.'));
