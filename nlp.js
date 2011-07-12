var sentence=require('./lib/sentence').sentenceparser;
var singularize=require('./lib/singularize').singularize;
var date_extractor=require('./lib/date_extractor').date_extractor;


//sentence parser
var paragraph='Mr. Abraham J. Simpson is the father since Sept. 5th 1995. This is the second sentence.';
var sentences=sentence(paragraph);
console.log(sentences);


//singularize
console.log(singularize('earthquakes'));
console.log(singularize("mama cass"));

//date extractor
console.log(date_extractor('my wife left me on the 9th of april, 2005. now i just programz the computerz.'));
