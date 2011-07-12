#nlp-node
Some cool rule-based tools for working with natural language in Nodejs.


## Installation

 $ npm install nlp-node


## Show off
* sentence parser

>console.log(sentence('Mr. Abraham J. Simpson is the father since Sept. 5th 1995. This is the second sentence.'));

>[ 'Mr. Abraham J. Simpson is the father since Sept. 5th 1995.',
>  'This is the second sentence.' 
>]


* singularize

>console.log(singularize('earthquakes'));  
>//earthquake

>console.log(singularize("mama cass"));
>//mama cass

* date extractor

>console.log(date_extractor('my wife left me on the 9th of april, 2005.'));

>{ 
>  text: '9th of april, 2005',
>  from: { year: '2005', month: '04', day: '09' },
>  to: {} 
>}
